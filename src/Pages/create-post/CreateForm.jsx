import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { useNavigate } from "react-router-dom";

import JoditEditor from "jodit-react";
import { useMemo } from "react";
import axios from "axios";

import Filter from "bad-words";


const CreateForm = () => {

  // adding tags 
  const [tagsArray, setTagsArray] = useState(["Others"])

  const tagSelection = (event) => {
    if (!tagsArray.includes(event.target.value)) {
      setTagsArray([event.target.value, ...tagsArray]);

    } else {
      console.log("duplicate elements ");
      setTagsArray(
        tagsArray.filter((element) => element !== event.target.value)
      );
    }
  };



  // adding tags ended here  -----

  // profanity checking 

  const filter = new Filter()



  // text editor ---
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );
  // text editor ended ---
  const schema = yup.object().shape({
    title: yup.string().required("You need to add a title "),
    description: yup.string().required("You need to add a description "),
    blog: yup.string(),
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

    const clientId = "TPgpKauoGGr_sqhV82hcPHQXRsVNNLl79RvFSgHY6N4";
    const endpoint = `https://api.unsplash.com/photos/random?client_id=${clientId}&query=nature&orientation=landscape`;

    await axios.get(endpoint).then((res) => {



      addDoc(postsRef, {
        description: filter.clean(data.description),
        title: filter.clean(data.title),
        userId: user?.uid,
        username: user?.displayName,
        blog: filter.clean(content),
        background: res.data.urls.regular,
        tags: tagsArray,
      });

    });
    setTimeout(() => {
      navigate("/");
      navigate(0)
      alert("posted successfully")
    }, 2000);

  };

  // addding background image  to the posts -

  return (
    <div className="d-flex justify-content-center my-4">
      <div className="  form-head" style={{ marginBottom: "100px", paddingBottom: "8px" }}>
        <div className="display-4 text-center p-2    ">
          Create a Post
          <hr className="hr hr-blurry  mx-5  " />
        </div>


        <form className=" mx-5  m-4" onSubmit={handleSubmit(onCreatePost)} >
          <div className="mb-3 ">
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

            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              id="blog"
              name="bacd"
              onChange={(newContent) => {
                setContent(newContent);
              }}

            />
          </div>
          <div className=" form-tag-wrapper ">



            <div className="mx-1 my-2">

              <h4 className=" ">Select Tags</h4>
            </div>
            <div >
              <div >
                <div

                  role="group"
                  aria-label="Basic example" style={{
                    flexWrap: "wrap"
                  }}
                >
                  <button
                    type="button"
                    value="Movies"
                    className="btn btn-secondary 
                        form-tag-buttons"
                    onClick={tagSelection}
                    style={{ margin: "5px" }}
                  >
                    Movies
                  </button>
                  <button
                    type="button"
                    value="LifeStyle"
                    className="btn btn-secondary
                        form-tag-buttons"
                    onClick={tagSelection}
                    style={{ margin: "5px" }}
                  >
                    LifeStyle
                  </button>
                  <button
                    type="button"
                    value="Music"
                    className="btn btn-secondary
                        form-tag-buttons"
                    onClick={tagSelection}
                    style={{ margin: "5px" }}
                  >
                    Music
                  </button>

                  <button
                    type="button"
                    value="Sports"
                    className="btn btn-secondary
                        form-tag-buttons"
                    onClick={tagSelection}
                    style={{ margin: "5px" }}
                  >
                    Sports
                  </button>
                  <button
                    type="button"
                    value="News"
                    className="btn btn-secondary "
                    onClick={tagSelection}
                    style={{ margin: "5px" }}
                  >
                    News
                  </button>

                  <button
                    type="button"
                    value="Others"
                    className="btn btn-secondary 
                        form-tag-buttons"
                    onClick={tagSelection}
                    style={{ margin: "5px" }}
                  >
                    Others
                  </button>

                </div>

                <div className="my-1">
                  <hr />
                  <div className="">
                    {tagsArray.map((data) => (
                      <button
                        type="button"
                        key={data}
                        value={data}
                        className="btn btn-secondary
                            form-tag-buttons "
                        onClick={tagSelection}
                        style={{ margin: "5px" }}
                      >
                        {data}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer mx-1 my-1">


              <button
                type="button"
                className="btn btn-danger
                    form-tag-buttons"
                data-bs-dismiss="modal"
                onClick={() => setTagsArray(["Others"])}
              >
                Clear
              </button>
            </div>




          </div>


          <div>

            <p>
              {errors.title?.message} {errors.description?.message}
            </p>
          </div>
          <div className="mb-3   ">
            <input type="submit" className=" form-submit-btn d-flex justify-content-center " value={"Post" || ""} />
          </div>

          {/* {console.log(window.innerWidth)}  */}
        </form>

      </div>
      
    </div>
  );
};

export default CreateForm;
