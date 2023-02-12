import React from "react";
import backgroundImages from "../../images/background.jpg";
import profileThumb from "../../images/profileThumb.jpg";

const ProfilePage = () => {
  return (
    <div className="">
      <div className="profile-bgDiv">
        <img
          src={backgroundImages}
          className="img-fluid profile-bg "
          alt="backgroundimage"
        />
      </div>
      <div className="profile-pictureDiv">
        <img
          src={profileThumb}
          className="img-fluid profile-picture "
          alt="backgroundimage"
        />
      </div>
      
      Profile Page
    </div>
  );
};

export default ProfilePage;
