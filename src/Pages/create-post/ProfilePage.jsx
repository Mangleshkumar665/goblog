import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Config/firebase";
import backgroundImages from "../../images/background.jpg";
import profileThumb from "../../images/profileThumb.jpg";
import UserPosts from "./UserPosts";

const ProfilePage = () => {
  
  const [user] = useAuthState(auth);




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
        <img className=" about-img" src={profileThumb} alt="profilepic" />
        <div className="user-details  d-flex justify-content-center align-items-center flex-column">
          <h2>
            {user.displayName} </h2>
            
            <h3>{user.email}</h3>
        </div>
      </div>

      <div className="user-post ">
        <UserPosts />
      </div>
    </div>
  );
};

export default ProfilePage;
