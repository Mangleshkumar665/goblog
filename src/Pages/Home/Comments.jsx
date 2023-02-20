import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../Config/firebase";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
const Comments = (props) => {

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

  const onCreateComment = async (data) => {
    try {
        await addDoc(commentsRef, {
            userId: user?.uid,
            postId: props.post.id,
            comment: data.comment,
          });
      // optimistically rendered comment
      if(user){
        const data = await getDocs(commentDocs);

      setCommentsArray(
        data.docs.map((doc) => ({
          userId: doc.data().userId,
          comment: doc.data().comment,
        }))
      );
      }
     
    } catch (err) {
      console.log(err);
    }
  };

  // B - display Comments here----

  //  contains the list of the Comments a particular post has..
  const [commentsArray, setCommentsArray] = useState([]);

  // required to query the comments

  // fetched the elements based on query
  const commentDocs = query(commentsRef, where("postId", "==", props.post.id));

  //  now we will get the elements from the comments docs--
  const showComments = async () => {
    try {
      const data = await getDocs(commentDocs);

      setCommentsArray(
        data.docs.map((doc) => ({
          userId: doc.data().userId,
          comment: doc.data().comment,
        }))
      );

      // console.log(data.docs.map((doc) => ({ userId: doc.data().userId,comment : doc.data().comment })))
      props.setTotalComments(() => commentsArray.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showComments();
  }, []);
  // display Comments here ----ends----

  return (
    <div>
      <div className="comment-button  ">
        <div className="accordion-item ">
          <button
            className=" accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#flush-collapse${props.post.id}`}
            aria-expanded="false"
            aria-controls={`flush-collapse${props.post.id} 
                  post-Btns`}
          >
            <i className="fa-regular fa-comment fa-xl"></i>
          </button>

          <div
            id={`flush-collapse${props.post.id}`}
            className="accordion-collapse collapse temp  comment-section "
            aria-labelledby={`flush-heading${props.post.id}`}
            data-bs-parent="#accordionFlushExample" 
          >
            <div className="accordion-body ">
              <div className="add-comment">
                <form onSubmit={handleSubmit(onCreateComment)}>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="comment here..."
                    {...register("comment")}
                  />

                  <div className="">
                    <input type="submit" value="Post" />
                  </div>
                </form>
              </div>
              <div className="show-comments ">
                Comments
                <hr />
                {/* {console.log(commentsArray)} */}
                <div className="card" style={{ width: "18rem" }}>
                  <ul className="list-group list-group-flush">
                    {
                      // commentsArray.forEach(comment => {
                      //
                      // })
                      
                      commentsArray?.map((element) => (
                        <li key = {element.comment}className="list-group-item">{element.comment} </li>
                      ))
                    }
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
