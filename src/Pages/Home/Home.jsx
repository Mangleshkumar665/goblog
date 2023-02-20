import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Config/firebase";

import { getDocs, collection } from "firebase/firestore";
import Post from "./Post";
import MainScreen from "./MainScreen";

const Home = (props) => {
  
  const [user] = useAuthState(auth);
    // sending post object to the app.js 
  
  

  return (
    <>
      {user?.displayName + " "}
      Signed in-
      <MainScreen />
      {/* fetching post here  */}
      <div className=" all-posts ">
        <div className="  my-2 d-flex justify-content-center align-items-center flex-column">
          {props.post?.map((post) => (
           <li key={post.id} className=" no-style"> <Post post={post} /> </li>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
