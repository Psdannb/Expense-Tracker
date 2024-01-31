// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD663xNs0Guws6E66FvAxGVviDhz4WHFsU",
  authDomain: "expense-tracker-be881.firebaseapp.com",
  projectId: "expense-tracker-be881",
  storageBucket: "expense-tracker-be881.appspot.com",
  messagingSenderId: "631290620699",
  appId: "1:631290620699:web:08b7841cbcde6bd1bf41be",
  measurementId: "G-HC2ZL7420Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
