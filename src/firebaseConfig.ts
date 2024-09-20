// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyDeBLXXHvR-dadxvM7icCOMcr6aQING7jY",
  authDomain: "james-portfolio-website-a702b.firebaseapp.com",
  projectId: "james-portfolio-website-a702b",
  storageBucket: "james-portfolio-website-a702b.appspot.com",
  messagingSenderId: "18814184396",
  appId: "1:18814184396:web:2c38e9207fc883892a8b69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication, Firestore, and Storage
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { app, auth, db, storage }; // Export storage
