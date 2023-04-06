
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { db } from "../../Config/firebase";
import UserPosts from "./UserPosts";
import CreatePost from "./CreatePost";
import CreateForm from "./CreateForm";

const ProfilePage = (props) => {



  const [post, setPost] = useState([]);

  const postsRef = collection(db, "posts");
  const postsDocs = query(postsRef, where("userId", "==", window.location.pathname.slice(6)));



  const getPosts = async () => {
    const data = await getDocs(postsDocs);
    setPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

  };



  const [userInfo, setUserInfo] = useState([]);
  const usersRef = collection(db, "users");
  const usersDocs = query(usersRef, where("userId", "==", window.location.pathname.slice(6)));

  const getUserInfo = async () => {
    const data = await getDocs(usersDocs);
    setUserInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


  useEffect(() => {
    getPosts();
    getUserInfo();
  }, [])







  return (
    <>
      <div className="user-image "></div>



      <div className="container  " style={{height:"25vh"}}>


        <div className="profile-img-wrapper  " data-aos="fade-right" >
          {(userInfo[0]?.profileImage) ? <img className=" profile-img  " src={userInfo[0]?.profileImage} alt="profilepic" /> :
            <i className="fa fa-camera-retro fa-8x"></i>
          }

            <div className="display-6 " >{userInfo[0]?.username} </div>


          
        </div>

        <div className="user-post ">
          <UserPosts post={post} />
        </div>


        <CreateForm />


      </div>
      
      
    </>
  );
};

export default ProfilePage;
