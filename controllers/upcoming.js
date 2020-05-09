// Access to database
const db = require('../database/accessDB.js');

// gets information from the database and renders the upcoming appointments page with helper function
function renderUpcoming(request, response){
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
        response.render('upcoming', {title: 'Patient Upcoming Appointments', patientName: name, patientAddOne: addOne, patientAddTwo: addTwo, patientPhone: phone,
                                    patientUpcoming: id, patientPast: id + '/past', patientAcuity: id + '/acuity',
                                    upcomingClass: 'button-active', pastClass: 'button-profile2', acuityClass: 'button-profile2',
                                    upcomingArrow: '<i class="fa fa-arrow-circle-right arrow-upcoming" aria-hidden="true"></i>', pastArrow: '', acuityArrow: ''});
    }
}

// export render function
module.exports = {
    renderUpcoming
};