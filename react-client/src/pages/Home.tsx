import axios from "axios";
import Post from "../components/Post";
import { IPost } from "../interfaces/Post";
import { ReactElement, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [posts, setPosts] = useState<IPost[] | undefined>(undefined);
  const [searchFilter, setSearchFilter] = useState("");
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
        console.log(post);
        if (post.title.toLowerCase().includes(searchFilter.toLowerCase())) {
          postArray.push(<Post post={post} key={uuidv4()} />);
        }
      }
    }

    postArray = postArray.reverse();
    console.log(postArray);
    return postArray;
  }

  function handleSearchFilter(event: React.FormEvent<HTMLInputElement>) {
    setSearchFilter(event.currentTarget.value);
  }

  return (
    <div className="Home">
      <h1>the return chapter</h1>
      <input
        type="text"
        value={searchFilter}
        onChange={handleSearchFilter}
        placeholder="Search titles"
      />
      <div className="content">{createPosts()}</div>
    </div>
  );
};

export default Home;
