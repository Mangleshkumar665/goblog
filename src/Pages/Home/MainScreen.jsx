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

  // query related to adding user  in users database

  const signInwithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      // getting current uid of the user
      console.log(result._tokenResponse.localId);
      if (getAdditionalUserInfo(result).isNewUser) {
        await addDoc(usersRef, {
          userId: result._tokenResponse.localId,
          username: result._tokenResponse.fullName,
          interests: [],
        });
      } else {
        console.log("old user");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

// interests 


// interests end
  const [bgImages, setBgImages] = useState("");
  const fetchImages = () => {
    Axios.get(
      "https://api.unsplash.com/photos/?client_id=ccZdovOGa9YsUypzzlCoJQYb4YiokLnJRlpY2AnjS4Y"
    ).then((res) => {
      // console.log(res.data[0].urls);
      setBgImages(res.data[4].urls.full);
    });
  };

  useEffect(() => {
    fetchImages();
  }, []);

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
