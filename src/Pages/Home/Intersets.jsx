import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Config/firebase";
import { motion } from "framer-motion"
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

      await updateDoc(userToUpdate, {
        interests: interestsArray,
      });
    } catch (err) {
      console.log(err);
    }
  };





  return (
    <>
      {
        user ?

          <div>
            <motion.button
              whileHover={{ scale: [null, 1, 1.05] }}
              transition={{ duration: 0.3 }}
              type="button"
              className="btn  btn-lg button-interests "
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              {interestsArray === [] ? "Tells Us About Your Interests" : "Edit Your Interests"}
            </motion.button>

            <div id="myModal" className="modal fade " role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <motion.button
                      type="button"
                      className=""
                      data-bs-dismiss="modal"
                      style={{ all: "unset" }}
                      whileHover={{ scale: [null, 1.5, 1.4] }}
                      transition={{ duration: 0.3 }}
                    >
                      <i className="fa-sharp fa-solid fa-xmark"></i>
                    </motion.button>

                    <h4 className="modal-title">Your Interests</h4>
                  </div>
                  <div className="modal-body">
                    <div>
                      <div
                        className=""
                        role="group"
                        aria-label="Basic example"
                        style={{ flexWrap: "warp" }}
                      >
                        <motion.button
                          whileHover={{ scale: [null, 1.5, 1.4] }}
                          transition={{ duration: 0.3 }}
                          type="button"
                          value="Movies"
                          className="btn btn-secondary"
                          onClick={interestSelecttion}
                          style={{ margin: "2px" }}
                        >
                          Movies
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: [null, 1.5, 1.4] }}
                          transition={{ duration: 0.3 }}
                          type="button"
                          value="LifeStyle"
                          className="btn btn-secondary"
                          onClick={interestSelecttion}
                          style={{ margin: "2px" }}
                        >
                          LifeStyle
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: [null, 1.5, 1.4] }}
                          transition={{ duration: 0.3 }}
                          type="button"
                          value="Music"
                          className="btn btn-secondary"
                          onClick={interestSelecttion}
                          style={{ margin: "2px" }}
                        >
                          Music
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: [null, 1.5, 1.4] }}
                          transition={{ duration: 0.3 }}
                          type="button"
                          value="Sports"
                          className="btn btn-secondary"
                          onClick={interestSelecttion}
                          style={{ margin: "2px" }}
                        >
                          Sports
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: [null, 1.5, 1.4] }}
                          transition={{ duration: 0.3 }}
                          type="button"
                          value="News"
                          className="btn btn-secondary "
                          onClick={interestSelecttion}
                          style={{ margin: "2px" }}
                        >
                          News
                        </motion.button>
                      </div>

                      <div className="">
                        <hr />
                        <div style={{ flexWrap: "wrap" }}>
                          {interestsArray.map((data) => (
                            <motion.button
                              whileHover={{ scale: [null, 1.5, 1.4] }}
                              transition={{ duration: 0.3 }}
                              type="button"
                              key={data}
                              value={data}
                              className="btn btn-secondary "
                              onClick={interestSelecttion}
                              style={{ margin: "2px" }}
                            >
                              {data}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">

                    <motion.button type="button" className="btn btn-default" onClick={AddInterests}
                      whileHover={{ scale: [null, 1.5, 1.4] }}
                      transition={{ duration: 0.3 }}>
                      Add
                    </motion.button>

                    <motion.button
                      type="button"
                      className="btn btn-default"
                      data-bs-dismiss="modal"
                      whileHover={{ scale: [null, 1.5, 1.4] }}
                      transition={{ duration: 0.3 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : ""}
    </>
  );
};
export default Intersets;
