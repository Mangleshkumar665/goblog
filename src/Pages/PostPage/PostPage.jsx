import { useEffect, useState } from "react";
import tempBg from "../../images/posts.jpg";

const PostPage = (props) => {
  const [currentPost, setCurrentPost] = useState([]);

  const getCurrentPost = () => {
    setCurrentPost(
      props.post?.filter(
        (element) => element.id === window.location.pathname.slice(1)
      )
    );
  };

  // console.log(currentPost);

  useEffect(() => {
    getCurrentPost();
  }, []);

  return (
    <div>
      <div className=" ">
        <img
          src={tempBg}
          className="img-fluid  post-background "
          alt="backgroundimage"
        />
      </div  >
      <div className= "  d-flex justify-content-center align-items-center col">
        <div className="  wrapper  text-center  post-heading row  ">
          <div className="  text-hello display-1   " style={{fontSize
           : "50px"}}>
            {currentPost[0]?.title}
          </div>
          <div className="  text-caption my-4 " style={{fontSize
           : "30px"}}>
            {currentPost[0]?.description}
          </div>

          <div className=" display-6 text-caption my-4 ">
            Posted By :{currentPost[0]?.username}
          </div>

          <div
            className=" display-5 row    " >
            <div className=" likes col " style={{fontSize
           : "2.5rem"}}>Likes :</div>
            <div className=" comments col " style={{fontSize
           : "2.5rem"}}>comments :</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
