import React from 'react'
import {Link} from 'react-router-dom'
import { Auth, signOut } from 'firebase/auth'
import { auth } from '../Config/firebase'
const Navbar = () => {
  const logOut = ()=>{
    signOut(auth);
  }


  return (
    
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Typing Analyser
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page"  to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page"  to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page"  to="/create-post">
                  Create-Post
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={logOut}> Logout </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar