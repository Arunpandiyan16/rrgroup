// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "rr-group-d8j4y",
  "appId": "1:783728306567:web:8b0d2ec2aefbd80ddf0b22",
  "storageBucket": "rr-group-d8j4y.firebasestorage.app",
  "apiKey": "AIzaSyABKt9K0h-UPpAcmn3nHXFLG0oR5U_3h04",
  "authDomain": "rr-group-d8j4y.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "783728306567"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
