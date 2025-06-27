import React, { useState, useEffect, useRef } from "react";
import "./CommentsPage.css";

function CommentsPage({ user }) {
  const LOCAL_STORAGE_KEY = "comments-data";
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const isMobile = window.innerWidth <= 768;
  const longPressTimer = useRef(null);
  const hasMounted = useRef(false);

  // Load once from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setComments(parsed);
        }
      } catch (err) {
        console.error("Failed to parse comments:", err);
      }
    }
  }, []);

  // Save to localStorage when comments update
  useEffect(() => {
    if (hasMounted.current) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(comments));
    } else {
      hasMounted.current = true;
    }
  }, [comments]);

  const handlePost = () => {
    if (!user) {
      alert("You must be logged in to post a comment.");
      return;
    }

    if (commentText.trim()) {
      setComments([
        {
          id: Date.now(),
          username: user,
          text: commentText.trim(),
        },
        ...comments,
      ]);
      setCommentText("");
    }
  };


  const handleDelete = () => {
    setComments(comments.filter((c) => c.id !== deleteTarget));
    setDeleteTarget(null);
  };

  const handleTouchStart = (id) => {
    longPressTimer.current = setTimeout(() => {
      setDeleteTarget(id);
    }, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer.current);
  };

  const handleClick = (id) => {
    if (!isMobile) {
      setDeleteTarget(id);
    }
  };

  return (
    <div className="comments-page-container">
      <div className="comments-list">
        {comments.length === 0 && <p className="no-comments">No comments yet.</p>}
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="comment-box"
            onClick={() => handleClick(comment.id)}
            onTouchStart={() => handleTouchStart(comment.id)}
            onTouchEnd={handleTouchEnd}
          >
            <strong>{comment.username}</strong>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
        
      <div className="comment-input-bar">
        <input
          type="text"
          placeholder={user ? "Write a comment..." : "Login to comment"}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={!user}
        />
        <button onClick={handlePost} disabled={!user}>Post</button>
      </div>

      {deleteTarget && (
        <div className="delete-popup">
          <div className="delete-box">
            <p>Delete this comment?</p>
            <button onClick={handleDelete}>Yes, Delete</button>
            <button onClick={() => setDeleteTarget(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentsPage;
