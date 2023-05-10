import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD_eo_Pa9XW1U4vO_sJQwnm2x2IcQBZf2k",
  authDomain: "nille-14a1f.firebaseapp.com",
  projectId: 'nille-14a1f',
  storage_bucket: "nille-14a1f.appspot.com",
};

//const app = initializeApp(firebaseConfig);
  // initialize firebase
let app;

if(!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

//export default app;

