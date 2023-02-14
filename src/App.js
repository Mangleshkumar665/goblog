
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
import { auth } from './Config/firebase';
import { useEffect, useState } from 'react';


function App() {
  const [user] = useAuthState(auth);

  const [postUserId, setPostUserId] = useState("")


  const fetchPosts = (post)=>{
    console.log(post)
    // setPostUserId(post.userId);
  }

  useEffect(() => {
    fetchPosts();
  }, [])


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/' element={<Home fetchPosts ={fetchPosts} />} ></Route>
          <Route path='/create-post' element={<CreatePost />} 
          ></Route>
          {/* <Route path={`/${user.uid}`} element={<PublicProfiles />} 
          ></Route> */}
          

        </Routes>

      </Router>

    </>
  );
}

export default App;



