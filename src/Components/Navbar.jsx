import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Navbar = () => {

  const Navigate = useNavigate();
  const logOut = async () => {
    await signOut(auth);
    Navigate("/")
    Navigate(0)

  };
  const [user] = useAuthState(auth);
  return (
    <>

      { user?
      <nav className="navbar navbar-body  d-flex  justify-content-center">

        {user ? <div className="nav-item col-7 d-flex align-items-center justify-content-center ">
          <Link className="navbar-brand" to="/">
            Go Blog
          </Link>
        </div> : <div className="d-flex align-items-center justify-content-center" style={{ width: "56vw", position: "relative", left: "20vw" }}>
          <div className="">
            <Link className="navbar-brand" to="/">
              Go Blog
            </Link>
          </div>

        </div>}


          <ul className="navbar-nav mr-auto  flex-row    ">

            {user ?
              <li className="nav-item active ">

                <Link className="nav-link navbar-btns d-flex justify-content-center active" to="/">
                  Home
                </Link>
              </li>
              : ""
            }

            {user ?
              <li className="nav-item active ">

                <Link
                  className="nav-link active navbar-btns d-flex justify-content-center" to={`/user/${user?.uid}/create-post`} >
                  Create 
                </Link>
              </li>
              : ""}


            {user ?
              <li className="nav-item active ">

                <Link
                  className="nav-link active navbar-btns d-flex justify-content-center" to={`/user/${user?.uid}`} >
                  Profile
                </Link>
              </li>
              : ""}




            {user ?
              <li className="nav-item active nav-link my-1 navbar-btns ">
                <button onClick={logOut} style={{ all: "unset", padding: "3px", borderRadius: "4px" }} className="d-flex justify-content-center"> Logout </button>
              </li>
              :
              ""}

          </ul>
          
      
      </nav>
:""
}

    </>
  );
};

export default Navbar;
