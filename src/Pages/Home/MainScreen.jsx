import React, { useEffect, useState } from "react";
import Axios from "axios";
import backgroundImages from "K:/work/js/majorProjects/SocialMediaApp/socialmediaapp/src/images/background.jpg";
const MainScreen = () => {
  const [bgImages, setBgImages] = useState("");
  const fetchImages = () => {
    Axios.get(
      "https://api.unsplash.com/photos/?client_id=ccZdovOGa9YsUypzzlCoJQYb4YiokLnJRlpY2AnjS4Y"
    ).then((res) => {
      // console.log(res.data[0].urls);
      setBgImages(res.data[4].urls.full);
    });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      {/* <div className='temp '> */}
      <div>
        <img
          src={backgroundImages}
          className="img-fluid img-bgC "
          alt="backgroundimage"
        />
      </div>

      <div>
        <div className=" heading-content text-center   ">
          <div className=" display-1 text-hello  ">
            <h1>Go Blogs  </h1>
          </div>
          <div className=" display-6 text-caption my-4 ">Content: there is no easy button</div>
        </div>
      </div>
    </div>
  
    // </div>
  );
};

export default MainScreen;
