import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyC8Hqtf7YMt6huh31da2LTcwTFsHEzVzYw",
  authDomain: "react-crud-b92cc.firebaseapp.com",
  projectId: "react-crud-b92cc",
  storageBucket: "react-crud-b92cc.appspot.com",
  messagingSenderId: "565919185867",
  appId: "1:565919185867:web:9b0784a41a0ae09978d44e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
