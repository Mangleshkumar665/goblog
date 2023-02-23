import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../Config/firebase';

export default function SignUp() {

    const navigate = useNavigate();

    const signInwithGoogle = async ()=>{
      
      const result = await signInWithPopup(auth , provider);
      navigate("/");
    };


  return (
    <></>
    
  )
}
