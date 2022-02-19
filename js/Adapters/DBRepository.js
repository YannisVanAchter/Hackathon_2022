class DBRepository{

  static getDBName() {return "PEV_fakedata"; }
  static shouldDeleteDB() {return true; }

  constructor() { }

  static init(callback){

    DBRepository.deleteDB(function(deletesuccess){
      if(!deletesuccess){
        throw new Error("Coudln't delete database");
      }

      const user_data = [
        {user_id:1,  fullname:"Marie Antoinette", email:"m.antoinette@gmail.com", password:"thisisatest", avatar_filename:"avatar.png"},
        {user_id:2,  fullname:"Wolf Dancy", email:"wdancy0@guardian.co.uk", password:"thisisatest", avatar_filename:"avatar.png"},
        {user_id:3,  fullname:"Hernando Lloyds", email:"hlloyds1@cnn.com", password:"thisisatest", avatar_filename:"avatar.png"},
        {user_id:4,  fullname:"Chrystel Phipard-Shears", email:"cphipardshears2@moonfruit.com", password:"thisisatest", avatar_filename:"avatar.png"},
        {user_id:5,  fullname:"Catherine Ride", email:"cride3@imgur.com", password:"thisisatest", avatar_filename:"avatar.png"},
        {user_id:6,  fullname:"Garrot Secrett", email:"gsecrett4@fema.gov", password:"thisisatest", avatar_filename:"avatar.png"},
        {user_id:7,  fullname:"Ivan Tarney", email:"itarney5@usda.gov", password:"thisisatest", avatar_filename:"avatar.png"},
        {user_id:8,  fullname:"Agnesse Hallawell", email:"ahallawell6@cdc.gov", password:"thisisatest", avatar_filename:"avatar.png"},
        {user_id:9,  fullname:"Britte Greschke", email:"bgreschke7@amazonaws.com", password:"thisisatest", avatar_filename:"avatar.png"},
        {user_id:10, fullname:"Leonore Hasell", email:"lhasell8@guardian.co.uk", password:"thisisatest", avatar_filename:"avatar.png"},
        {user_id:11, fullname:"Henrie Whelband", email:"hwhelband9@tumblr.com", password:"thisisatest", avatar_filename:"avatar.png"},
        {user_id:12, fullname:"Breanne Cottham", email:"bcotthama@drupal.org", password:"thisisatest", avatar_filename:"avatar.png"},
        {user_id:13, fullname:"Finley Kingman", email:"fkingmanb@timesonline.co.uk", password:"thisisatest", avatar_filename:"avatar.png"},
        {user_id:14, fullname:"Lavina Campe", email:"lcampec@hao123.com", password:"thisisatest", avatar_filename:"avatar.png"},
        {user_id:15, fullname:"Jyoti Tender", email:"jtenderd@aol.com", password:"thisisatest", avatar_filename:"avatar.png"},
        {user_id:16, fullname:"Daryl Collen", email:"dcollene@japanpost.jp", password:"thisisatest", avatar_filename:"avatar.png"},
      ];

      const event_data = [
        {event_id:1, title:"Promenade du soir", begindate:1645365000, endingdate:1645379400, location:"Rue Godefroid 29, 5000 Namur", description:"Venez on digère ensemble en marchant le long des quais à notre aise.", category:"promenade", category_type:"Sport"},
      ];

      const event_participation_data = [
        {eventparticipation_id:1, user_id:1, event_id:1},
      ];

      var request = indexedDB.open(DBRepository.getDBName(), 2);
  
      request.onerror = event => {
        console.log("Couldn't open db " + event.target.result);
        callback(false);
      };
      request.onupgradeneeded = event => {
        var db = event.target.result;
      
        // Users
        var objectStore = db.createObjectStore("users", {keyPath: 'user_id'});
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("email", "email", { unique: true });
      
        objectStore.transaction.oncomplete = event => {
          // Store values in the newly created objectStore.
          var userObjectStore = db.transaction("users", "readwrite").objectStore("users");
          user_data.forEach(function(user) {
            userObjectStore.add(user);
          });
        };

        // Events
        var objectStore = db.createObjectStore("events", {keyPath: 'event_id'});
      
        objectStore.transaction.oncomplete = event => {
          // Store values in the newly created objectStore.
          var eventObjectStore = db.transaction("events", "readwrite").objectStore("events");
          event_data.forEach(function(_event) {
            eventObjectStore.add(_event);
          });
        };

        // Event participations
        var objectStore = db.createObjectStore("eventparticipations", {keyPath: 'eventparticipation_id'});
      
        objectStore.transaction.oncomplete = event => {
          // Store values in the newly created objectStore.
          var eventparticipationObjectStore = db.transaction("eventparticipations", "readwrite").objectStore("eventparticipations");
          event_participation_data.forEach(function(eventparticipation) {
            eventparticipationObjectStore.add(eventparticipation);
          });
        };
      };

    });
    
  }

  //static init(callback){
  //  try{
  //    // Try to delete the DB
  //    DBRepository.deleteDB(function(deletesuccess) {
  //      if(!deletesuccess) {
  //        throw new Error("Couldn't delete database");
  //      }
//
  //      // Try to open the DB
  //      DBRepository.openOrCreateDB(function(dbPromise) {
  //        if(dbPromise == null){
  //          throw new Error("Coudldn't open database");
  //        }
//
  //        // Try to create the schema
  //        DBRepository.createSchema(dbPromise, function(createsuccess){
  //          if(!createsuccess) {
  //            throw new Error("Couldn't create schema")
  //          }
//
  //          // Try to seed the database
  //          DBRepository.seedDB(dbPromise, function(seedsuccess){
  //            if(!seedsuccess) {
  //              throw new Error("Couldn't seed database");
  //            }
  //            callback(true);
  //          });
//
  //        });
//
  //      });
  //    
  //    });
  //    
  //  } catch(Err){
  //    console.log("Error on database seed ", Err);
  //    callback(false);
  //  }
//
  //}
//
  //static seedDB(db, callback){
  //  users_data = [
  //    {fullname:"Brigitte bardo", email:"josianna@gmail.com", password:"thisisatest", image_filename:"avatar.png"},
  //  ]
  //  var customerObjectStore = db.transaction("users", "readwrite").objectStore("users");
  //  customerData.forEach(function(customer) {
  //    customerObjectStore.add(customer);
  //  });
  //}
//
  //static createSchema(db, callback) {
  //  // Users
  //  try {
  //    store = request.transaction.objectStore('users');
  //    callback(false);
  //  }
  //  catch(e) {
  //    db.createObjectStore('users', {keyPath: 'user_id', autoIncrement:true});
  //  }
//
  //  // Events
  //  try {
  //    store = request.transaction.objectStore('events');
  //    callback(false)
  //  }
  //  catch(e) {
  //    db.createObjectStore('events', {keyPath: 'event_id', autoIncrement:true});
  //  }
//
  //  // Event Participations
  //  try {
  //    store = request.transaction.objectStore('eventparticipations');
  //    callback(false)
  //  }
  //  catch(e) {
  //    db.createObjectStore('eventparticipations', {keyPath: 'eventparticipation_id', autoIncrement:true});
  //  }
//
  //  callback(true);
  //  
  //}
//
  //static openOrCreateDB(callback){
  //  const request = window.indexedDB.open(DBRepository.getDBName(), 3);
  //  request.onerror = event => { callback(null) };
  //  request.onsuccess = event => { 
  //    const db = event.target.result
  //    db.onerror = event => {
  //      // Generic error handler for all errors targeted at this database's
  //      throw new Error("An error occured " + event.target.errorCode);
  //    };
  //    callback(db);
  //  };
//
  //}
//
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