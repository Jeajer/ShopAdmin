import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "shopping-app-691fd.firebaseapp.com",
  projectId: "shopping-app-691fd",
  storageBucket: "shopping-app-691fd.appspot.com",
  messagingSenderId: "897286761932",
  appId: "1:897286761932:web:f77afcbcf8e77693f60169",
  measurementId: "G-83LMFHM5GY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
