import { AiFillStar } from "react-icons/ai";

const Favourites = () => {
  return (
    <div className="Favourites">
      <h1>Favourites</h1>

      <div className="content">
        <div className="Post">
          <h1 className="Post-title">Title</h1>
          <p className="Post-username">by userA at 9:23pm</p>
          <hr />
          <p className="Post-tags">fantasy</p>
          <p className="Post-content">This is just dummy data</p>
          <div className="buttons">
            {/* add like comment and favourites button based on authentication */}
            <span role="button">
              <AiFillStar className="btn-fav" />
            </span>
          </div>
        </div>

        <div className="Post">
          <h1 className="Post-title">Title Title Title</h1>
          <p className="Post-username">by userA at 9:23pm</p>
          <hr />
          <p className="Post-tags">fantasy</p>
          <p className="Post-content">This is just dummy data</p>
          <div className="buttons">
            {/* add like comment and favourites button based on authentication */}
            <span role="button">
              <AiFillStar className="btn-fav" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
