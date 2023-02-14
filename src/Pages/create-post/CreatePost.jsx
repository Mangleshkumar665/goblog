import React from "react";
import CreateForm from "./CreateForm";
import ProfilePage from "./ProfilePage";

const CreatePost = () => {
  return (
    <>
      <ProfilePage />

      <div className="container  form-head">
        <div className="display-4 text-center p-2    ">
          Create a Post 
          <hr className="hr hr-blurry  mx-5  " />
        </div>
        <CreateForm />
      </div>
    </>
  );
};

export default CreatePost;
