import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Config/firebase';

export default function Footer() {
  const [user] = useAuthState(auth);
  return (
    <>{ user ? 
      <div className="footer-body" >
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top container">
          <div className="col-md-4 d-flex align-items-center">

            <span className="mb-3 mb-md-0 text-muted">© 2023 Manglesh Kumar </span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">

          </ul>
        </footer>
      </div>:""
      }
    </>
  )
}
