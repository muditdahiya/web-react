import DOMPurify from "dompurify";
import {Button} from "react-bootstrap";

const MyPosts = () => {
  return (
    <div className="MyPosts">
      <h1>My Posts</h1>
      <Button >Create Post</Button>
    </div>
  );
};

export default MyPosts;