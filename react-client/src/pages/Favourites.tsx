import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import AuthContext, { AuthContextType } from "../context/Auth";
import { useContext, useState, useEffect, ReactElement } from "react";
import { IPost } from "../interfaces/Post";
import Favourite from "../components/Favourite";
import { v4 as uuidv4 } from "uuid";

const Favourites = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  const [email, setEmail] = useState(auth.user.username);
  const [favs, setFavs] = useState<IPost[] | undefined>(undefined);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getFavs() {
    axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.REACT_APP_BACKEND_URL}/api/favs/${email}`,
    }).then((res) => {
      console.log(res.data);

      setFavs(res.data);
    });
  }

  useEffect(() => {
    getFavs();
  }, []);

  function createFavs() {
    let favArray: ReactElement[] = [];
    if (favs) {
      for (let post of favs) {
        favArray.push(
          <Favourite
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
    favArray = favArray.reverse();

    return favArray;
  }

  return <div className="content">{createFavs()}</div>;
};

export default Favourites;
