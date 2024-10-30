// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc2fqlK1ibTWJRmOeXCnFmGrlYavmHcCM",
  authDomain: "investisense-eb902.firebaseapp.com",
  projectId: "investisense-eb902",
  storageBucket: "investisense-eb902.appspot.com",
  messagingSenderId: "1092352560756",
  appId: "1:1092352560756:web:9435f7e7791408f33c4b21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth }; 