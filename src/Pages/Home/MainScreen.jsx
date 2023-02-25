import React, { useEffect, useState } from "react";
import Axios from "axios";
import backgroundImages from "K:/work/js/majorProjects/SocialMediaApp/socialmediaapp/src/images/background.jpg";
import { useNavigate } from "react-router-dom";
import { getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection } from "firebase/firestore";
import Intersets from "./Intersets";


const MainScreen = () => {  
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const usersRef = collection(db, "users");
  const signInwithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // getting current uid of the user
      
      if (getAdditionalUserInfo(result).isNewUser) {
        await addDoc(usersRef, {
          userId: result._tokenResponse.localId,
          username: result._tokenResponse.fullName,
          interests: [],
          profileImage :"temp",
          coverImage:"temp"
        });
      } else {
        console.log("old user");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

// Cover and profile images generator  





// Cover and profile images generator  ends -- -- - --


  return (
    <div>
      {/* interests   */}
      <Intersets />
      {/* intersets over  */}
      <div>
        <img
          src={backgroundImages}
          className="img-fluid img-bgC "
          alt="backgroundimage"
        />
      </div>

      <div>
        <div className=" heading-content text-center   ">
          <div className=" display-1 text-hello  ">
            <h1>Go Blogs </h1>
          </div>
          <div className=" display-6 text-caption my-4 ">
            Content: there is no easy button
          </div>
        </div>
      </div>

      <div
        className=" container d-flex justify-content-center align-items-center "
        style={{
          width: "fit-content",
          height: "fit-content",
          fontSize: "30px",
        }}
      >
        {!user ? (
          <li className=" " style={{ padding: "8px", margin: "5px" }}>
            Sign In with -
            <button onClick={signInwithGoogle} style={{ all: "unset" }}>
              <i className="fa-brands fa-google"></i>{" "}
            </button>
          </li>
        ) : (
          <div className=" d-flex justify-content-center flex-column ">
            {" "}
            <div className="d-flex justify-content-center">
              Welcome {user?.displayName}
            </div>
            <div className="">
              last Logged in - {user.metadata.lastSignInTime.slice(0, 16)}
            </div>
          </div>
        )}
      </div>
    </div>

    // </div>
  );
};

export default MainScreen;
