import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Config/firebase";
import backgroundImages from "../../images/background.jpg";
import profileThumb from "../../images/profileThumb.jpg";
import UserPosts from "./UserPosts";

const ProfilePage = (props) => {
  
  const [user] = useAuthState(auth);

  const [post, setPost] = useState([]);
  const postsRef = collection(db, "posts");
  const postsDocs = query(postsRef, where("userId", "==", window.location.pathname.slice(6)));





  const getPosts = async () => {
    const data = await getDocs(postsDocs);

    setPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),"hck")
  };


  useEffect(() => {
    getPosts();
  }, [])
  



  return (
    <div className="">
      <div className="user-image">
        <img
          src={backgroundImages}
          className="img-fluid profile-bg "
          alt="backgroundimage"
        />
      </div>
    {console.log("chkeing ")}

      <div className="about-imgLayer" data-aos="fade-right">
        <img className=" about-img" src={profileThumb} alt="profilepic" />
        <div className="user-details  d-flex justify-content-center align-items-center flex-column">
          <h2>
            {post[0]?.username} </h2>
            

        </div>
      </div>

      <div className="user-post ">
        <UserPosts post = {post}/>
      </div>
    </div>
  );
};

export default ProfilePage;
