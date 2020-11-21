import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDL70pcB8ne0tU9tuCSC3zu2hbLWvZwTvo",
  authDomain: "holler-97473.firebaseapp.com",
  databaseURL: "https://holler-97473.firebaseio.com",
  projectId: "holler-97473",
  storageBucket: "holler-97473.appspot.com",
  messagingSenderId: "145174732635",
  appId: "1:145174732635:web:0e023856a67bb8f0ae847e",
  measurementId: "G-0DEZ7LKHJK",
};

const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fire;
