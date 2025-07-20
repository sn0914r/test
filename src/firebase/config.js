import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClvy0lVA7KWc7W-jitPafAc1xaRPyp1Zk",
  authDomain: "note-taking-app-7f915.firebaseapp.com",
  projectId: "note-taking-app-7f915",
  storageBucket: "note-taking-app-7f915.firebasestorage.app",
  messagingSenderId: "11630430622",
  appId: "1:11630430622:web:a3908a5078f58640972e8f",
  measurementId: "G-WRZ2LZ4V11"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };