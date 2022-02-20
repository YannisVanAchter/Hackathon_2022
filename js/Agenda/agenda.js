
const weeks = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
];

const today = new Date();

// function actived to write the days of the week
function writeWeek(date){
    // initialisation des ressources mémoire
    let semaine_tag = document.querySelector('.semaine')
    let actualDate = new Date(date)
    let monday = getMonday(actualDate)
    let sunday = getSunday(monday)

    // met à jour l'entête de l'agenda (bleu)
    mondayTxt = ((monday.getDate() +1) + '/' + (monday.getMonth() + 1) );
    sundayTxt = ((sunday.getDate() + 1) + '/' + (sunday.getMonth() +1 ));
    console.log(mondayTxt + ' - ' + sundayTxt);
    semaine_tag.innerHTML = (mondayTxt + ' - ' + sundayTxt);


    // met à jour le corp de l'agenda (blanc)
    for (let i = 1; i<8 ; i++) {
        // ajout des jours
        const day_tag = document.querySelector('.d_'+i);
        if (i-1 == actualDate.getDay()) {
            day_tag.classList.add('current-date');
        }

        // ajout des evènements
        const event_tag = document.querySelector(".a_"+i)
        // faire vérifier la db avec Lenaïc
        // event_tag.innerHTML = EventParticipation()
    }
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

// let headCalendar = "Semaine du " + getMonday(current) + " au " + getSunday(current);

// let weekCalendar = {
    
// }

function prevW(event) {
    // preventDefault() = 
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
document.getElementById("prevWeek").addEventListener("click", prevW);
document.getElementById("nextWeek").addEventListener("click", nextW);
// remplace BALISE par la balise HTML depuis l'affichage de la map
// document.getElementById(BALISE).addEventListener("click", actualW);