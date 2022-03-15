import { initializeApp } from "firebase/app"
import firebase from "firebase/compat/app"
import { getFirestore } from "firebase/firestore"
import 'firebase/compat/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBFQuSzctfW69TD0bG5Et5tKookwYC5Wo0",
  authDomain: "task-manager-react-app.firebaseapp.com",
  projectId: "task-manager-react-app",
  storageBucket: "task-manager-react-app.appspot.com",
  messagingSenderId: "791072342039",
  appId: "1:791072342039:web:aa2d4857f071e8fa485c52",
  measurementId: "G-J3Z6KLKVTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
firebase.initializeApp(firebaseConfig);

const db2 = firebase.storage().ref('images')

export {db,db2};