import ReactQuill from "react-quill";
import { useState } from "react";
import { uuid } from "uuidv4";
import axios from "axios";

const AddPosts = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = () => {
    // axios({
    //   method: "POST",
    //   data: {
    //     title: title,
    //     content: content,
    //     date: new Date(Date.now())
    //   }
    // })
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
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          style={{ width: "100%" }}
          placeholder="What are your thoughts?"
        />
        <button className="btn btn-form mt" onClick={createPost}>
          Post
        </button>
      </div>
    </>
  );
};

export default AddPosts;
