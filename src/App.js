import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";

import Home from "./Pages/Home/Home";
import { db } from "./Config/firebase";
import { useEffect } from "react";
import PostPage from "./Pages/PostPage/PostPage";
import { collection, getDocs } from "firebase/firestore";


import CreateForm from "./Pages/create-post/CreateForm";


import { useDispatch } from "react-redux";
import { select } from "./store/postSlice";
import Signin from "./Components/Signin";
import ProfilePage from "./Pages/create-post/ProfilePage";

function App() {
  const dispatch = useDispatch();

  const postsRef = collection(db, "posts");
  // sending post object to the app.js

  const getPosts = async () => {
    const data = await getDocs(postsRef);
 
    
    dispatch(select(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      
        <Router>
          <Navbar />
          <Routes>
            <Route path="/Signin" element={<Signin />}></Route>
            <Route path="/" element={<Home  />}></Route>
            <Route path={"/user/:id"} element={<ProfilePage />}></Route>

            <Route
              path={"/:id"}
              element={<PostPage/>}
            ></Route>
            

            <Route path={"/user/:id/create-post"} element={<CreateForm />}>
              
            </Route>
          </Routes>
        </Router>
 
    </>
  );
}

export default App;
