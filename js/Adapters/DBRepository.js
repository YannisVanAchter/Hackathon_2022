class DBRepository{

  constructor() {
    //TODO Seed database with default values
    console.log("Seeding indexedDB");

    //Opening datastore
    const dbPromise = idb.open('PEV_fakedata', 1);
    dbPromise.resolve(function(){
      alert("opened datastore");
    });

  }


  // =========== USERS =============================
  static addUser(userObject) {

  }

  
  static doesLoginExist(email, password, callback) {

  }


  //  =========== EVENTS =============================
  static addEvent(eventObject) {

  }


  //  =========== EVENT PARTICIPATION =============================
  static addEventParticipation(addEventParticipationObject) {

  }


}