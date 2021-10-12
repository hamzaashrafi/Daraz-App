import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// export const httpRequest = axios.create({
//     baseURL: 'http://localhost:5000'
// });

const firebaseConfig = {
    apiKey: "AIzaSyCFJY3wJnBXXqEqyZuGvuzMTuvVjKQGwW8",
    authDomain: "hotel-management-fe085.firebaseapp.com",
    databaseURL: "https://hotel-management-fe085-default-rtdb.firebaseio.com",
    projectId: "hotel-management-fe085",
    storageBucket: "hotel-management-fe085.appspot.com",
    messagingSenderId: "916554914037",
    appId: "1:916554914037:web:543e6889789cb28a93cdbc"
  };

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth();
export const database = firebase.database();