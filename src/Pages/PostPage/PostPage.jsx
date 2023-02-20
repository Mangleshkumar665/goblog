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
      </div>

      <div className=" heading-content text-center  post-heading  ">
        <div className=" display-2 text-hello  ">
          <h1>{currentPost[0]?.title}</h1>
        </div>
        <div className=" display-6 text-caption my-4 ">  
          {currentPost[0]?.description}
        </div>
        
        <div className=" display-6 text-caption my-4 ">
          Posted By :   
          {currentPost[0]?.username}
        </div>

        <div className=" display-5  d-flex justify-content-center " style={{width : "50vw"}}>
          <div className=" likes ">
            Likes :  
          </div>
          <div className=" comments ">
            comments : 
          </div>
        </div>
        {console.log(currentPost[0])}

      </div>

    </div>
  );
};

export default PostPage;
