
class SetNewEvent {
    constructor(title, beginDate, endDate, category, place, description) {
        this.title = title;
        this.category = category;
        this.place = place;
        this.description = description;
        this.beginDate = beginDate;
        this.endDate = endDate;
            }
        }
function getActualDate() {
        return new Date();
    }
function checkBeginEnd(_beginDate, _endDate) {
        /* vérifier que la date de début est avant la date de fin de l'évènement*/
        return _beginDate < _endDate;
    }

const form = document.getElementById('test-form');
const message = document.querySelector('.message');

function interceptForm(event) {
    event.preventDefault();

    const title = form[0].value;
    const location = form[1].value;
    const beginDate = form[2].value;
    const endDate = form[3].value;
    const category = form[4].value;
    const description = form[5].value;
    var txtToComplete = 'Veuillez completer : ';
    var complete = true;
    console.log(title);
    console.log(location);
    console.log(beginDate);
    console.log(endDate);
    console.log(category);
    console.log(description);

    if (title.lenght == 0 ){txtToComplete += ' le titre de l\'évenement', complete = false;};
    if (location.lenght == ){txtToComplete += ' la localisation', complete = false;};
    if (!checkBeginEnd(beginDate , endDate) || !checkBeginEnd(getActualDate(), beginDate)) {
        txtToComplete += ' les date de manière correcte', complete = false;};
    if (category.length == 0){txtToComplete += ' la catégorie', complete = false;};
    if (complete){
        return new SetNewEvent(title, beginDate, endDate,category,location,description)
    }
    else{ message.innerHTML = txtToComplete; return null;};
}

form.addEventListener('submit', interceptForm);
