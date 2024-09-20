// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDoE3X_1btg0YYX-xVBk2H4Bkrj8YpBUxY",
  authDomain: "james-galos-portfolio.firebaseapp.com",
  projectId: "james-galos-portfolio",
  storageBucket: "james-galos-portfolio.appspot.com",
  messagingSenderId: "656704072403",
  appId: "1:656704072403:web:e24765b61910c730b3c226"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
