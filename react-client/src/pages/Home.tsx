import axios from "axios";
import Post from "../components/Post";
import { useEffect, useState } from "react";
// import { uuid } from "uuidv4";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [posts, setPosts] = useState([{}]);

  useEffect(() => {
    async function getPosts() {
      axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/api/posts",
      }).then((res) => {
        setPosts(res.data);
      });
    }

    getPosts();
  }, []);

  return (
    <div className="Home">
      <h1>the return chapter</h1>
      <div className="content">
        {posts
          ? posts.map((post) => <Post post={post} key={uuidv4()} />)
          : "Loading..."}
      </div>
    </div>
  );
};

export default Home;
