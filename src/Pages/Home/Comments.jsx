import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../Config/firebase";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import randomstring from 'randomstring';
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

  const [commentId, setCommentId] = useState("")

  const onCreateComment = async (data) => {
    try {
      


      await addDoc(commentsRef, {
        userId: user?.uid,
        postId: props.post.id,
        comment: data.comment,
        commentId:randomstring.generate(10),
        userName:user?.displayName
      });
      // optimistically rendered comment
      if (user) {
        const data = await getDocs(commentDocs);

        setCommentsArray(
          data.docs.map((doc) => ({
            userId: doc.data().userId,
          comment: doc.data().comment,
          commentId : doc.data().commentId,
          userName : doc.data().userName
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
          commentId : doc.data().commentId,
          userName : doc.data().userName
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



  // delete comment -b---
  
  const removeComment = async (element) => {
   console.log(element)
    let commentId = await element.commentId
    try {
      const commentToDeleteQuery = query(
        commentsRef,
        where("userId", "==", user?.uid),
        where("postId", "==", props.post.id),
        where("commentId" ,"==",commentId)
      );

      const commentToDeleteData = await getDocs(commentToDeleteQuery);

      
      const commentToDelete = doc(db, "comments", commentToDeleteData.docs[0].id);

      const docSnap = await getDoc(commentToDelete);
      await deleteDoc(commentToDelete);


      if (user) {
        setCommentsArray((prev) =>
          prev?.filter((comment) => comment.commentId !== docSnap.data().commentId)
        );
      }

    } catch (err) {
      console.log(err);
    }
  };

// delete comment ends  ----
  return (
    <div className="">
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
            className="accordion-collapse collapse    comment-position  "
            aria-labelledby={`flush-heading${props.post.id}`}
            data-bs-parent="#accordionFlushExample"
            style={{}}>
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
              <div className="show-comments  ">
                Comments
                <hr />
                <div className="card" style={{ width: "100%" }}>
                  <ul className="list-group list-group-flush" >
                    {


                      commentsArray?.map((element) => (
                        <li key={element.commentId} className="  mx-2 my-1 " style={{border:"1px solid black"}} >
                          <div className="card-header">
                            {element.userName}
                            
                          </div>
                          <div className="d-flex flex-row justify-content-between" style={{fontSize:"1.5rem"}}>
                            <div >{element.comment}</div>
                            <div> <button onClick={()=>removeComment(element)}><i className="fa-sharp fa-solid fa-xmark"></i></button></div>
                          </div>
                          
                        </li>
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
