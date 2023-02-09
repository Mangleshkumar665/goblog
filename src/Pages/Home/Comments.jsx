import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../Config/firebase";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
const Comments = (props) => {
  // creating comments

  //  creating schema
  const schema = yup.object().shape({
    comment: yup.string().required("You need to add a comment "),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const commentsRef = collection(db, "comments");
  const [user] = useAuthState(auth);

  const onAddComment = async (data) => {
    await addDoc(commentsRef, {
      userId: user?.uid,
      postId: props.post.id,
      comment: data.comment,
    });
  };


// display Comments here---- 

//   //  contains the list of the Comments a particular post has..
//   const [commentsArray, setCommentsArray] = useState([]);

//   // required to query the comments

//   // fetched the elements based on query
//   const commentDocs = query(commentsRef, where("postId", "==", props.post.id));

//   //  now we will get the elements from the comments docs--
//   const getComments = async () => {
//     const data = await getDocs(commentDocs);
//     console.log(data.docs, "data here");

//     // setCommentsArray( )
//   };

//   useEffect(() => {
//     // getComments();
//   }, []);
// display Comments here ----ends---- 


  return (
    <div>
      <div className="comment-button ">
        <div className="accordion-item">
          <button
            className=" accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne 
                  post-Btns"
          >
            <i className="fa-regular fa-comment"></i>
          </button>

          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse "
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body bdr">
              <div className="add-comment">
                <form onSubmit={handleSubmit(onAddComment)}>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="comment here..."
                    
                    {...register("comment")}
                  />

                  <div className="">
                    <input type="submit"  value="Post" /> 
                  </div>
                </form>
              </div>
              <div className="show-comments">
                Other's Comments
                <div className="card" style={{ width: "18rem" }}>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Nice </li>
                    <li className="list-group-item">great</li>
                    <li className="list-group-item">nicely explain </li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
