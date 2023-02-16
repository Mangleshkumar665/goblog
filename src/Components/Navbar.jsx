import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Navbar = () => {
  const logOut = () => {
    signOut(auth);
  };
  const [ user] = useAuthState(auth); 

  return (
    <>
      <nav className="navbar justify-content-center navbar-expand-lg bg-light container-fluid col sticky-top">
        <div className="nav-item col-7 d-flex align-items-center justify-content-center ">
          <Link className="navbar-brand" to="/">
            Go Blogs
          </Link>
        </div>
        <div className=" col-5 nav-item  ">
          <ul className=" d-flex justify-content-center align-items-center ">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            
            <li className="nav-item">
              <Link
                className="nav-link active"aria-current="page" to={`/user/${user.uid}`} >
                Profile
              </Link>
            </li>
            { user ?
            <li className="nav-item btn  ">
              <button onClick={logOut}> Logout </button>
            </li>
             :
             <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/login">
                Login
              </Link>
            </li>
            
            
}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
