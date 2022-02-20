// import DBRepository from '../Adapters/DBRepository'

// function actived to write the days of the week
function writeWeek(date){
    // initialisation des ressources mémoire
    let semaine_tag = document.querySelector('.semaine') // ne pas oublier le point car c'est une class dans l'HTML
    let actualDate = new Date(date)
    let monday = getMonday(actualDate)
    let sunday = getSunday(monday)

    // met à jour l'entête de l'agenda (bleu)
    mondayTxt = ((monday.getDate() +1) + '/' + (monday.getMonth() + 1) );
    sundayTxt = ((sunday.getDate() + 1) + '/' + (sunday.getMonth() +1 ));
    // console.log(mondayTxt + ' - ' + sundayTxt);
    semaine_tag.innerHTML = (mondayTxt + ' - ' + sundayTxt);


    // met à jour le corp de l'agenda (blanc)
    for (let i = 1; i<8 ; i++) {
        // ajout des jours
        const day_tag = document.querySelector('.d_'+i);
        if (i-1 == actualDate.getDay()) {
            day_tag.classList.add('current-date');
        }

        // ajout des evènements sur l'affichage
        const event_tag = document.querySelector(".a_"+i);
        // faire vérifier la db avec Lenaïc
        DBRepository.DBRepository.getParticipations(1,setHTMLEvent);
    }
}
function setHTMLEvent(activityUser){
    let eventListID = [];
    for (id in activityUser){
        eventListID.push(id.event_id)
    }
    let dateToCheck = new Date(monday.getDay + (i-1))
    for (activity_id in eventListID){
        let event = DBRepository.DBRepository.getEvent(activity_id);
        let createTxtOfEvent = "";

        let dateEventBegin = getHourOfDate(event.begindate);
        if (dateEventBegin === dateToCheck) {
            createTxtOfEvent += dateEventBegin;
            createTxtOfEvent += '-' + getHourOfDate(event.endingdate);

            createTxtOfEvent += ' : ' + event.title;
            createTxtOfEvent += '. Type d\'activité : ' + event.category

            event_tag.innerHTML = createTxtOfEvent;
        }
    }
}
function getHourOfDate(date) {
    let hour = date.getHours()
    let minutes = date.getMinutes()
    return "" + hour + "h" + minutes + "min"
}

function getMonday(d) {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day;
    return new Date(d.setDate(diff));
}

function getSunday(d) {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + 6;
    return new Date(d.setDate(diff));
}

function prevW(event) { 
    event.preventDefault();
    let date = new Date();
    date.setDate()-= 7;
    writeWeek(date);
}

function nextW(event) {
    event.preventDefault();
    let date = new Date();
    date = new Date(date - 21*24*60*60);
    writeWeek(date);
}

function actualW(event){
    event.preventDefault();
    let date = new Date();
    writeWeek(date);
}

// set connection to div with id 'contrat_mariage' for all tag inside
document.getElementById("prevWeek").addEventListener("click", prevW());
document.getElementById("nextWeek").addEventListener("click", nextW());
// remplace agenda par l'id de la balise HTML depuis l'affichage de la map
// document.getElementById("agenda").addEventListener("click", actualW);