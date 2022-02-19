class DBRepository{

  static getDBName() {return "PEV_fakedata"; }
  static shouldDeleteDB() {return true; }

  constructor() { }

  static init(callback){
    try{
      // Try to delete the DB
      DBRepository.deleteDB(function(deletesuccess) {
        if(!deletesuccess) {
          throw new Error("Couldn't delete database");
        }

        // Try to open the DB
        DBRepository.openOrCreateDB(function(dbPromise) {
          if(dbPromise == null){
            throw new Error("Coudldn't open database");
          }

          // Try to create the schema
          DBRepository.createSchema(dbPromise, function(createsuccess){
            if(!createsuccess) {
              throw new Error("Couldn't create schema")
            }

            // Try to seed the database
            DBRepository.seedDB(db, function(seedsuccess){
              if(!seedsuccess) {
                throw new Error("Couldn't seed database");
              }
              callback(true);
            });

          });

        });
      
      });
      
    } catch(Err){
      console.log("Error on database seed ", Err);
      callback(false);
    }

  }

  static seedDB(db, callback){
    db.then(function(db) {
      var tx = db.transaction('users', 'readwrite');
      var store = tx.objectStore('users');
      var item = {
        fullname: 'Aude Lamard',
        email: 'example@test.com',
        password: 'thisisatest',
        pathToAvatar: 'avatar.png'
      };
      store.add(item);
      return tx.complete;
    }).then(function() {
      console.log('added item to the store os!');
    });
    callback();
  }

  static createSchema(dbPromise, callback) {
    dbPromise.then(function(db){
      // Users
      try {
        store = request.transaction.objectStore('users');
        callback(false);
      }
      catch(e) {
        db.createObjectStore('users', {keyPath: 'user_id', autoIncrement:true});
      }

      // Events
      try {
        store = request.transaction.objectStore('events');
        callback(false)
      }
      catch(e) {
        db.createObjectStore('events', {keyPath: 'event_id', autoIncrement:true});
      }

      // Event Participations
      try {
        store = request.transaction.objectStore('eventparticipations');
        callback(false)
      }
      catch(e) {
        db.createObjectStore('eventparticipations', {keyPath: 'eventparticipation_id', autoIncrement:true});
      }

      callback(true);
    });
    
  }

  static openOrCreateDB(callback){
    const request = window.indexedDB.open(DBRepository.getDBName(), 3);
    request.onerror = event => { callback(null) };
    request.onsuccess = event => { 
      const db = event.target.result
      db.onerror = event => {
        // Generic error handler for all errors targeted at this database's
        throw new Error("An error occured " + event.target.errorCode);
      };
      callback(db);
    };

  }

  static deleteDB(callback){
    if(!DBRepository.shouldDeleteDB()){
      callback(true);
    }
    var req = indexedDB.deleteDatabase(DBRepository.getDBName());
    req.onsuccess = function () {
        console.log("Deleted database successfully");
        callback(true);
    };
    req.onerror = function () {
        console.log("Couldn't delete database");
        callback(false);
    };
    req.onblocked = function () {
        console.log("Couldn't delete database due to the operation being blocked");
        callback(false);
    };
  }


  // =========== USERS =============================
  static addUser(userObject, callback) {

  }

  static getUser(user_id, callback){

  }
  
  static doesLoginExist(email, password, callback) {

  }


  //  =========== EVENTS =============================
  static addEvent(eventObject, callback) {

  }

  static getEvent(event_id, callback) {

  }

  static getAllEvents(callback){

  }


  //  =========== EVENT PARTICIPATION =============================
  static addEventParticipation(addEventParticipationObject, callback) {

  }

  static getParticipants(event_id, callback){

  }


}