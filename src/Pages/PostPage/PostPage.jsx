import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../Config/firebase";
import { useNavigate } from "react-router-dom";

const PostPage = (props) => {
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
            <div className=" display-6 row  post-font">
              <div className=" likes col " style={{ fontSize: "2.5rem" }}>
                Likes :
              </div>
              <div className=" comments col " style={{ fontSize: "2.5rem" }}>
                comments :
              </div>
            </div>
          </div>

          <div className="d-flex justiy-content-center flex-row"  style={{position:"absolute",top:"80vh", left:"80vw" ,boxShadow: "0 4px 12px rgba(44, 44, 44, 0.5)"}}>
            <button className="btn mx-1" style={{background :"white"}}>
              Edit Post 
            </button>

            <button className="btn" style={{background :"white"}} onClick={deletePost}>
              Delete Post
            </button>

          </div>



        </div>
      </div>

      <div className="" style={{marginTop:"50px" ,marginBottom:"50px",padding:"10px"}}>
        <div dangerouslySetInnerHTML={{__html:currentPost[0]?.blog}} className="container " >
        </div>

        
      </div>

    </div>
  );
};

export default PostPage;
