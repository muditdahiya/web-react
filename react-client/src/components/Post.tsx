import DOMPurify from "dompurify";

interface Props {
  title: string;
  content: string;
  username: string;
  date: Date;
  tags: string[];
}

const Post = (post: Props) => {
  let date: string = post.date ? post.date.toString() : "";

  return (
    <div className="post">
      <h1 className="post-title">{post.title}</h1>
      <br />
      <p className="post-username">{post.username}</p>
      <p className="post-date">{date}</p>
      <p className="post-tags">{post.tags}</p>
      <p className="post-content">{post.content}</p>
    </div>
  );
};

export default Post;
