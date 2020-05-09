const db = require('../database/accessDB.js');

// gets information from the database and renders the patients page with helper function
function renderPatients(request, response){
    db.getPatients().then((data) => {
        renderHelper(data, response);
    });
}

// renders page with patient data
function renderHelper(patientsList, response) {
    let patientsHTML = '';
    for (let i = 0; i < patientsList.length; i++) {
        // patient data
        let id = patientsList[i].patient_id;
        let middle = patientsList[i].name_middle;
        if (middle == null) {
            middle = '';
        }
        let name = patientsList[i].name_first + ' '
                    + middle + ' '
                    + patientsList[i].name_last;      
        // concatenate HTML
        patientsHTML += `<div class="patients-wrapper">`
        patientsHTML += `<div class="row2-patientpage" style="margin-top:15px;"></div>
                            <div class="row-patientpage patient-box">
                                <a id="` + i + `" href="/` + id + `">
                                <div class="column-profilephoto">
                                    <div class="profile-smallcircle">
                                        <i class="fa fa-user-circle" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="column-patient">`;
        patientsHTML += `<div class="name2-text">` + name + `</div> </a>`;
        patientsHTML += `</div><div class="column2-patient">`;
        patientsHTML += `<a onclick="alertNonFunctional()" class="icon-edit" href="/patients">`;                                                            
        patientsHTML += `<i class="fa fa-pencil fa-3x" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>`;
        patientsHTML += `</div>`;
        
    }
    response.render('patients', {title: 'Patients', patients: patientsHTML});
  }

// export render function
module.exports = {
    renderPatients
};
