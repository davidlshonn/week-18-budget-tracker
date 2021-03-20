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

