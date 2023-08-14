import React from "react";

const NewPost = ({
  handleNewPost,
  postTitle,
  setPostTitle,
  postBody,
  setPostBody,
}) => {
  return (
    <>
      <form action="" onSubmit={handleNewPost}>
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
            marginBottom: "1rem",
          }}
          type="text"
          name="title"
          placeholder="Type here..."
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
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
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        ></textarea>
        <button
          type="submit"
          style={{
            display: "block",
            width: "90%",
            marginLeft: "1rem",
            marginBottom: "1rem",
            height: "3rem"
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default NewPost;
