class DBRepository{

  static getDBName() {return "PEV_fakedata"; }
  static shouldDeleteDB() {return true; }
  static masterObject(){ return this.masterObject; }

  constructor() { }

  //static init(callback){
  //  this.masterObject = {
  //    Users : [
  //      {user_id:1,  fullname:"Marie Antoinette", email:"m.antoinette@gmail.com", password:"thisisatest", avatar_filename:"avatar.png"},
  //      {user_id:2,  fullname:"Wolf Dancy", email:"wdancy0@guardian.co.uk", password:"thisisatest", avatar_filename:"avatar.png"},
  //      {user_id:3,  fullname:"Hernando Lloyds", email:"hlloyds1@cnn.com", password:"thisisatest", avatar_filename:"avatar.png"},
  //      {user_id:4,  fullname:"Chrystel Phipard-Shears", email:"cphipardshears2@moonfruit.com", password:"thisisatest", avatar_filename:"avatar.png"},
  //      {user_id:5,  fullname:"Catherine Ride", email:"cride3@imgur.com", password:"thisisatest", avatar_filename:"avatar.png"},
  //      {user_id:6,  fullname:"Garrot Secrett", email:"gsecrett4@fema.gov", password:"thisisatest", avatar_filename:"avatar.png"},
  //      {user_id:7,  fullname:"Ivan Tarney", email:"itarney5@usda.gov", password:"thisisatest", avatar_filename:"avatar.png"},
  //      {user_id:8,  fullname:"Agnesse Hallawell", email:"ahallawell6@cdc.gov", password:"thisisatest", avatar_filename:"avatar.png"},
  //      {user_id:9,  fullname:"Britte Greschke", email:"bgreschke7@amazonaws.com", password:"thisisatest", avatar_filename:"avatar.png"},
  //      {user_id:10, fullname:"Leonore Hasell", email:"lhasell8@guardian.co.uk", password:"thisisatest", avatar_filename:"avatar.png"},
  //      {user_id:11, fullname:"Henrie Whelband", email:"hwhelband9@tumblr.com", password:"thisisatest", avatar_filename:"avatar.png"},
  //      {user_id:12, fullname:"Breanne Cottham", email:"bcotthama@drupal.org", password:"thisisatest", avatar_filename:"avatar.png"},
  //      {user_id:13, fullname:"Finley Kingman", email:"fkingmanb@timesonline.co.uk", password:"thisisatest", avatar_filename:"avatar.png"},
  //      {user_id:14, fullname:"Lavina Campe", email:"lcampec@hao123.com", password:"thisisatest", avatar_filename:"avatar.png"},
  //      {user_id:15, fullname:"Jyoti Tender", email:"jtenderd@aol.com", password:"thisisatest", avatar_filename:"avatar.png"},
  //      {user_id:16, fullname:"Daryl Collen", email:"dcollene@japanpost.jp", password:"thisisatest", avatar_filename:"avatar.png"},
  //    ],
  //    Events : [
  //      {event_id:1, title:"Promenade du soir", begindate:1645365000, endingdate:1645379400, location:"Rue Godefroid 29, 5000 Namur", description:"Venez on digère ensemble en marchant le long des quais à notre aise.", category:"promenade", category_type:"Sport"},
  //    ],
  //    EventParticipations : [
  //      {eventparticipation_id:1, user_id:1, event_id:1},
  //    ]
  //  }
  //}

  static init(callback){

    DBRepository.deleteDB(function(deletesuccess){
      if(!deletesuccess){
        throw new Error("Coudln't delete database");
      }

      let request = indexedDB.open(DBRepository.getDBName(), 2);

      request.onerror = event => {
        console.log("Couldn't open db " + event.target.result);
        callback(false);
      };
      request.onupgradeneeded = event => {
        const db = event.target.result;
      
        // Users
        let userObjectStore = db.createObjectStore("users", {keyPath: 'user_id'});
        userObjectStore.createIndex("name", "name", { unique: false });
        userObjectStore.createIndex("email", "email", { unique: true });
        console.log("created user store");

        // Events
        db.createObjectStore("events", {keyPath: 'event_id'});
        console.log("created event store");

        // Event participations
        db.createObjectStore("eventparticipations", {keyPath: 'eventparticipation_id'});
        console.log("created eventparticipation store");

        callback(true);
      }
    });
    
  }

  static seedUsers(callback){
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

    let cpt = 0;
    user_data.forEach(user_item => {
      this.addUser({fullname : user_item.fullname, email: user_item.email, password: user_item.password, imagepath: user_item.avatar_filename, user_id: user_item.user_id}, function(){ 
        cpt++;
        if(cpt >= user_data.length){
          callback(true);
        }
      });
    });
  }

  static seedEvents(callback){
    const event_data = [
      {event_id:1, title:"Promenade du soir", begindate:1645365000, endingdate:1645379400, location:"Rue Godefroid 29, 5000 Namur", description:"Venez on digère ensemble en marchant le long des quais à notre aise.", category:"promenade", category_type:"Sport"},
    ];

    let cpt = 0;
    event_data.forEach(event_item => {
      this.addEvent({title: event_item.title, begindate: event_item.begindate, endingdate: event_item.endingdate, location: event_item.location, description: event_item.description, category: event_item.category, type: event_item.category_type, event_id : event_item.event_id}, function(){
        cpt++;
        if(cpt >= event_data.length){
          callback(true);
        }
      });

    });
  }

  static seedEventParticipations(callback){
    const event_participation_data = [
      {eventparticipation_id:1, user_id:1, event_id:1},
    ];

    let cpt = 0;
    event_participation_data.forEach(event_participation_item => {
      this.addEventParticipation({user_id: event_participation_item.user_id, event_id: event_participation_item.event_id, eventparticipation_id: event_participation_item.eventparticipation_id}, function(){
        cpt++;
        if(cpt >= event_participation_data.length){
          callback(true);
        }
      });

    });
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
    if(typeof userObject.user_id === 'undefined' || userObject.user_id === null){
      userObject.user_id = Random.getRandomInt(6700);
    }
    let userObject_data = {user_id: userObject.user_id, fullname: userObject.fullname, email: userObject.email, password: userObject.password, avatar_filename: userObject.imagepath}
    let DBOpenRequest = window.indexedDB.open(DBRepository.getDBName(), 4);
    DBOpenRequest.onsuccess = function(event) {
      //console.log("Database Opened");
    
      // store the result of opening the database in the db variable.
      // This is used a lot below
      let db = DBOpenRequest.result;

      let transaction = db.transaction(["users"], "readwrite");

      // report on the success of the transaction completing, when everything is done
      transaction.oncomplete = function(event) {
        //console.log("transaction complete");
      };

      transaction.onerror = function(event) {
        //console.log("error occured");
      };

      // create an object store on the transaction
      let objectStore = transaction.objectStore("users");

      // Make a request to add our newItem object to the object store
      let objectStoreRequest = objectStore.add(userObject_data);

      objectStoreRequest.onsuccess = function(event) {
        // report the success of our request
        //console.log("success objectsotre");
        callback(true);
        db.close();
      };
    };
    
  }

  static getUser(user_id, callback){
    let DBOpenRequest = window.indexedDB.open(DBRepository.getDBName(), 4);
    DBOpenRequest.onsuccess = function(event) {
      //console.log("Database Opened");
    
      // store the result of opening the database in the db variable.
      // This is used a lot below
      let db = DBOpenRequest.result;

      let transaction = db.transaction(["users"], "readwrite");

      // report on the success of the transaction completing, when everything is done
      transaction.oncomplete = function(event) {
        //console.log("transaction complete");
      };

      transaction.onerror = function(event) {
        //console.log("error occured");
      };

      // create an object store on the transaction
      let objectStore = transaction.objectStore("users");

      // Make a request to add our newItem object to the object store
      let objectStoreRequest = objectStore.get(user_id);

      objectStoreRequest.onsuccess = function(event) {
        // report the success of our request
        //console.log("success objectsotre");
        callback(event.target.result);
        db.close();
      };
    };

  }
  
  static doesLoginExist(email, callback) {
    let DBOpenRequest = window.indexedDB.open(DBRepository.getDBName(), 4);
    DBOpenRequest.onsuccess = function(event) {
      //console.log("Database Opened");
    
      // store the result of opening the database in the db variable.
      // This is used a lot below
      let db = DBOpenRequest.result;

      let transaction = db.transaction(["users"], "readwrite");

      // report on the success of the transaction completing, when everything is done
      transaction.oncomplete = function(event) {
        //console.log("transaction complete");
      };

      transaction.onerror = function(event) {
        //console.log("error occured");
      };

      // create an object store on the transaction
      let objectStore = transaction.objectStore("users");

      // Make a request to add our newItem object to the object store
      let objectStoreRequest = objectStore.get(email);

      objectStoreRequest.onsuccess = function(event) {
        // report the success of our request
        //console.log("success objectsotre");
        callback(true);
        db.close();
      };
      objectStoreRequest.onerror = function(event){
        callback(false);
        db.close();
      }
    };
  }


  //  =========== EVENTS =============================
  static addEvent(eventObject, callback) {
    if(typeof eventObject.event_id === 'undefined' || eventObject.event_id === null){
      eventObject.user_id = Random.getRandomInt(6700);
    }
    let eventObject_data = {title: eventObject.title, begindate: eventObject.begindate, endingdate: eventObject.endingdate, location: eventObject.location, description: eventObject.description, category: eventObject.category, type: eventObject.category_type, event_id : eventObject.event_id}
    let DBOpenRequest = window.indexedDB.open(DBRepository.getDBName(), 4);
    DBOpenRequest.onsuccess = function(event) {
      //console.log("Database Opened");
    
      // store the result of opening the database in the db variable.
      // This is used a lot below
      let db = DBOpenRequest.result;

      let transaction = db.transaction(["events"], "readwrite");

      // report on the success of the transaction completing, when everything is done
      transaction.oncomplete = function(event) {
        //console.log("transaction complete");
      };

      transaction.onerror = function(event) {
        //console.log("error occured");
      };

      // create an object store on the transaction
      let objectStore = transaction.objectStore("events");

      // Make a request to add our newItem object to the object store
      let objectStoreRequest = objectStore.add(eventObject_data);

      objectStoreRequest.onsuccess = function(event) {
        // report the success of our request
        //console.log("success objectsotre");
        console.log("success");
        callback(true);
        db.close();
      };
    };
  }

  static getEvent(event_id, callback) {

  }

  static getAllEvents(callback){

  }

  //  =========== EVENT PARTICIPATION =============================
  static addEventParticipation(addEventParticipationObject, callback) {
    if(typeof addEventParticipationObject.eventparticipation_id === 'undefined' || addEventParticipationObject.eventparticipation_id === null){
      eventObject.user_id = Random.getRandomInt(6700);
    }
    let eventParticipationObject_data = {user_id: addEventParticipationObject.user_id, event_id: addEventParticipationObject.event_id, eventparticipation_id: addEventParticipationObject.eventparticipation_id}
    let DBOpenRequest = window.indexedDB.open(DBRepository.getDBName(), 4);
    DBOpenRequest.onsuccess = function(event) {
      //console.log("Database Opened");
    
      // store the result of opening the database in the db variable.
      // This is used a lot below
      let db = DBOpenRequest.result;

      let transaction = db.transaction(["eventparticipations"], "readwrite");

      // report on the success of the transaction completing, when everything is done
      transaction.oncomplete = function(event) {
        //console.log("transaction complete");
      };

      transaction.onerror = function(event) {
        //console.log("error occured");
      };

      // create an object store on the transaction
      let objectStore = transaction.objectStore("eventparticipations");

      // Make a request to add our newItem object to the object store
      let objectStoreRequest = objectStore.add(eventParticipationObject_data);

      objectStoreRequest.onsuccess = function(event) {
        // report the success of our request
        //console.log("success objectsotre");
        callback(true);
        db.close();
      };

    };
  }

  static getParticipants(event_id, callback){

  }

  static getParticipations(user_id, callback){

  }


}