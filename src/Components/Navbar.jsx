import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Navbar = () => {

  const Navigate = useNavigate();
  const logOut = () => {
    signOut(auth);
    Navigate("/")

  };
  const [ user] = useAuthState(auth); 

  return (
    <>
      <nav className="navbar justify-content-center navbar-expand-lg bg-light container-fluid col sticky-top col">
        {user ? <div className="nav-item col-7 d-flex align-items-center justify-content-center ">
          <Link className="navbar-brand" to="/">
            Go Blogs
          </Link>
        </div> : <div className="d-flex align-items-center justify-content-center" style={{width:"56vw", position:"relative",left:"20vw"}}>
          <div className="">
          <Link className="navbar-brand" to="/">
            Go Blogs
          </Link>
          </div>
          
        </div> }
        
        <div className=" col-5 nav-item  ">
          <ul className=" d-flex justify-content-center align-items-center ">
            
            { user ? 
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li> : ""
            }

            {user ? 
            <li className="nav-item">
              <Link
                className="nav-link active"aria-current="page" to={`/user/${user?.uid}`} >
                Profile
              </Link>
            </li> : "" }
            { user ?
            <li className="nav-item btn  ">
              <button onClick={logOut}> Logout </button>
            </li>
             :
             ""
            
            
}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
