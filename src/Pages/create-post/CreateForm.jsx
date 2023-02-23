import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { useNavigate } from "react-router-dom";
// text editor ---

// text editor ended ---

const CreateForm = () => {
  
  const schema = yup.object().shape({
    title: yup.string().required("You need to add a title "),
    description: yup.string().required("You need to add a description "),
    blog: yup.string().required("You need to add the content "),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const onCreatePost = async (data) => {
    await addDoc(postsRef, {
      description: data.description,
      title: data.title,
      userId: user?.uid,
      username: user?.displayName,
      blog: data.blog,
    });
    await navigate("/");
    await navigate(0);
  };

  return (
    <form className="contianer mx-5  m-4" onSubmit={handleSubmit(onCreatePost)}>
      <div className="mb-3 contact-card">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="Enter the post title here "
          {...register("title")}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          placeholder="Enter the description post here"
          rows="3"
          {...register("description")}
        />
      </div>
      <div className="mb-3">
      <label className="form-label">Blog</label>
        <textarea
          type="text"
          className="form-control"
          id="description"
          placeholder="Enter the description post here"
          rows="10"
          {...register("blog")}
        />
        
      </div>
      <div>
        <p>
          {errors.title?.message} {errors.description?.message}
        </p>
      </div>

      <div className="mb-3">
        <input type="submit" value={"Post" || ""} />
      </div>

      <div className="mb-3">
        <input type="submit" value={"Clear" || ""} />
      </div>

      
    </form>
  );
};

export default CreateForm;
