import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

    apiKey: "AIzaSyDiVebTzb_erlYKioFGbitL4CyJJefU2pQ",
  
    authDomain: "top-score-e1895.firebaseapp.com",
  
    projectId: "top-score-e1895",
  
    storageBucket: "top-score-e1895.appspot.com",
  
    messagingSenderId: "994734683080",
  
    appId: "1:994734683080:web:dec491e28621a6e417c6fd",
  
    measurementId: "G-WJEVR8ZKXT"
  
  };
  
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
