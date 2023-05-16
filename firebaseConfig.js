import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD_eo_Pa9XW1U4vO_sJQwnm2x2IcQBZf2k",
  authDomain: "nille-14a1f.firebaseapp.com",
  projectId: 'nille-14a1f',
  storageBucket: "nille-14a1f.appspot.com",
  databaseURL: "https://nille-14a1f-default-rtdb.asia-southeast1.firebasedatabase.app",
};

let app;

if(!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

const auth = getAuth();
const db = getDatabase();
const firestoreDb = getFirestore();
const storage = getStorage();

export { app, auth, db, firestore, storage };



