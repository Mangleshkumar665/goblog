import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Config/firebase";
import Post from "../Home/Post";

const UserPosts = () => {
  const [user] = useAuthState(auth);

  const [post, setPost] = useState([]);
  const postsRef = collection(db, "posts");
  const postsDocs = query(postsRef, where("userId", "==", user.uid));



  const getPosts = async () => {
    const data = await getDocs(postsDocs);

    setPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
    
  };

useEffect(() => {
  getPosts();
}, [])


  return (
    <div className="" style={{ position: "relative", top: "150px" }}>
      <div className="display-4 text-center p-2    ">
        Your Blogs
        <hr className="hr hr-blurry  mx-5  " />
      </div>

      <div className=" container d-flex justify-content-center align-items-center flex-column">
        {post?.map((post) => (
          <li className="" key={post.id}><Post post={post} /></li>
          
        ))}

        </div>
    </div>
  );
};

export default UserPosts;
