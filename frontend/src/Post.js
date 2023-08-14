import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
  return (
    <main>
      <Link style={{ textDecoration: "none" }} to={`post/${post.id}`}>
        <h2 style={{ color: "blue" }} 
        id='title'
        className="postTitle">
          {post.title}
        </h2>
        <p 
        id='stamp'
        style={{ color: "blue" }} className="timestamp">
          {post.timestamp}
        </p>
      </Link>
      <p className="postBody">
        {post.body.length <= 50 ? post.body : `${post.body.slice(0, 50)}...`}
      </p>
      <hr />
    </main>
  );
}

export default Post