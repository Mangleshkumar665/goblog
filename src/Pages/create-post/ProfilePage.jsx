import Axios  from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "../../Components/Footer";
import { auth, db } from "../../Config/firebase";
import backgroundImages from "../../images/background.jpg";
import UserPosts from "./UserPosts";

const ProfilePage = (props) => {
 
  const bgi = "background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);"

  const [user] = useAuthState(auth);

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

  const getUserInfo =  async () => {
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



<div className="container">
    {/* {console.log(userInfo)} */}
  
      
      <div className="about-imgLayer" data-aos="fade-right" >
        {(userInfo[0]?.profileImage) ? <img className=" about-img sticky-top" src={userInfo[0]?.profileImage} alt="profilepic"  />:
        <i className="fa fa-camera-retro fa-8x"></i>
         }
        
        <div className="user-details  d-flex justify-content-center align-items-center flex-column">
          <h2 >{userInfo[0]?.username} </h2>
            

        </div>
      </div>

      <div className="user-post ">
        <UserPosts post={post} />
      </div>
      


      
    </div>
    </>
  );
};

export default ProfilePage;
