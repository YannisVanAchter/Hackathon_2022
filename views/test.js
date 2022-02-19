
class SetNewEvent {
    constructor(title, beginDate, endDate, category, place, description) {
        this.title = title;
        this.category = category;
        this.place = place;
        this.description = description;
        if (this.checkBeginEnd(beginDate, endDate)) {
            console.log(beginDate);
            if (this.checkBeginEnd(this.getActualDate(), beginDate)) {
                this.beginDate = beginDate;
                this.endDate = endDate;
            }
        }
    }
    getActualDate() {
        return new Date();
    }
    checkBeginEnd(_beginDate, _endDate) {
        /* vérifier que la date de début est avant la date de fin de l'évènement*/
        return _beginDate < _endDate;
    }
}

function SubmitEvent(event){
    new SetNewEvent('Hello' , new Date("2022-04-15") , 
new Date("2022-04-16"), "Jeux Scrable" ,'Av. Sergent Vrithoff 2, 5000 Namur' , 'Jeu de scrable chez Marilène');
console.log(event);

}

var myObject = new SetNewEvent('Hello' , new Date("2022-04-15") , 
new Date("2022-04-16"), "Jeux Scrable" ,'Av. Sergent Vrithoff 2, 5000 Namur' , 'Jeu de scrable chez Marilène');

// alert(myObject.title);
// alert(myObject.category);
// alert(myObject.place);
// alert(myObject.description);
// alert(myObject.beginDate);
// alert(myObject.endDate);

const form = document.getElementById('test-form');
const message = document.querySelector('.message');

function interceptForm(event) {
    event.preventDefault();

    const title = form[0].value;
    const location = form[1].value;
    const beginDate = form[2].value;

    console.log(title);

    message.innerHTML = title;
}

form.addEventListener('submit', interceptForm);
