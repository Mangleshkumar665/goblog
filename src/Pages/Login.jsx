import React from "react";
import { auth, provider } from "../Config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const signInwithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      
    </div>
  );
};

export default Login;
