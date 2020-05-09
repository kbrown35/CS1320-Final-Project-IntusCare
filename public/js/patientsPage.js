// adds an event listener to the search box to filter patients
document.getElementById('search-box').addEventListener('input', searchPatients);

// displays only relevant patients based on search input
function searchPatients(event) {
    displayPatients(event.target.value.trim().toLowerCase());
}

// goes through patient divs and sets their visibility based on what's being searched
function displayPatients(searchInput) {
    const patientDivs = document.getElementsByClassName("patients-wrapper");
    for (let i = 0; i < patientDivs.length; i++) {
        let name = patientDivs[i].children[1].children[1].children[0].children[0].innerHTML;
        if (name.toLowerCase().search(searchInput) >= 0) {
            patientDivs[i].style.display = "block";
        } else {
            patientDivs[i].style.display = "none";
        }
    }
}