// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

/* TODO: Add SDKs for Firebase products that you want to use*/
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APP_ID,
    authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/* 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgnu0N8smj0DeHT325Ks5KCDXjuAOzIqg",
  authDomain: "e-commerce-4dfd4.firebaseapp.com",
  projectId: "e-commerce-4dfd4",
  storageBucket: "e-commerce-4dfd4.firebasestorage.app",
  messagingSenderId: "225966613918",
  appId: "1:225966613918:web:5e7f7c03732f19c485a28f"
};
  */

//Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const db =getFirestore(app);