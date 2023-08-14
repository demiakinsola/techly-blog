import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "./api/postsApi";
import Layout from "./Layout";
import About from "./About";
import ContactUs from "./ContactUs";
import Home from "./Home";
import PostPage from "./PostPage";
import NewPost from "./NewPost";
import { format } from "date-fns";
import EditPost from "./EditPost";
import SignUp from "./SignUp";
import Login from "./Login";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postBody, setPostBody] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [name, setName] = useState('');
  const[email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate = useNavigate();

  //set the posts to show whenever the page loads
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await api.get("/post");
        setPosts(response.data);
      } catch (err) {
        //error response from the api
        if (err.response) {
          console.log(err);
        } else {
          //no error response from the api
          console.log(`Error: ${err.message}`);
        }
      }
    };
    getPosts();
  }, []);

  //to show the results of searching for posts and display them in a descending order
  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredPosts.reverse());
  }, [posts, search]);

  //to add a new post
  const handleNewPost = async (e) => {
    e.preventDefault(); //prevents the page from reloading after submission
    //set the id of the post
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    //set the current date
    const date = format(new Date(), "MMMM dd yyyy pp");
    const newPost = {
      id: id,
      timestamp: date,
      title: postTitle,
      body: postBody,
    };
    try {
      //send new post to the server
      const response = await api.post("/post", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      //set the values of the inputs as empty strings
      setPostTitle("");
      setPostBody("");
      //navigate to home page after submission
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  //to edit a post
  const handleEditPost = async (id) => {
    const date = format(new Date(), "MMMM dd yyyy pp");
    const editedPost = {
      id,
      timestamp: date,
      title: editTitle,
      body: editBody,
    };
    try {
      const response = await api.put(`/edit/${id}`, editedPost);
      //search for the post that matches the id
      const allPosts = posts.map((post) =>
        post.id === id ? { ...response.data } : post
      );
      setPosts(allPosts);
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeletePost = async (id) => {
      try {
             api.delete(`/delete/${id}`);
              const allPosts = posts.filter((post) => post.id !== id);
              setPosts(allPosts);
              navigate('/');
      } catch(err) {
        console.log(err.message);
      }
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Layout search={search} setSearch={setSearch} />}
        >
          <Route index element={<Home posts={searchResults} />} />
          <Route path="post">
            <Route
              index
              element={
                <NewPost
                  handleNewPost={handleNewPost}
                  postTitle={postTitle}
                  setPostTitle={setPostTitle}
                  postBody={postBody}
                  setPostBody={setPostBody}
                />
              }
            />
            <Route
              path=":id"
              element={
                <PostPage posts={posts} handleDeletePost={handleDeletePost} />
              }
            />
          </Route>
          <Route
            path="edit/:id"
            element={
              <EditPost
                posts={posts}
                handleEditPost={handleEditPost}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editBody={editBody}
                setEditBody={setEditBody}
              />
            }
          />
          <Route path="about" element={<About />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route
            path="sign-up"
            element={
              <SignUp
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            }
          />
          <Route
            path="login"
            element={
              <Login email={email} setEmail={setEmail} password={password}
              setPassword={setPassword}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
