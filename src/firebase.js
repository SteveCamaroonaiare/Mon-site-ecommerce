// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvbQCAJMYOyknjkCdC0lg10HJClvv3aZc",
  authDomain: "react-d54d6.firebaseapp.com",
  projectId: "react-d54d6",
  storageBucket: "react-d54d6.firebasestorage.app",
  messagingSenderId: "322983613175",
  appId: "1:322983613175:web:3cd49a994fa0e40dc2b9f2",
  measurementId: "G-H89RG4H4GJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
