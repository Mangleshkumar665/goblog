import Axios  from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Config/firebase";
import backgroundImages from "../../images/background.jpg";
import UserPosts from "./UserPosts";

const ProfilePage = (props) => {
  const [bgImages, setBgImages] = useState("");

  const fetchImages = () => {
    const clientId = "TPgpKauoGGr_sqhV82hcPHQXRsVNNLl79RvFSgHY6N4";
    const endpoint = `https://api.unsplash.com/photos/random?client_id=${clientId}&query=cute&orientation=landscape`;

    Axios.get(endpoint).then((res) => {
      // setBgImages(res.data.urls.regular);
      console.log("data",res.data.urls.small ,"xxxxxxxxxxxxxxxxxxxx");
    }).catch((err=>{
      console.log(err)
    }))
  };


  const [user] = useAuthState(auth);

  const [post, setPost] = useState([]);
  const postsRef = collection(db, "posts");
  const postsDocs = query(postsRef, where("userId", "==", window.location.pathname.slice(6)));





  const getPosts = async () => {
    const data = await getDocs(postsDocs);

    setPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
  };


  useEffect(() => {
    getPosts();
    // fetchImages();
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
      <div className="about-imgLayer" data-aos="fade-right">
        <img className=" about-img" src={user?.photoURL} alt="profilepic" />
        <div className="user-details  d-flex justify-content-center align-items-center flex-column">
          <h2>
            {post[0]?.username} </h2>

        </div>
      </div>

      <div className="user-post ">
        <UserPosts post={post} />
      </div>
    </div>
  );
};

export default ProfilePage;
