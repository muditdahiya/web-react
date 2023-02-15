import axios from "axios";
import Post from "../components/Post";
import { useEffect, useState } from "react";
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
    console.log("====================================");
    console.log("rendered");
    console.log("====================================");
  }, []);

  return (
    <div className="Home">
      <h1>the return chapter</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum aut odio
        aperiam sed dolores similique. Inventore qui iure quisquam aut illo
        reprehenderit dicta cumque non ut repudiandae, ex, accusamus enim.
      </p>
      <div className="content">
        {posts
          ? posts.map((post) => <Post post={post} key={uuidv4()} />)
          : "Loading..."}
      </div>
    </div>
  );
};

export default Home;
