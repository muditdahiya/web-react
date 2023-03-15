import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext, { AuthContextType } from "../context/Auth";

const AddPosts = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  console.log(auth);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const createPost = () => {
    axios({
      method: "POST",
      withCredentials: true,
      data: {
        title: title,
        content: content,
        date: new Date(Date.now()),
        username: auth.user.username, //get from context
        tags: tags,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/api/create-post`,
    }).then((res) => {
      console.log(res);
      navigate("/");
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
        <div className="mb">
          <input
            type="text"
            placeholder="Tags"
            onChange={(e) => setTags(e.target.value)}
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
