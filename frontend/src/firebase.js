import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCmpAwUnGumU3gDW9zWMOdvzLHLH2LCIiw",
  authDomain: "tjma-db.firebaseapp.com",
  projectId: "tjma-db",
  storageBucket: "tjma-db.appspot.com",
  messagingSenderId: "632947587370",
  appId: "1:632947587370:web:10cfd70a48c6d669a84653",
  measurementId: "G-KLKBC9SMZL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
