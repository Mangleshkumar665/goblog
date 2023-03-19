import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "../../Components/Footer";
import { auth } from "../../Config/firebase";
import Post from "../Home/Post";

const UserPosts = (props) => {

  const [user] = useAuthState(auth)



  return (
    <div className="" style={{ position: "relative", top: "150px" }}>
      {console.log(props.post)}
      {window.location.pathname.split('/')[2] === user?.uid ? (props.post.length === 0) ?

        <div className=" text-center p-2   " style={{ fontSize: "25px" }}>

          <hr className="hr hr-blurry  mx-5  " />


          <div className="alert alert-warning alert-dismissible fade show post-alert" role="alert">
            <div className="d-flex f-column justify-content-between ">
              You haven't posted anything  yet. Create one below.

              <button type="button" className="close" data-bs-dismiss="alert" aria-label="Close" style={{ all: "unset" }}>
                <i class="fa fa-times" aria-hidden="true"></i>
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
        {/* {console.log(window.location.pathname.slice(6)) } */}
      </div>
      
    </div>
  );
};

export default UserPosts;
