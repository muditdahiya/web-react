/* eslint-disable react-hooks/exhaustive-deps */
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import AuthContext, { AuthContextType } from "../context/Auth";
import { useContext, useState, useEffect } from "react";

interface Props {
  _id: string;
  title: string;
  content: string;
  username: string;
  date: Date;
  tags: string[];
}

const Favourite = (post: Props) => {
  let date: string = post.date ? post.date.toString() : "";
  let username: string = post.username ? post.username.toString() : "";

  const [active, setActive] = useState(true);

  const auth = useContext(AuthContext) as AuthContextType;
  const [email, setEmail] = useState(auth.user.username);

  const implementFav = () => {
    setActive(!active);
    if (active) {
      // delete fav
      axios({
        method: "DELETE",

        url: `${process.env.REACT_APP_BACKEND_URL}/api/delete-fav/${email}/${post._id}`,
      }).then((response) => {
        console.log(response);
      });
    } else {
      // add fav
      axios({
        method: "POST",

        data: {
          username: email,
          postID: post._id,
        },
        url: `${process.env.REACT_APP_BACKEND_URL}/api/add-fav/${post._id}`,
      }).then((response) => {
        console.log(response);
      });
    }
  };

  useEffect(() => {}, [implementFav, post]);

  return (
    <>
      <div className="Favourites">
        <div className="content">
          <div className="Post">
            <h1 className="Post-title">{post.title}</h1>
            <p className="Post-username">
              by {username} at {date}
            </p>
            <hr />
            <p className="Post-tags">{post.tags}</p>
            <p className="Post-content">{post.content}</p>
            <div className="buttons">
              {/* add like comment and favourites button based on authentication */}
              <span role="button" onClick={implementFav}>
                <AiFillStar className={active ? "btn-fav" : "btn-favv"} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favourite;
