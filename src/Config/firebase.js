// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from "firebase/firestore"
import { getStorage} from 'firebase/storage'

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
export const storage = getStorage(app);


export const auth = getAuth(app);
export  const provider = new GoogleAuthProvider();

export const  db = getFirestore(app); 

// firebase steps
// step 1 - authenticaltion 
// step 2 - creating a form and adding a schema to it .
// step 3 - adding fireStore to perform CRUD ops in the dbs . 
// 3.1  -  import {getFirestore} from "firebase/firestore"
// 3.2  -  export const  db = getFirestore(app); 
// 3.3  -    import {collection ,addDoc} from "firebase/firestore" in the createPost comp 
// 3.4  -    addDoc -> fxn which adds data to the dbs 
// 3.5  -    collections -> reps the collections present in the dbs 

// 3.6 -  const postsRef = collection(db,"posts");
  


// 3.7- 
// const onCreatePost = async(data)=>{
//   console.log("submitted");
//   console.log(data);
//   await addDoc(postsRef,{
//       description : data.description,
//       title : data.title,
//       id : user?.uid,
//       username : user?.displayName
//   });
// };


// import several things - 
// import {db,auth} from "../../Config/firebase"; 
// import {useAuthState} from 'react-firebase-hooks/auth'


// 3.8 --  make changes in the rules of the CLoud FireStone who will see and who will write .. 

//a -       allow write ,delete ,update : if request.auth != null && request.auth.uid == request.resource.data.userId;


//b -       allow read: if request.auth  != null;

// a-  allow write if user is loged in and if the valid user is posting the data 

// b - all the users will only read the post if they are logged in .
