// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDWYv8fxoaZY-kOsVksjRIV4s_YCI4VRw",
  authDomain: "gym-training-84c20.firebaseapp.com",
  projectId: "gym-training-84c20",
  storageBucket: "gym-training-84c20.firebasestorage.app",
  messagingSenderId: "775686854943",
  appId: "1:775686854943:web:029c1b22cbab5e943b382a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
