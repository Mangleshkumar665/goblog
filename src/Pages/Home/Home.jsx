import React, { useEffect, useState } from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth, db } from '../../Config/firebase'

import {getDocs,collection} from 'firebase/firestore';
import Post from './Post';
import MainScreen from './MainScreen';

const Home = () => {

  const [ user] = useAuthState(auth); 
  const postsRef = collection(db,"posts");

  




  const [postsList, setPostList] = useState([]);

  const getPosts = async ()=>{
    const data = await getDocs(postsRef);
    setPostList(data.docs.map((doc)=> ({...doc.data(),id :doc.id})));
    // console.log((data.docs.map((doc)=> ({...doc.data(),id :doc.id}))))
  }


  useEffect(() => {
    getPosts();
    // getLikes();

  }, [])


  return (
    <>
      {user?.displayName+" " }
      Signed in-
       
      
      <MainScreen />
      <h1> Posts- </h1>
      




      {/* fetching post here  */}
      <div>
        {
          postsList?.map((post)=> <Post post={post} /> )
        }

      </div>


    </>
  )
}

export default Home
