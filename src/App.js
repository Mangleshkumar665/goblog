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

import Axios from "axios";

function App() {
  const postsRef = collection(db, "posts");
  // sending post object to the app.js
  const [postsList, setPostList] = useState([]);

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // fetching images from online
  const [bgImages, setBgImages] = useState("");
  const fetchImages = () => {
    const clientId = "ccZdovOGa9YsUypzzlCoJQYb4YiokLnJRlpY2AnjS4Y";
    const endpoint = `https://api.unsplash.com/photos/random?client_id=${clientId}&query=nature&orientation=landscape`;

    Axios.get(endpoint).then((res) => {
      setBgImages(res.data.urls.regular);
      console.log(res.data.urls);
    });
  };
  useEffect(() => {
    fetchImages();
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
            element={<Home post={postsList} bgImages={bgImages} />}
          ></Route>

          <Route
            path={"/user/:id"}
            element={<CreatePost bgImages={bgImages} />}
          ></Route>

          <Route path={"/:id"} element={<PostPage post={postsList} />}></Route>

          <Route path={"/signup"} element={<SignUp post={postsList} />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
