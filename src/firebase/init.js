import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKFhzHBCAn5xhNVbmXdfGGS78QlPNRNAA",
  authDomain: "my-transfers.firebaseapp.com",
  databaseURL: "https://my-transfers.firebaseio.com",
  projectId: "my-transfers",
  storageBucket: "my-transfers.appspot.com",
  messagingSenderId: "568903082651",
  appId: "1:568903082651:web:3fa41e1deae4d3291a1c3e",
  measurementId: "G-GHVMGM8SYJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth, firebase };
