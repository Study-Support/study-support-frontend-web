// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app" ;   
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = { 
  apiKey : "AIzaSyA30lrrzH9gZAnFd67obXZuh1Z5Z7ikMZY" , 
  authDomain : "nuxt3-firestore-33ccb.firebaseapp.com" , 
  projectId : "nuxt3-firestore-33ccb" , 
  storageBucket : "nuxt3-firestore-33ccb.appspot.com" , 
  messagingSenderId : "598895098207" , 
  appId : "1:598895098207:web:47bb23cbec8769430d9eea" 
};

// Initialize Firebase
const app = initializeApp ( firebaseConfig );