import { ReactElement, useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import AuthContext, { AuthContextType } from "../context/Auth";
import { IPost } from "../interfaces/Post";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const MyPosts = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  const username = auth.user.username;
  const [posts, setPosts] = useState<IPost[] | undefined>(undefined);

  function getPosts() {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/api/posts",
    }).then((res) => {
      setPosts(res.data);
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  function createPosts() {
    let postArray: ReactElement[] = [];
    if (posts) {
      for (let post of posts) {
        if (post.username.toLowerCase() == username.toLowerCase()) {
          postArray.push(
            <Post
              title={post.title}
              content={post.content}
              username={post.username}
              date={post.date}
              tags={post.tags}
              key={uuidv4()}
            />
          );
        }
      }
      postArray = postArray.reverse();

      return postArray;
    }
  }

  return (
    <div className="MyPosts">
      <h1>My Posts</h1>
      <Link to={"/addposts"}>
        <Button>Create Post</Button>
      </Link>
      <div className="content">{createPosts()}</div>
    </div>
  );
};

export default MyPosts;
