import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const AddPosts = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate()
  const createPost = () => {
    axios({
        method: "POST",
        withCredentials: true,
        data: {
        title: title,
        content: content,
      },
      url: "http://localhost:4000/api/create-post"
    }).then((res) => {
      console.log(res)
      navigate("/")
    });
    console.log("====================================");
    console.log(new Date(Date.now()));
    console.log("====================================");
  };
  return (
    <>
      <h1>Add Posts</h1>
      <div className="create-post">
        <div className="mb">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
           <input
            type="text"
            placeholder="Body"
            onChange={(e) => setContent(e.target.value)}
          />
        <button className="btn btn-form mt" onClick={createPost}>
          Post
        </button>
      </div>
    </>
  );
};

export default AddPosts;