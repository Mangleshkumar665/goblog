import React, { useEffect, useState } from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth, db } from '../../Config/firebase'

import {getDocs,collection} from 'firebase/firestore';
import Post from './Post';

const Home = () => {

  const [ user] = useAuthState(auth); 
  const postsRef = collection(db,"posts");

  const [postsList, setPostList] = useState([]);

  const getPosts = async ()=>{
    const data = await getDocs(postsRef);
    setPostList(data.docs.map((doc)=> ({...doc.data(),id :doc.id})));
    console.log((data.docs.map((doc)=> ({...doc.data(),id :doc.id}))))
  }


  useEffect(() => {
    getPosts();
  }, [])


  return (
    <>
      {user?.displayName  }
      this is a home Component 
      <h1> Posts- </h1>
      
      <div>
        {
          postsList?.map((post)=> <Post post={post} /> )
        }

      </div>


    </>
  )
}

export default Home
