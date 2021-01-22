//import firebase from 'firebase';
//import 'firebase/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD4ycuAkAB4hPIE4yg4F1RL-KPKXcbjGhQ",
    authDomain: "dbd-project-3a517.firebaseapp.com",
    databaseURL: "https://dbd-project-3a517-default-rtdb.firebaseio.com",
    projectId: "dbd-project-3a517",
    storageBucket: "dbd-project-3a517.appspot.com",
    messagingSenderId: "439328211131",
    appId: "1:439328211131:web:f7f469318faaace6dee99e",
    measurementId: "G-2ST8CZJMXT"
  }
firebase.initializeApp(firebaseConfig)
//const projectStorage = firebase.storage()
firebase.analytics();  
console.log("Firebase Connected")
//export { projectStorage }