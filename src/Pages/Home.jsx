import React from 'react'
import Navbar from '../Components/Navbar'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../Config/firebase'

const Home = () => {

  const [ user] = useAuthState(auth); 


  return (
    <>
      {user?.displayName  }
      this is a home Component 
    </>
  )
}

export default Home
