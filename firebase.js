// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWukN0aS1QPs4h4npUa27YM0otKG9wrjk",
  authDomain: "photo-sharing-e8864.firebaseapp.com",
  projectId: "photo-sharing-e8864",
  storageBucket: "photo-sharing-e8864.appspot.com",
  messagingSenderId: "863514305590",
  appId: "1:863514305590:web:eab4eacd4026d760ade497"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };