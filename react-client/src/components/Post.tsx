import DOMPurify from "dompurify";

interface Props {
  post: any;
}

const Post = ({ post }: Props) => {
  return (
    <>
      <div className="post">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-content">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Post;
