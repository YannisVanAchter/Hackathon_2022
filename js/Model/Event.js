class Event(){
  constructor(_title, _begindate, _endingdate, _location, _description, _category, _event_id=null){
    this.title = _title;
    this.begindate = _begindate;
    this.endingdate = _endingdate;
    this.location = _location;
    this.description = _description;
    this.category = _category;
    this.event_id = _event_id;
  }
}