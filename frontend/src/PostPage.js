import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PostPage = ({ posts, handleDeletePost }) => {
  const { id } = useParams();

//convert post.id to a string for effective comparism because the id parameter is a string
  const post = posts.find((post) => post.id.toString() === id);

  return (
    <>
      {post && (
        <>
          <h2 className="postTitle">{post.title}</h2>
          <p className="timestamp">{post.timestamp}</p>
          <p className="postBody">{post.body}</p>
          <Link to={`/edit/${post.id}`}>
            <button
              style={{
                marginLeft: "1.5rem",
                width: "20%",
                marginBottom: "2rem",
                height: "3rem",
              }}
            >
              Edit Post
            </button>
          </Link>
            <button
              style={{
                marginLeft: "1.5rem",
                width: "20%",
                marginBottom: "2rem",
                height: "3rem"
              }}
              onClick={() => handleDeletePost(post.id)}
            >
              Delete Post
            </button>
        </>
      )}
      {!post && (
        <>
          <p>Oops, sorry. Page not found</p>
          <Link to="/">Go back to Home page</Link>
        </>
      )}
    </>
  );
}

export default PostPage