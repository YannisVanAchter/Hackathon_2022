
const week = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche"
];

let today = new Date()

function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day;
    return new Date(d.setDate(diff));
}
  
function getSunday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + 6;
    return new Date(d.setDate(diff));
}

var headCalendar = "Semaine du " + getMonday(today) + " au " + getSunday(today);

var weekCalendar = {
    var dayNb = 
    while(dayNb < 7) {

        // print ?? + event (with hour)
        day = week(dayNb);
        dayNb++;
    }
}

