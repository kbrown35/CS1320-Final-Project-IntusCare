// Access to database
const db = require('../database/accessDB.js');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'];
const educationMap = {
                        'Less than high school diploma': 'grade school',
                        'High school diploma or GED': 'high school',
                        'Some college, but no degree': 'some college',
                        'Associate Degree': 'associates',
                        'Bachelor\'s Degree': 'bachelors',
                        'Master\'s Degree': 'masters',
                        'Professional Degree': 'certification',
                        'Doctorate Degree': 'doctorate',
                    };
const transportMap = {
                        'Walk': 'walk',
                        'Bus': 'public bus',
                        'Family Member': 'family',
                        'Transportation Service': 'transport service',
                        'Other': 'other'
                    };
const numSections = 5;
const numQuestions = [6, 6, 6, 4, 5];
const numSubs = [[3, 3, 3, 1, 1, 3],
                    [4, 3, 3, 3, 5, 3],
                    [2, 3, 2, 2, 3, 3],
                    [0, 0, 0, 0],
                    [1, 3, 3, 2, 1]];
const alphabet = 'abcdef';

// gets information from the database and renders the form page with helper function
function renderForm(request, response){
    const id = request.params.patient;
    db.getPatientById(id).then((data) => {
        renderHelper(id, data, response);
    });
}

// renders page with profile data
function renderHelper(id, patient, response) {
    if (patient.length == 0) {
        response.sendStatus(404);
    } else {
        let middle = patient[0].name_middle;
        if (middle == null) {
            middle = '';
        }
        let name = patient[0].name_first + ' '
                    + middle + ' '
                    + patient[0].name_last;
        let addOne = patient[0].address_street;
        let addTwo = patient[0].address_city + ', '
                    + patient[0].address_state + ' '
                    + patient[0].address_zip;
        let phone = patient[0].phone;
        let today = formatDate();
        response.render('form', {title: 'Form', patientName: name, patientAddOne: addOne, patientAddTwo: addTwo, patientPhone: phone,
                                    patientUpcoming: id, patientPast: id + '/past', patientAcuity: id + '/acuity', date: today,
                                    upcomingClass: 'button-profile2', pastClass: 'button-profile2', acuityClass: 'button-active',
                                    upcomingArrow: '', pastArrow: '', acuityArrow: '<i class="fa fa-arrow-circle-right arrow-upcoming" aria-hidden="true"></i>'});
    }
}

// processes form results and stores it in the database
function submitForm(request, response){
    const patientId = request.params.patient;
    const answers = request.body.answers;
    let formArray = [];
    // use a fixed assessor id, since website models a page with a fixed user logged in
    formArray.push(patientId, '78040299');
    for (let i = 0; i < 5; i++) {
        let mainSection = answers.answers[i];
        for (let j = 0; j < mainSection.length; j++) {
            formArray.push(mainSection[j]);
            let subSection = answers.subAnswers[i][j];
            if (mainSection[j] == 'yes') {
                for (let k = 0; k < subSection.length; k++) {
                    if (subSection[k] == '') {
                        formArray.push(null);
                    } else {
                        if (i == 0 && j < 3 && k == 2) {
                            formArray.push(subSection[k]);
                        } else if (i == 2 && j == 2 && k == 0) {
                            formArray.push(educationMap[subSection[k]]);
                        } else if (i == 2 && j == 4 && k == 2) {
                            formArray.push(transportMap[subSection[k]]);
                        } else {
                            formArray.push(subSection[k].toLowerCase());
                        }
                    }
                }
            } else {
                for (let k = 0; k < subSection.length; k++) {
                    formArray.push(null);
                }
            }
        }
    }
    db.createForm(formArray).then((data) => {
        response.send('/' + patientId + '/' + data.form_id);
    });
}

// gets the form results for a form and sends it back as a json
function getForm(request, response){
    const formId = request.body.id;
    db.getAcuityAndFormByFormId(formId).then((data) => {
        let jsonData = {};
        for (let i = 0; i < numSections; i++) {
            for (let j = 0; j < numQuestions[i]; j++) {
                const index = (i + 1).toString() + '_' + (j + 1).toString();
                jsonData[index] = data[0][index];
                for (let k = 0; k < numSubs[i][j]; k++) {
                    const subIndex = index + alphabet[k];
                    jsonData[subIndex] = data[0][subIndex];
                }
            }
        }
        jsonData['5_5ai'] = data[0]['5_5ai'];
        return jsonData;
    }).then((jsonData) => {
        response.json(jsonData);
    });
}

// gets the formatted date for a date
function formatDate() {
    let today = new Date();
    return months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
}

// export render function, and form submit/get functions
module.exports = {
    renderForm,
    submitForm,
    getForm
};



