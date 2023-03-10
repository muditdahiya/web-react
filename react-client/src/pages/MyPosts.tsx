import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyPosts = () => {
  return (
    <div className="MyPosts">
      <h1>My Posts</h1>
      <Link to={"/addposts"}>
        <Button>Create Post</Button>
      </Link>
    </div>
  );
};

export default MyPosts;
