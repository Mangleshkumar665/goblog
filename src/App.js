import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import CreatePost from "./Pages/create-post/CreatePost";
import Home from "./Pages/Home/Home";
import { db } from "./Config/firebase";
import { useEffect, useState } from "react";
import PostPage from "./Pages/PostPage/PostPage";
import { collection, getDocs } from "firebase/firestore";

import SignUp from "./Pages/AuthPage/SignUp";

import CreateForm from "./Pages/create-post/CreateForm";



function App() {
  const postsRef = collection(db, "posts");
  // sending post object to the app.js
  const [postsList, setPostList] = useState([]);

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/Signin" element={<Login />}></Route>
          <Route
            path="/"
            element={<Home post={postsList}  />}
          ></Route>
          <Route
            path={"/user/:id"}
            element={<CreatePost  />}
          ></Route>

          <Route path={"/:id"} element={<PostPage post={postsList} />}></Route>

          <Route path={"/signup"} element={<SignUp post=  {postsList} />}></Route>

          <Route path ={"/user/:id/create-post"} element={ <CreateForm /> } > </Route>
          

        </Routes>
        
      </Router>
      
    </>
  );
}

export default App;
