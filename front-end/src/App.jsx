import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";
import AllPosts from './Components/AllPosts';
import AddPost from './Components/AddPost';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import Register from './Components/Register';
import Login from './Components/Login';
import Error from './Components/Error';

import { getPosts } from './utils/APICalls';

function App() {

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const getPostsHandler = async () => {
    const res = await getPosts();
    if (res?.error) {
      setError([{ msg: res.error.message }]);
    } else {
      setError("");
    }
    const postResults = res?.posts ? res.posts : [];
    setPosts(postResults);
  }

  useEffect(() => {
    getPostsHandler();
  }, []);

  const submitPost = async post => {
    try {
      await axios.post(`${process.env.REACT_APP_URL}/posts`, post);
    }
    catch (e) {
      setError(e);
    }
    finally {
      await getPostsHandler();
    }
  }

  return (
    <Router>
      <main className="App">
        <Header user={user} setUser={setUser} />
        <br />
        <Routes>
          <Route path="/" element={
            <div className="container">
              <div className="row">
                <div className="col">
                  <AddPost submitPost={submitPost} user={user} />
                </div>
              </div>
              {error.length
                ?
                <Error errors={error} />
                : (posts.length
                  ?
                  <AllPosts posts={posts} />
                  :
                  <h3>Loading...</h3>)}
            </div>
          } />
          <Route path="/register" element={
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <Register setUser={setUser} />
                </div>
              </div>
            </div>
          } />
          <Route path="/login" element={
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <Login setUser={setUser} />
                </div>
              </div>
            </div>
          } />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
