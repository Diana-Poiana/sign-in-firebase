
// nessesery functions for import
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, get, set, ref, child } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// my firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB0gKQpxWfQuZJsSh-zaeTejRRSTMq7keM',
  authDomain: 'sign-in-320c5.firebaseapp.com',
  databaseURL: 'https://sign-in-320c5-default-rtdb.firebaseio.com',
  projectId: 'sign-in-320c5',
  storageBucket: 'sign-in-320c5.appspot.com',
  messagingSenderId: '1090172360',
  appId: '1:1090172360:web:8f3a61c151ecf75709fcfd',
  measurementId: 'G-HTJDGNHBPG'
};

// initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);

export { app, db, auth, set, get, ref, dbref, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, child };


