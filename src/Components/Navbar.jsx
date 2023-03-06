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



      <nav className="navbar  navbar-expand-md  navbar-body">


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

        {user ? <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> : ""
        }

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav mr-auto">

            {user ?
              <li className="nav-item active">

                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              : ""
            }

            {user ?
              <li className="nav-item active">

                <Link
                  className="nav-link active" to={`/user/${user?.uid}/create-post`} >
                  Create 
                </Link>
              </li>
              : ""}


            {user ?
              <li className="nav-item active">

                <Link
                  className="nav-link active" to={`/user/${user?.uid}`} >
                  Profile
                </Link>
              </li>
              : ""}




            {user ?
              <li className="nav-item active nav-link my-1  ">
                <button onClick={logOut} style={{ all: "unset", padding: "3px", borderRadius: "4px" }}> Logout </button>
              </li>
              :
              ""}

          </ul>
          {/* <form className="form-inline my-2 my-md-0">
          <input className="form-control" type="text" placeholder="Search" />
        </form> */}
        </div>
      </nav>



    </>
  );
};

export default Navbar;
