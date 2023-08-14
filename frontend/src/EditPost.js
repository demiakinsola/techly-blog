import { React, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({
  posts,
  handleEditPost,
  editTitle,
  setEditTitle,
  editBody,
  setEditBody,
}) => {
  //find the post that matches the id
  //convert post.id to a string for effective comparism because the id parameter is a string
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  //set edit values to post title and body
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <>
      {editTitle && (
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <label
            style={{
              marginLeft: "1rem",
              marginBottom: "1rem",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
            htmlFor="postTitle"
          >
            Post Title
          </label>
          <input
            style={{
              display: "block",
              width: "90%",
              marginLeft: "1rem",
              marginBottom: "1rem"
            }}
            type="text"
            name="title"
            placeholder="Type here..."
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <label
            style={{
              marginLeft: "1rem",
              marginBottom: "1rem",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
            htmlFor="postBody"
          >
            Post Body
          </label>
          <textarea
            name="body"
            id=""
            placeholder="Type here..."
            cols="30"
            rows="10"
            style={{
              display: "block",
              width: "90%",
              marginLeft: "1rem",
              marginBottom: "1rem",
            }}
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          ></textarea>
          <button
            type="submit"
            style={{
              display: "block",
              width: "90%",
              marginLeft: "1rem",
              marginBottom: "1rem",
              height: "3rem",
            }}
            onClick={() => handleEditPost(post.id)}
          >
            Submit
          </button>
        </form>
      )}
      {!post && (
        <>
          <p>Oops, sorry. Page not found</p>
          <Link to="/">Go back to Home page</Link>
        </>
      )}
    </>
  );
};

export default EditPost;
