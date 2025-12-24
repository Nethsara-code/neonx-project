// src/app/components/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfIAvQ0WVHmE7sOB6iTwhRAW1jY5efv_Q",
  authDomain: "hirusha-web.firebaseapp.com",
  projectId: "hirusha-web",
  storageBucket: "hirusha-web.appspot.com",
  messagingSenderId: "873065070294",
  appId: "1:873065070294:web:00e5356d273d8333561377",
  measurementId: "G-FBB9TSC85Z"
};

const app = initializeApp(firebaseConfig);

// Firestore DB
export const db = getFirestore(app);

// Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
