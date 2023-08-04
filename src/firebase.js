import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBC7jJ0oBJkliC71j4SEGs64suKHoDmY5k",
  authDomain: "instagram-a8a7b.firebaseapp.com",
  projectId: "instagram-a8a7b",
  storageBucket: "instagram-a8a7b.appspot.com",
  messagingSenderId: "133287342490",
  appId: "1:133287342490:web:11d9d24badcf7bfc4bca23"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage().ref();
export {db, auth,storage};