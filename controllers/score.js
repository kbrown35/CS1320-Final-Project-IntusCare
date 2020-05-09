const db = require('../database/accessDB.js');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// gets information from the database and renders the score page for a specific form fill-out with helper function
function renderScore(request, response){
    const id = request.params.patient;
    let profileData = [];
    db.getPatientById(id).then((patient) => {
        profileData = patient;
        db.getAcuityAndFormByFormId(request.params.assessment).then((form) => {
            renderHelper(id, profileData, form, response);
        });
    });
}

// renders page with profile and results data
function renderHelper(id, patient, form, response) {
    if (patient.length == 0 || form.length == 0) {
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
        let date = formatDate(form[0].date_submitted);
        let risk = formatRisk(form[0].risk);
        response.render('score', {title: 'Acuity Score', patientName: name, patientAddOne: addOne, patientAddTwo: addTwo, patientPhone: phone,
                                    patientUpcoming: id, patientPast: id + '/past', patientAcuity: id + '/acuity',
                                subScore1: form[0].score_p1, subScore2: form[0].score_p2, subScore3: form[0].score_p3, subScore4: form[0].score_p4, subScore5: form[0].score_p5,
                            formDate: date, riskLevel: risk,
                            upcomingClass: 'button-profile2', pastClass: 'button-profile2', acuityClass: 'button-active',
                            upcomingArrow: '', pastArrow: '', acuityArrow: '<i class="fa fa-arrow-circle-right arrow-upcoming" aria-hidden="true"></i>'});
    }
}

// gets the formatted date for a date
function formatDate(date) {
    let timestamp = new Date(date);
    return months[timestamp.getMonth()] + ' ' + timestamp.getDate() + ', ' + timestamp.getFullYear();
}

// processes the risk level string for display
function formatRisk(risk) {
    let split = risk.split(' ');
    for (let i = 0; i < split.length; i++) {
        split[i] = split[i][0].toUpperCase() + split[i].substr(1);
    }
    return split.join(' ');
}

// export render function
module.exports = {
    renderScore
};