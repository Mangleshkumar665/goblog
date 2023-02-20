
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import CreatePost from './Pages/create-post/CreatePost';
import Home from './Pages/Home/Home';
import PublicProfiles from './Pages/create-post/PublicProfiles';
import ProfilePage from './Pages/create-post/ProfilePage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './Config/firebase';
import { useEffect, useState } from 'react';
import UserPosts from './Pages/create-post/UserPosts';
import PostPage from './Pages/PostPage/PostPage';
import { collection, getDocs } from 'firebase/firestore';


function App() {
  
  const postsRef = collection(db, "posts");
    // sending post object to the app.js 
  const [postsList, setPostList] = useState([]);

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // console.log((data.docs.map((doc)=> ({...doc.data(),id :doc.id}))))

  };

  useEffect(() => {
    getPosts();
    // getLikes();
  }, []);















  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/' element={<Home post = {postsList} />} ></Route>
          
          
          <Route path={ "/user/:id"} element={<CreatePost />} 
          ></Route>
          
          <Route path={ "/:id"} element={<PostPage post ={postsList} />} 
          ></Route>

        </Routes>

      </Router>

    </>
  );
}

export default App;



