import React, { useEffect, useState } from 'react'
import Axios from 'axios'

const MainScreen = () => {
  
  const [bgImages, setBgImages] = useState("")
  const fetchImages = ()=>{
    Axios.get("https://api.unsplash.com/photos/?client_id=ccZdovOGa9YsUypzzlCoJQYb4YiokLnJRlpY2AnjS4Y").then((res)=>{
        console.log(res.data[0].urls);
        setBgImages(res.data[4].urls.full);
    });
};

  useEffect(() => {
    fetchImages();
  }, [])
  
  return (
    <div>
      main screen here 
      <div className=''>
      <img src={bgImages} className="img-fluid img-bgC " alt="backgroundimage" />

      </div>

    
    </div>
  )
}

export default MainScreen
