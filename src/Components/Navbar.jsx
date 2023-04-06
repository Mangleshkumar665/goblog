import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion"
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

      {user ?
        <nav className="navbar navbar-body  d-flex  justify-content-center">

          {user ? <div className="nav-item col-7 d-flex align-items-center justify-content-center "
          >
            
            <motion.div
              whileHover={{ scale: [null, 1.5, 1.4] }}
              transition={{ duration: 0.3 }}
            >
              <Link className="navbar-brand" to="/">
                Go Blog
              </Link>
            </motion.div>
          </div> : <div className="d-flex align-items-center justify-content-center" style={{ width: "56vw", position: "relative", left: "20vw" }}>
            <motion.div className=""
              whileHover={{ scale: [null, 1.5, 1.4] }}
              transition={{ duration: 0.3 }}

            >
              <Link className="navbar-brand" to="/"


              >

                Go Blog
              </Link>
            </motion.div>

          </div>}


          <ul className="navbar-nav mr-auto  flex-row    ">

            {user ?
              <motion.li className="nav-item active " whileHover={{ scale: [null, 1.0, 1.4] }}
                transition={{ duration: 0.3 }}>

                <Link className="nav-link navbar-btns d-flex justify-content-center active" to="/">
                  Home
                </Link>
              </motion.li>
              : ""
            }

            {user ?
              <motion.li className="nav-item active " whileHover={{ scale: [null, 1.0, 1.4] }}
                transition={{ duration: 0.3 }}>

                <Link
                  className="nav-link active navbar-btns d-flex justify-content-center" to={`/user/${user?.uid}/create-post`} >
                  Create
                </Link>
              </motion.li>
              : ""}


            {user ?
              <motion.li className="nav-item active "
                whileHover={{ scale: [null, 1.0, 1.4] }}
                transition={{ duration: 0.3 }}>

                <Link
                  className="nav-link active navbar-btns d-flex justify-content-center" to={`/user/${user?.uid}`} >
                  Profile
                </Link>
              </motion.li>
              : ""}




            {user ?
              <motion.li className="nav-item active nav-link my-1 navbar-btns "
                whileHover={{ scale: [null, 1.0, 1.4] }}
                transition={{ duration: 0.3 }}>

                <button onClick={logOut} style={{ all: "unset", padding: "3px", borderRadius: "4px" }} className="d-flex justify-content-center"> Logout </button>
              </motion.li>
              :
              ""}

          </ul>


        </nav>
        : ""
      }

    </>
  );
};

export default Navbar;
