import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../Config/firebase";
import CreateForm from "./CreateForm";
import ProfilePage from "./ProfilePage";
const CreatePost = (props) => {
  const [user] = useAuthState(auth);
  

  return (
    <>
      <ProfilePage />
      { user?.uid === window.location.pathname.slice(6)?
      <div className="container  form-head">
        <div className="display-4 text-center p-2    ">
          Create a Post 
          <hr className="hr hr-blurry  mx-5  " />
        </div>
        {/* {console.log(user.uid === window.location.pathname.slice(6))} */}
        {console.log(props.bgImages)}
        
        <CreateForm bgImages ={props.bgImages} />  </div>
        : 
        "" }
      
    </>
  );
};

export default CreatePost;
