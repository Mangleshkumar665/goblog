import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Config/firebase";

const Intersets = () => {
  const [interestsArray, setInterestsArray] = useState([]);

  const [user] = useAuthState(auth);
  const usersRef = collection(db, "users");

  const interestSelecttion = (event) => {
    if (!interestsArray.includes(event.target.value)) {
      setInterestsArray([event.target.value, ...interestsArray]);

    } else {
      console.log("duplicate elements ");
      setInterestsArray(
        interestsArray.filter((element) => element !== event.target.value)
      );
    }
  };

  // adding interests to databse


  const AddInterests = async (data) => {
    try {
      const userToUpdateQuery = query(
        usersRef,
        where("userId", "==", user?.uid)
      );

      const userToUpdateData = await getDocs(userToUpdateQuery);

      const userToUpdate = doc(db, "users", userToUpdateData.docs[0].id);

      const docSnap = await getDoc(userToUpdate);

      await updateDoc(userToUpdate,{
        interests:interestsArray,
      });
    } catch (err) {
      console.log(err);
    }
  };



  

  return (
    <div>
      <button
        type="button"
        className="btn  btn-lg "
        data-bs-toggle="modal"
        data-bs-target="#myModal"
        style={{
          border: "1px solid black",
          borderRadius: "2px",
          marginTop: "3px",
        }}
      >
        Tells Us About Your Interests{" "}
      </button>

      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className=""
                data-bs-dismiss="modal"
                style={{ all: "unset" }}
              >
                <i className="fa-sharp fa-solid fa-xmark"></i>
              </button>

              <h4 className="modal-title">Your Interests</h4>
            </div>
            <div className="modal-body">
              <div>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    value="Movies"
                    className="btn btn-secondary"
                    onClick={interestSelecttion}
                  >
                    Movies
                  </button>
                  <button
                    type="button"
                    value="LifeStyle"
                    className="btn btn-secondary"
                    onClick={interestSelecttion}
                  >
                    LifeStyle
                  </button>
                  <button
                    type="button"
                    value="Music"
                    className="btn btn-secondary"
                    onClick={interestSelecttion}
                  >
                    Music
                  </button>

                  <button
                    type="button"
                    value="Sports"
                    className="btn btn-secondary"
                    onClick={interestSelecttion}
                  >
                    Sports
                  </button>
                  <button
                    type="button"
                    value="News"
                    className="btn btn-secondary "
                    onClick={interestSelecttion}
                  >
                    News
                  </button>
                </div>

                <div className="">
                  <hr />
                  <div>
                    {interestsArray.map((data) => (
                      <button
                        type="button"
                        id={data}
                        value={data}
                        className="btn btn-secondary "
                        onClick={interestSelecttion}
                      >
                        {data}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              
              <button type="button" className="btn btn-default" onClick={AddInterests}>
                Add
              </button>

              <button
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Intersets;
