import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjzfaZlKFPpOz9cPwQWEU_FC6Fk4sRDmg",
  authDomain: "clone-f8eee.firebaseapp.com",
  projectId: "clone-f8eee",
  storageBucket: "clone-f8eee.appspot.com",
  messagingSenderId: "747111056608",
  appId: "1:747111056608:web:48b6d8151a67c2761ffc85",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
