interface Props {
  title: string;
  content: string;
  username: string;
  date: Date;
  tags: string[];
}

const Post = (post: Props) => {
  let date: string = post.date ? post.date.toString() : "";
  let username: string = post.username ? post.username.toString() : "";

  return (
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
      </div>
    </div>
  );
};

export default Post;
