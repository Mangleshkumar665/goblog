import React from 'react'
import {auth , provider} from "../Config/firebase";
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate();

  const signInwithGoogle = async ()=>{
    
    const result = await signInWithPopup(auth , provider);
    console.log(result);
    navigate("/");
    
  };
  return (
    <div>
      
      <p> Sign in to google to continue -- </p> 
      <button onClick={signInwithGoogle}> click here </button>

    </div>
  )
}

export default Login
