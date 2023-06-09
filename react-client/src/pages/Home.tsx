import axios from "axios";
import Post from "../components/Post";
import { IPost } from "../interfaces/Post";
import { ReactElement, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [posts, setPosts] = useState<IPost[] | undefined>(undefined);
  const [searchFilter, setSearchFilter] = useState("");
  const [searchUsernameFilter, setSearchUsernameFilter] = useState("");
  function getPosts() {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/api/posts`,
    }).then((res) => {
      setPosts(res.data);
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  function createPosts() {
    let postArray: ReactElement[] = [];
    if (posts !== undefined) {
      for (let post of posts) {
        console.log(post);
        if (post.title) {
          if (post.username) {
            if (
              post.title.toLowerCase().includes(searchFilter.toLowerCase()) &&
              post.username
                .toLowerCase()
                .includes(searchUsernameFilter.toLowerCase())
            ) {
              postArray.push(
                <Post
                  _id={post._id}
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
        }
      }
    }
    postArray = postArray.reverse();

    return postArray;
  }

  function handleSearchFilter(event: React.FormEvent<HTMLInputElement>) {
    setSearchFilter(event.currentTarget.value);
  }
  function handleSearchUsernameFilter(
    event: React.FormEvent<HTMLInputElement>
  ) {
    setSearchUsernameFilter(event.currentTarget.value);
  }

  return (
    <div className="Home">
      <h1>the return chapter</h1>
      <input
        type="text"
        value={searchFilter}
        onChange={handleSearchFilter}
        placeholder="Search title"
      />
      <input
        type="text"
        value={searchUsernameFilter}
        onChange={handleSearchUsernameFilter}
        placeholder="Search username"
      />
      <div className="content">{createPosts()}</div>
    </div>
  );
};

export default Home;
