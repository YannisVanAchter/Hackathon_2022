class DBRepository{

  static getDBName() {return "PEV_fakedata"; }
  static shouldDeleteDB() {return true; }
  static masterObject(){ return this.masterObject; }

  constructor() { }

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
        // console.log("created user store");

        // Events
        db.createObjectStore("events", {keyPath: 'event_id'});
        // console.log("created event store");

        // Event participations
        db.createObjectStore("eventparticipations", {keyPath: 'eventparticipation_id'});
        // console.log("created eventparticipation store");

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
      {event_id:1,  title:"Promenade du soir", begindate:"2022-01-24T01:12:49Z", endingdate:"2022-01-24T04:12:49Z", location:"Rue Godefroid 29, 5000 Namur", description:"Venez on digère ensemble en marchant le long des quais à notre aise.", category:"promenade", category_type:"Sport"},
      {event_id:2,  title:"Partie de scrable", begindate:"2022-01-20T01:12:49Z", endingdate:"2022-01-20T04:12:49Z", location:"Rue Rue Basse Marcelle 6-28, 5000 Namur", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.", category:"scrabble", category_type:"Jeux"},
      {event_id:3,  title:"Tournois d'échec", begindate:"2022-01-20T01:12:49Z", endingdate:"2022-01-20T04:12:49Z", location:"Rue Julie Billiart 25-1, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"échecs", category_type:"Jeux"},
      {event_id:4,  title:"Expo classisime", begindate:"2022-01-21T01:12:49Z", endingdate:"2022-01-21T04:12:49Z", location:"Rue de Fer 72, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"exposition", category_type:"Art"},
      {event_id:5,  title:"Séminaire cybersecurité", begindate:"2022-01-22T01:12:49Z", endingdate:"2022-01-22T04:12:49Z", location:"Bd du N 3-7, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"céminaire", category_type:"Art"},
      {event_id:6,  title:"marché de la semaine", begindate:"2022-01-23T01:12:49Z", endingdate:"2022-01-23T04:12:49Z", location:"Rue de la Pépinière 36, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"promenade", category_type:"Sport"},
      {event_id:7,  title:"Présentation Tupperware", begindate:"2022-01-23T01:12:49Z", endingdate:"2022-01-23T04:12:49Z", location:"Rue Adolphe Bastin 52, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"commercial", category_type:"Sport"},
      {event_id:8,  title:"Promenade dans le parc", begindate:"2022-01-24T01:12:49Z", endingdate:"2022-01-24T04:12:49Z", location:"Rue Raymon Museu 21, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"promenade", category_type:"Sport"},
      {event_id:9,  title:"Atelier de potterie", begindate:"2022-01-24T01:12:49Z", endingdate:"2022-01-24T04:12:49Z", location:"Rue du Moulin Lavigne 6, 5002 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"poterie", category_type:"Art"},
      {event_id:10, title:"Bridge", begindate:"2022-01-24T01:12:49Z", endingdate:"2022-01-24T04:12:49Z", location:"Rue Emile Cuvelier 41, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"cartes", category_type:"Jeux"},
      {event_id:11, title:"Scrabble au chapi", begindate:"2022-01-24T01:12:49Z", endingdate:"2022-01-24T04:12:49Z", location:"Rue Notre Dame 14, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"scrabble", category_type:"Jeux"},
      {event_id:12, title:"Carnaval des ainés", begindate:"2022-01-26T01:12:49Z", endingdate:"2022-01-26T04:12:49Z", location:"Av. Blanche de Namur 5, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"promenade", category_type:"Sport"},
      {event_id:13, title:"Strip poker de josianne", begindate:"2022-01-26T01:12:49Z", endingdate:"2022-01-26T04:12:49Z", location:"Av. du Milieu du Monde 13-7, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"cardio", category_type:"Sport"},
      {event_id:14, title:"Prière à la bougie", begindate:"2022-01-26T01:12:49Z", endingdate:"2022-01-26T04:12:49Z", location:"All. de Menton 2-20, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"méditation", category_type:"Sport"},
      {event_id:15, title:"Sacrifice du poulet", begindate:"2022-01-27T01:12:49Z", endingdate:"2022-01-27T04:12:49Z", location:"All. de Menton 32, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"sacrifice", category_type:"Art"},
      {event_id:16, title:"Théatre Le malade imaginaire", begindate:"2022-01-28T01:12:49Z", endingdate:"2022-01-28T04:12:49Z", location:"Rue du Travail, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"théâtre", category_type:"Art"},
      {event_id:17, title:"Spencer au cinéma", begindate:"2022-01-28T08:12:49Z", endingdate:"2022-01-28T09:12:49Z", location:"Av. Vauban 56, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"cinéma", category_type:"Art"},
      {event_id:18, title:"Je me sens seul", begindate:"2022-01-26T01:12:49Z", endingdate:"2022-01-26T04:12:49Z", location:"Rue Henri Lemaïtre, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"psychiatrie", category_type:"Jeux"},
      {event_id:19, title:"Kayak", begindate:"2022-01-30T01:12:49Z", endingdate:"2022-01-30T04:12:49Z", location:"Rue Catherine de Savoie 3, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"kayak", category_type:"Sport"},
      {event_id:20, title:"Badmington au country club", begindate:"2022-01-30T01:12:49Z", endingdate:"2022-01-30T04:12:49Z", location:"Rte Merveilleuse 60, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"badmington", category_type:"Sport"},
      {event_id:21, title:"Ronde dans le quartier", begindate:"2022-01-24T31:12:49Z", endingdate:"2022-01-31T04:12:49Z", location:"Rue Yolande de Namur 8, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"po-police", category_type:"Jeux"},
      {event_id:22, title:"Vide grenier", begindate:"2022-01-31T01:12:49Z", endingdate:"2022-01-31T04:12:49Z", location:"Rue Basse Marcelle 6-28, 5000 Namur", description:"Nam id neque nec mi cursus imperdiet eu quis nisl.", category:"commercial", category_type:"Jeux"},
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
      {eventparticipation_id:1,  user_id:16, event_id:1},
      {eventparticipation_id:2,  user_id:1,  event_id:2},
      {eventparticipation_id:3,  user_id:1,  event_id:3},
      {eventparticipation_id:4,  user_id:2,  event_id:4},
      {eventparticipation_id:5,  user_id:3,  event_id:5},
      {eventparticipation_id:6,  user_id:5,  event_id:6},
      {eventparticipation_id:7,  user_id:5,  event_id:7},
      {eventparticipation_id:8,  user_id:6,  event_id:8},
      {eventparticipation_id:9,  user_id:3,  event_id:9},
      {eventparticipation_id:10, user_id:9,  event_id:10},
      {eventparticipation_id:11, user_id:12, event_id:11},
      {eventparticipation_id:12, user_id:12, event_id:12},
      {eventparticipation_id:13, user_id:7,  event_id:13},
      {eventparticipation_id:14, user_id:7,  event_id:14},
      {eventparticipation_id:15, user_id:6,  event_id:15},
      {eventparticipation_id:16, user_id:6,  event_id:16},
      {eventparticipation_id:17, user_id:10, event_id:17},
      {eventparticipation_id:18, user_id:10, event_id:18},
      {eventparticipation_id:19, user_id:10, event_id:19},
      {eventparticipation_id:20, user_id:5,  event_id:20},
      {eventparticipation_id:21, user_id:6,  event_id:21},
      {eventparticipation_id:22, user_id:7,  event_id:22},
      {eventparticipation_id:23, user_id:8,  event_id:21},
      {eventparticipation_id:24, user_id:9,  event_id:14},
      {eventparticipation_id:25, user_id:10, event_id:15},
      {eventparticipation_id:26, user_id:2,  event_id:16},
      {eventparticipation_id:27, user_id:4,  event_id:17},
      {eventparticipation_id:28, user_id:7,  event_id:18},
      {eventparticipation_id:29, user_id:14, event_id:19},
      {eventparticipation_id:30, user_id:9,  event_id:1},
      {eventparticipation_id:31, user_id:8,  event_id:2},
      {eventparticipation_id:32, user_id:6,  event_id:3},
      {eventparticipation_id:33, user_id:1,  event_id:4},
      {eventparticipation_id:34, user_id:2,  event_id:5},
      {eventparticipation_id:35, user_id:2,  event_id:6},
      {eventparticipation_id:36, user_id:3,  event_id:7},
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
        // console.log("Deleted database successfully");
        callback(true);
    };
    req.onerror = function () {
        // console.log("Couldn't delete database");
        // callback(false);
    };
    req.onblocked = function () {
        // console.log("Couldn't delete database due to the operation being blocked");
        // callback(false);
    };
  }


  // =========== USERS =============================
  static addUser(userObject, callback) {
    if(typeof userObject.user_id === 'undefined' || userObject.user_id === null){
      userObject.user_id = Random.getRandomInt(6700);
    }
    let userObject_data = {user_id: userObject.user_id, fullname: userObject.fullname, email: userObject.email,
       password: userObject.password, avatar_filename: userObject.imagepath}
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
      let objectStoreRequest = objectStore.get(event_id);

      objectStoreRequest.onsuccess = function(event) {
        // report the success of our request
        // console.log("success objectsotre");
        callback(event.target.result);
        db.close();
      };
      objectStoreRequest.onerror = function(event){
        console.log(event);
      }
    };
  }

  static getAllEvents(callback){
    let DBOpenRequest = window.indexedDB.open(DBRepository.getDBName(), 4);
    DBOpenRequest.onsuccess = function(event) {
    console.log("Database Opened");
    
      // store the result of opening the database in the db variable.
      // This is used a lot below
      let db = DBOpenRequest.result;

      let transaction = db.transaction(["events"], "readwrite");

      // report on the success of the transaction completing, when everything is done
      transaction.oncomplete = function(event) {
        console.log("transaction complete");
      };

      transaction.onerror = function(event) {
        console.log("error occured");
      };

      // create an object store on the transaction
      let objectStore = transaction.objectStore("events");

      // Make a request to add our newItem object to the object store
      let objectStoreRequest = objectStore.getAll();

      objectStoreRequest.onsuccess = function(event) {
        // report the success of our request
        callback(event.target.result);
        db.close();
      };
    };
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

      // Make a request to get our newItem object from the object store
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
    let returnList = [];
    let cpt = 0;
    DBRepository.getAllEventParticipations(function(eventParticipations_list){
      eventParticipations_list.forEach(eventParticipation => {
        if(eventParticipation.event_id === event_id){
          returnList.push(eventParticipation);
        }
      });
      callback(returnList);
    });
  }

  static getParticipations(user_id, callback){
    let returnList = [];
    let cpt = 0;
    DBRepository.getAllEventParticipations(function(eventParticipations_list){
      eventParticipations_list.forEach(eventParticipation => {
        
        console.log(eventParticipation.user_id);
        if(eventParticipation.user_id === user_id){
          returnList.push(eventParticipation);
        }
      });
      callback(returnList);
    });
  }

  static getAllEventParticipations(callback){
    let DBOpenRequest = window.indexedDB.open(DBRepository.getDBName(), 4);
    DBOpenRequest.onsuccess = function(event) {
    console.log("Database Opened");
    
      // store the result of opening the database in the db variable.
      // This is used a lot below
      let db = DBOpenRequest.result;

      let transaction = db.transaction(["eventparticipations"], "readwrite");

      // report on the success of the transaction completing, when everything is done
      transaction.oncomplete = function(event) {
        console.log("transaction complete");
      };

      transaction.onerror = function(event) {
        console.log("error occured");
      };

      // create an object store on the transaction
      let objectStore = transaction.objectStore("eventparticipations");

      // Make a request to add our newItem object to the object store
      let objectStoreRequest = objectStore.getAll();

      objectStoreRequest.onsuccess = function(event) {
        // report the success of our request
        callback(event.target.result);
        db.close();
      };
    };
  }


}