import { useEffect, useState } from "react";
import {

  deleteDoc,
  doc,

} from "firebase/firestore";
import { auth, db } from "../../Config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "../../Components/Footer";

const PostPage = (props) => {
  const [user] = useAuthState(auth)

  const { post } = props;
  const [currentPost, setCurrentPost] = useState([]);
  const getCurrentPost = () => {
    setCurrentPost(
      post?.filter(
        (element) => element.id === window.location.pathname.slice(1)
      )
    );
  };

  // deleting posts 
  const Navigate = useNavigate();
  

  const deletePost = async()=>{
    const postRef = await doc(db,"posts",currentPost[0]?.id)

    deleteDoc(postRef).then(()=>{
      console.log("post deleted ")
      Navigate("/")
      Navigate(0)  

    }).catch(err =>{
      console.log(err)
    })
    
  }

  // deleting posts ends 




  useEffect(() => {
    getCurrentPost();
  }, []);

  return (
  
  <div>
      <div className="" style={{boxShadow: "0 15px 25px rgba(92, 91, 91, 0.5)"}}>
        <div>
          <img
            src={currentPost[0]?.background}
            className="img-fluid  post-background opacity-75"
            alt="backgroundimage"
          />
        </div>
        <div className=" d-flex justify-content-center align-items-center col  ">
          <div className="  wrapper   text-center  post-heading row d-flex justify-content-center align-items-center flex-column  ">
            <div
              className="  text-hello display-1 post-font fit "
              style={{ fontSize: "6vw" }}
            >
              {currentPost[0]?.title}
            </div>

            <div
              className="  text-caption my-4  post-font fit"
              style={{ fontSize: "2vw" }}
            >
              {currentPost[0]?.description}
            </div>

            <div className=" display-6  my-4 post-font fit">
              Posted By :{currentPost[0]?.username}
            </div>
            
          </div>
    {/* {console.log(currentPost[0])} */}
          <div className=" postPage-buttons d-flex justiy-content-center flex-row " >
           { currentPost[0]?.userId === user?.uid ?
           <div>
            {/* <button className="btn btn-dark mx-1" >
              Edit Post 
            </button> */}

            <button className="btn btn-dark" style={{ margin:"5px"}} onClick={deletePost}>
              Delete Post
            </button>
            </div> : ""
          }
          </div>



        </div>
      </div>

      <div className="" style={{marginTop:"50px" ,marginBottom:"50px",padding:"10px"}}>
        <div dangerouslySetInnerHTML={{__html:currentPost[0]?.blog}} className="container " >
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostPage;
