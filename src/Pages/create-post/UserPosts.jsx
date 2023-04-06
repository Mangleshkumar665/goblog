import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Config/firebase";
import Post from "../Home/Post";

const UserPosts = (props) => {

  const [user] = useAuthState(auth)



  return (
    <div className="" >
     
      {window.location.pathname.split('/')[2] === user?.uid ? (props.post.length === 0) ?

        <div className=" text-center p-2    " style={{ fontSize: "25px" }}>

          <hr className="hr hr-blurry  mx-5  " />


          <div className="alert alert-warning alert-dismissible fade show post-alert" role="alert">
            <div className="d-flex f-column justify-content-between ">
              You haven't posted anything  yet. Create one below.

              <button type="button" className="close" data-bs-dismiss="alert" aria-label="Close" style={{ all: "unset" }}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>





        :
        <div className="display-4 text-center p-2    ">
          Your Blogs
          <hr className="hr hr-blurry  mx-5  " />
        </div>

        :
        <div className="display-4 text-center p-2    ">

          "Blogs"
          <hr className="hr hr-blurry  mx-5  " />
        </div>

      }





      <div className=" container d-flex justify-content-center align-items-center flex-column">
        {props.post?.map((post) => (
          <li className="" key={post.id}><Post post={post} /></li>

        ))}
        
      </div>
      
    </div>
  );
};

export default UserPosts;
