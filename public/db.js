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