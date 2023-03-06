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
      
        
        
        <CreateForm /> 
        : 
        "" }
      
    </>
  );
};

export default CreatePost;
