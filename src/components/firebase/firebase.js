import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCzcubqgM93zs0a0C3I9rD0FVdLzzMIfQU",
    authDomain: "todo-b07da.firebaseapp.com",
    projectId: "todo-b07da",
    storageBucket: "todo-b07da.appspot.com",
    messagingSenderId: "1046789717963",
    appId: "1:1046789717963:web:cc805192076771ebbf404e",
    measurementId: "G-WGY80675WH"
};

const app = firebase.initializeApp(firebaseConfig)

export const auth = getAuth(app)
  