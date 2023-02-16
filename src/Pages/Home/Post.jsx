import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState,createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Config/firebase";
import Comments from "./Comments";
import tempBg from "../../images/posts.jpg";
import UserPosts from "../create-post/UserPosts";
import { Link } from "react-router-dom";

export const PostProvider = createContext();


const Post = (props) => {

  const [totalComments, setTotalComments] = useState(0);

  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState([]);

  const likesRef = collection(db, "likes");
  const likesDocs = query(likesRef, where("postId", "==", props.post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDocs);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
  };

  useEffect(() => {
    getLikes();
  }, []);

  const addLike = async (data) => {
    try {
      await addDoc(likesRef, {
        postId: props.post.id,
        userId: user?.uid,
      });


      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user.uid }] : [{ userId: user?.uid }]
        );
      }
    } catch (err) {
      console.log(err);
    }

  };


  const removeLike = async (data) => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("userId", "==", user?.uid),
        where("postId", "==", props.post.id)
      );


      const likeToDeleteData = await getDocs(likeToDeleteQuery);


      const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);

      const docSnap = await getDoc(likeToDelete);


      if (user) {
        setLikes((prev) =>
          prev?.filter((like) => like.userId !== docSnap.data().userId)
        );
      }


      await deleteDoc(likeToDelete);
    } catch (err) {
      console.log(err);
    }
  };
  const hasCurrentUserLiked = likes?.find((like) => like.userId === user?.uid);

  return (
    
    <>
      <div className="card posts-main " >
        <h5 className="card-header"> <Link className="navbar-brand" to={`/user/${props.post.userId}`}>
        {props.post.username}
          </Link> </h5>
        <img src={tempBg} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.post.title}</h5>
          <p className="card-text">{props.post.description}</p>

          {/* like button logic  */}
          <div className="post-buttons d-flex ">
            <div className="">
              
              {hasCurrentUserLiked ? (
                <button onClick={removeLike}>
                  <i className="fa-solid fa-heart fa-xl"></i>{" "}
                </button>
              ) : (
                <button onClick={addLike} className="post-Btns">
                  <i className="fa-regular fa-heart fa-xl"></i>
                </button>
              )}

              {/* like button logic -- ends --  */}
            </div>
            <Comments
              post={props.post}
              setTotalComments={() => setTotalComments()}
            />
          </div>
        </div>

        <div className="post-stats d-flex">
          <div className="likes-stats">{likes.length} Likes</div>
          <div className="comments-stats">{totalComments} Comments</div>
          {/* {console.log(totalComments)} */}
        </div>
       

      </div>
    </>
  );
};
export default Post;
