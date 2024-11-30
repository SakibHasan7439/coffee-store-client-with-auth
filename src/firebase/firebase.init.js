// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeYyu9CQX098US7-Q5erBPqGHRTs624N8",
  authDomain: "coffee-server-8f19e.firebaseapp.com",
  projectId: "coffee-server-8f19e",
  storageBucket: "coffee-server-8f19e.firebasestorage.app",
  messagingSenderId: "660009992899",
  appId: "1:660009992899:web:095cbaff7435a3a99e9876"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;