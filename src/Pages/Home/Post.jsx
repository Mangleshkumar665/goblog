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
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Config/firebase";
import Comments from "./Comments";
import tempBg from "../../images/posts.jpg";

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

      //  adding the optimistic rendering here in order to quickly show changes to the like or dislike button .

      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user.uid }] : [{ userId: user?.uid }]
        );
      }
    } catch (err) {
      console.log(err);
    }

    // if prev data exisit then add a userID with user.uid in the list ,justing changing the likes frontend prior to the  backend .. or if prev data doesnt exist then just simply create a array of  only single liked userId  and update the setLikes with it .
  };

  // removal of likes from the Posts done by a specific user ---------------------------------------------------------------------------------------

  const removeLike = async (data) => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("userId", "==", user?.uid),
        where("postId", "==", props.post.id)
      );
      // will return a object based on the query
      // console.log(likeToDeleteQuery);

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      // returns list of all data based on the query .
      // console.log(likeToDeleteData, "");

      // for delete docs we need to pass a doc() as arg to the deleteDoc fxn

      // creating  doc() in  likeToDelete var but we require the specific  record  form the db so for that specific record create a query such that " postId is same for the post which we click and userId is also same  as the current user st no other user can remove like of other user => likeToDeleteQuery"

      const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);
      // finaly  found the doc based on the query
      const docSnap = await getDoc(likeToDelete);

      // console.log(docSnap.data() ,likes)

      //  adding the optimistic rendering here in order to quickly show changes to the like or dislike button .

      // console.log(docSnap.data() ,likes)

      if (user) {
        setLikes((prev) =>
          prev?.filter((like) => like.userId !== docSnap.data().userId)
        );
      }
      // a/c this code this will filter out the like array element whose userId is same as the one which is going to get deleted

      await deleteDoc(likeToDelete);
    } catch (err) {
      console.log(err);
    }
  };
  const hasCurrentUserLiked = likes?.find((like) => like.userId === user?.uid);

  return (
    
    <>
      <div className="card posts-main " >
        <h5 className="card-header">{props.post.username}</h5>
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
