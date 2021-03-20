//If serviceWorker is available then load it.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js", { scope: "/" })
      .then((reg) => {
        console.log("Service Worker Registered");
      });
  });
}

const indexedDB = window.indexedDB;
let db;

//Creates a new db request for a "budget" database.
const request = indexedDB.open("budget", 1);

//Creates an object store called "pending" and sets the autoIncrement to true
request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true });
  };
  
  //Checks if the app is online before reading from the db
  request.onsuccess = (event) => {
    db = event.target.result;
    if (navigator.onLine) {
      checkDatabase();
    }
  };
  
  request.onerror = (event) => {
    console.log("Woops! " + event.target.errorCode);
  };
  
  let saveRecord = (record) => {
    //Creates a transaction on the pending db with readwrite access
    const transaction = db.transaction(["pending"], "readwrite");
  
    //Accesses the pending object store
    const store = transaction.objectStore("pending");
  
    //Adds a record to the store with the add method.
    store.add(record);
  };