import React from "react";
import Axios from "axios";
import backgroundImages from "../../images/background.jpg";
import backimg2 from "../../images/4.jpg"
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




  const clientId = "TPgpKauoGGr_sqhV82hcPHQXRsVNNLl79RvFSgHY6N4";

  const endpoint = `https://api.unsplash.com/photos/random?client_id=${clientId}&query=nature&orientation=landscape`;


  const signInwithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // getting current uid of the user
      if (getAdditionalUserInfo(result).isNewUser) {

        await Axios.get(endpoint).then((res) => {

          addDoc(usersRef, {
            userId: result._tokenResponse.localId,
            username: result._tokenResponse.fullName,
            interests: [],
            profileImage: res.data.urls.regular,
            coverImage: res.data.urls.regular
          });
        })
      } else {
        console.log("old user");
      }
      navigate("/");
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="" >

      {/* interests   */}
      <Intersets />
      {/* intersets over  */}

        <img
          src={backgroundImages}
          className="img-fluid img-bgC background-one  "
          alt="backgroundimage" style={{ boxShadow: " 0 15px 25px rgba(92, 91, 91, 0.5" }}
        />
        <img src={backimg2}
          className="img-fluid img-bgC  background-two"
          alt="backgroundimage"
          style={{ boxShadow: " 0 15px 25px rgba(92, 91, 91, 0.5" }}
        />
      

      <div className="">
        <div className=" heading-content text-center   ">
          <div className=" display-1 text-hello  ">
            <h1>Go Blog </h1>
          </div>
          <div className=" display-6 text-caption my-4 ">
            Where Words Come to Life
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
            <div className=" " style={{ fontSize: "20px" }}>
              last Logged in - {user.metadata.lastSignInTime.slice(0, 16)}
            </div>
          </div>
        )}
      </div>
      
    </div>

  );
};

export default MainScreen;
