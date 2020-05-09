const db = require('../database/accessDB.js');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const colorMappings = {Low: 'rgb(138, 227, 122)',
                        Moderate: 'rgb(246, 228, 66)',
                        High: 'rgb(244, 123, 47)', 
                        Very: 'rgb(255, 0, 0)'};

// gets acuity score information from database and renders page with helper function
function renderAcuity(request, response){
    const id = request.params.patient;
    let profileData = [];
    db.getPatientById(id).then((patient) => {
        profileData = patient;
        db.getAcuitiesByPatientId(id).then((scores) => {
            renderHelper(id, profileData, scores, response);
        });
    });
}

// generates the HTML to render each acuity score and profile data
function renderHelper(id, patient, acuities, response) {
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
        let acuitiesHTML = '';
        for (let i = 0; i < acuities.length; i++) {
            acuitiesHTML += `<div class="row-pastscores past-scores-box">
                                <div class="row">
                                <div class="column-scorebox">
                                    <div class="date-pastscore-text">`
            acuitiesHTML += formatDate(acuities[i].date_submitted) + `</div></div>`;
            acuitiesHTML += `<div class="column-scorebox">
                            <div class="pastscore-text"> Score: `;
            acuitiesHTML += acuities[i].score_total + `</div></div>`;
            acuitiesHTML += `<div class="column-scorebox">
                            <div class="row-risk">
                                <div class="risklevel-circle" style="` + getColor(formatRisk(acuities[i].risk)) + `">
                                <div class="container-scoreranges">
                                    <div class="container-scoreranges2">
                                        <div class="column">
                                            <div class="row-scoreranges">
                                            <div class="legend-circle-low"></div>
                                            <span class="scorerange-text"> Low: 0-9 </span>
                                            </div>
                                            <div class="row-scoreranges">
                                            <div class="legend-circle-moderate"></div>
                                            <span class="scorerange-text"> Moderate: 10-19 </span>
                                            </div>
                                            <div class="row-scoreranges">
                                            <div class="legend-circle-high"></div>
                                            <span class="scorerange-text"> High: 20-34 </span>
                                            </div>
                                            <div class="row-scoreranges">
                                            <div class="legend-circle-veryhigh"></div>
                                            <span class="scorerange-text"> Very High: 35-45 </span>
                                            </div>
                                        </div>
                                    </div>
                                 </div>
                                </div>
                                <div class="pastscore-text">`;
            acuitiesHTML += formatRisk(acuities[i].risk) + `</div></div>`;
            acuitiesHTML += `</div>
                            <div class="column-scorebox-view">
                            <form action="/` + id + `/` + acuities[i].form_id + `" method="get">`;
            acuitiesHTML += `<button class="button button-pastscore">View</button>
                            </form>
                        </div>
                        </div>
                    </div>`
        }
        response.render('acuity', {title: 'Patient Acuity Tool', patientName: name, patientAddOne: addOne, patientAddTwo: addTwo, patientPhone: phone,
                                    patientUpcoming: id, patientPast: id + '/past', patientAcuity: id + '/acuity',
                                    patientForm: id + '/form', pastScores: acuitiesHTML,
                                    upcomingClass: 'button-profile2', pastClass: 'button-profile2', acuityClass: 'button-active',
                                    upcomingArrow: '', pastArrow: '', acuityArrow: '<i class="fa fa-arrow-circle-right arrow-upcoming" aria-hidden="true"></i>'});
    }
}

// gets the CSS color associated with a risk level
function getColor(risk) {
    const color = colorMappings[risk.split(' ')[0]];
    return 'background: ' + color;
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
    renderAcuity
};