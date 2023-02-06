import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"; 


const CreateForm = () => {
    const schema  = yup.object().shape({
        title : yup.string().required("You need to add a title "),
        description : yup.string().required("You need to add a description "),

    });
    

    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onCreatePost = (data)=>{
        console.log("submitted");
        console.log(data);

    }


  return (
    <form className="border" onSubmit={handleSubmit(onCreatePost)}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="Enter the post title here "
          {...register("title")} /> 
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          placeholder="Enter the description post here"
          rows="3"
          {...register("description")} />
      </div>
      <div >
        <p > {errors.title?.message} {errors.description?.message}  </p>
      </div>

      <div className="mb-3">
      
      <input type="submit" value={"Post" || ""}  />
      </div>

      <div className="mb-3">
      <input type="submit" value={"Clear" || ""}  />
      
      </div>
    </form>
  );
};

export default CreateForm;
