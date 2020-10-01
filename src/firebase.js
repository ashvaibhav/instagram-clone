const firebaseConfig = {
  apiKey: "AIzaSyANuXYoyoUDouVsp1JzzQ5WrPYGJSpuXUw",
  authDomain: "va-instagram.firebaseapp.com",
  databaseURL: "https://va-instagram.firebaseio.com",
  projectId: "va-instagram",
  storageBucket: "va-instagram.appspot.com",
  messagingSenderId: "440416164017",
  appId: "1:440416164017:web:71821e2bc21163d4872a90",
};

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
