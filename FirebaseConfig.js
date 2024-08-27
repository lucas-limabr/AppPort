import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAidBDlCG7WqCQdZg5MOqt_-mNMbW7AZ2Y",
    authDomain: "portuguito-6e8c8.firebaseapp.com",
    projectId: "portuguito-6e8c8",
    storageBucket: "portuguito-6e8c8.appspot.com",
    messagingSenderId: "155004537286",
    appId: "1:155004537286:web:8c7346762319980be90ac7",
    measurementId: "G-C3QC9JMZ7Z"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);