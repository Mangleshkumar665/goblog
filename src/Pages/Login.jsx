import React from "react";
import { auth, provider } from "../Config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const signInwithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result)
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p> Sign in with -- </p>
      <button onClick={signInwithGoogle} style={{ all: "unset" }}>
        
        <i class="fa-brands fa-google"></i>{" "}
      </button>
    </div>
  );
};

export default Login;
