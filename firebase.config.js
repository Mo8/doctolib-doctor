// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "doctolib-pwa.firebaseapp.com",
  projectId: "doctolib-pwa",
  storageBucket: "doctolib-pwa.appspot.com",
  messagingSenderId: "457347835988",
  appId: "1:457347835988:web:5bb85fa89a682e11a065c1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export const firestore = getFirestore(app);