import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import EditImage from "../img/edit.png"; // Ensure this path is correct
import DeleteImage from "../img/delete.png"; // Ensure this path is correct

const Single = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to load the post.");
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this post?");
      if (!confirmDelete) return;

      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Failed to delete the post.");
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || ""; // Add a fallback for empty content
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="single">
      <div className="content">
        {post?.img && <img src={`${post.img}`} alt="post cover" />} {/* Check if img exists */}
        <div className="user">
          {post?.userImg && <img src={post.userImg} alt="user" />} {/* Check if userImg exists */}
          <div className="info">
            <span>{post?.username}</span> {/* Check if username exists */}
            <p>Posted {moment(post?.date).fromNow()}</p> {/* Check if date exists */}
          </div>
          {currentUser && currentUser.username === post?.username && ( // Check if currentUser exists and matches post author
            <div className="edit">
              <Link to={`/write?edit=${postId}`} state={post}>
                <img src={EditImage} alt="edit" />
              </Link>
              <img onClick={handleDelete} src={DeleteImage} alt="delete" />
            </div>
          )}
        </div>
        <h1>{post?.title}</h1> {/* Check if title exists */}
        <p><i>"{getText(post?.desc)}"</i></p> {/* Check if desc exists */}
        {/* Additional post content goes here */}
      </div>
      <Menu cat={post?.cat} /> {/* Check if category exists */}
    </div>
  );
};

export default Single;
