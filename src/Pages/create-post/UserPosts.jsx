import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Config/firebase";
import Post from "../Home/Post";

const UserPosts = (props) => {

  const [user] = useAuthState(auth) 



  return (
    <div className="" style={{ position: "relative", top: "150px" }}>
      {/* {console.log(window.location.pathname.split('/')[2])} */}
      <div className="display-4 text-center p-2    ">
        { window.location.pathname.split('/')[2] === user?.uid ?  "Your Blogs" : "Blogs" }
        
        
        <hr className="hr hr-blurry  mx-5  " />
      </div>

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
