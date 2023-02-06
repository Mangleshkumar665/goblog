// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8AwlEfE2wfAyzx5hX69OtHUEXVse5O7s",
  authDomain: "social-media-app-665.firebaseapp.com",
  projectId: "social-media-app-665",
  storageBucket: "social-media-app-665.appspot.com",
  messagingSenderId: "407272490002",
  appId: "1:407272490002:web:b1bc68b799544ff6ba84cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export  const provider = new GoogleAuthProvider();


// firebase steps
// step 1 - authenticaltion 
// step 2 - creating a form and adding a schema to it .