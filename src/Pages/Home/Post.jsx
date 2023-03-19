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
import { Link } from "react-router-dom";
import liked from "../../images/liked.png"
import { motion } from "framer-motion"

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
      <div className="card posts-main  ">
        <h3 className=" post-profileheader d-flex align-items-center">
          <Link className="navbar-brand" to={`/user/${post.userId}`}>
            {post.username}
          </Link>
        </h3>
        <motion.div className="post-imgwrapper" whileHover={{ scale: [null, 1.1, 1.1] }}
          transition={{ duration: 0.3 }}>
          <img src={post.background} className=" post-img" alt="..." />
        </motion.div>
        <div className="card-body post-details">
          <motion.h5 className=" post-title" whileHover={{ scale: [null, 1.01, 1.1] }}
            transition={{ duration: 0.3 }} >
            <Link to={`/${post.id}`} style={{ all: "unset", color: "grey" }}>{post.title}</Link>
          </motion.h5>

          <p className="post-desc">{post.description}</p>

          {/* like button logic  */}
          <div className="post-buttons row  ">
            <div className="col-2">
              {hasCurrentUserLiked ? (
                <motion.button onClick={removeLike}
                  whileHover={{ scale: [null, 1.5, 1.4] }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={liked} alt="liked" style={{ width: "27px" }} />
                </motion.button>
              ) : (
                <motion.button onClick={addLike} className="post-Btns"
                  whileHover={{ scale: [null, 1.5, 1.4] }}
                  transition={{ duration: 0.3 }}>

                  <i className="fa-regular fa-heart fa-xl"></i>
                </motion.button>
              )}

              {/* like button logic -- ends --  */}
            </div>
            <motion.div className="col-5  "
            >
              <Comments
                post={post}
                setTotalComments={() => setTotalComments()}
              />
            </motion.div>
          </div>
        </div>

        <div className="post-stats d-flex" style={{ fontSize: "1.5rem" }}>
          <div className="likes-stats mx-3">{likes.length} Likes</div>

        </div>
      </div>

    </>
  );
};
export default Post;
