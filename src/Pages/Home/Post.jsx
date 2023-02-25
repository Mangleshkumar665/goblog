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
import React, { useEffect, useState, createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Config/firebase";
import Comments from "./Comments";
import tempBg from "../../images/posts.jpg";
import { Link } from "react-router-dom";

export const PostProvider = createContext();

const Post = (props) => {
  const { post } = props;
  const [totalComments, setTotalComments] = useState(0);

  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState([]);

  const likesRef = collection(db, "likes");
  const likesDocs = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDocs);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
  };

  const addLike = async (data) => {
    try {
      await addDoc(likesRef, {
        postId: post.id,
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
        where("postId", "==", post.id)
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

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <>
      <div className="card posts-main ">
        <h3 className=" post-profileheader d-flex align-items-center">
          <Link className="navbar-brand" to={`/user/${post.userId}`}>
            {post.username}
          </Link>
        </h3>
        <div className="post-imgwrapper">
          <img src={post.background} className=" post-img" alt="..." />
        </div>
        <div className="card-body post-details">
          <h5 className=" post-title">
            <Link to={`/${post.id}`}>{post.title}</Link>
          </h5>

          <p className="post-desc">{post.description}</p>

          {/* like button logic  */}
          <div className="post-buttons row  ">
            <div className="col-2">
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
            <div className="col-5  ">
              <Comments
                post={post}
                setTotalComments={() => setTotalComments()}
              />
            </div>
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
