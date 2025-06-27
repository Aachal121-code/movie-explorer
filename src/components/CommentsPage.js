import React, { useState, useEffect, useRef } from "react";
import "./CommentsPage.css";

function CommentsPage({ user }) {
  const LOCAL_STORAGE_KEY = "comments-data";
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyingToUser, setReplyingToUser] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setComments(parsed);
      } catch (err) {
        console.error("Failed to parse comments:", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(comments));
  }, [comments]);

  const handlePost = () => {
    if (!user || !commentText.trim()) return;

    if (replyingTo) {
      setComments(prev =>
        prev.map(comment => {
          if (comment.id === replyingTo) {
            return {
              ...comment,
              replies: [
                ...(comment.replies || []),
                {
                  id: Date.now(),
                  username: user,
                  text: commentText.trim(),
                  likes: 0,
                  likedByUser: false,
                },
              ],
            };
          }
          return comment;
        })
      );
      setReplyingTo(null);
      setReplyingToUser("");
    } else {
      setComments([
        {
          id: Date.now(),
          username: user,
          text: commentText.trim(),
          likes: 0,
          likedByUser: false,
          replies: [],
        },
        ...comments,
      ]);
    }

    setCommentText("");
  };

  const handleLike = (id) => {
    setComments(comments.map(comment => {
      if (comment.id === id) {
        const liked = !comment.likedByUser;
        return {
          ...comment,
          likes: liked ? comment.likes + 1 : comment.likes - 1,
          likedByUser: liked,
        };
      }
      return comment;
    }));
  };

  const handleLikeReply = (commentId, replyId) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === replyId
                  ? {
                      ...reply,
                      likedByUser: !reply.likedByUser,
                      likes: reply.likedByUser ? reply.likes - 1 : reply.likes + 1,
                    }
                  : reply
              ),
            }
          : comment
      )
    );
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter(c => c.id !== id));
  };

  const handleDeleteReply = (commentId, replyId) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.filter(r => r.id !== replyId),
            }
          : comment
      )
    );
  };

  const handleReply = (commentId, username) => {
    setReplyingTo(commentId);
    setReplyingToUser(username);
    setCommentText(`@${username} `);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const renderReplies = (replies,comment,parentId) => (
    <div className="replies-container">
      {replies.map(reply => (
        <div key={reply.id} className="reply-box">
          <div className="reply-header">
            <strong>{reply.username}</strong>
            <p>{reply.text}</p>
          </div>
          <div className="reply-actions">
            <button
              className={`like-btn ${reply.likedByUser ? "liked" : ""}`}
              onClick={() => handleLikeReply(parentId, reply.id)}
            >
              ❤️ {reply.likes}
            </button>
            <button
                className="reply-btn"
                onClick={() => handleReply(comment.id, comment.username)}
              >
                💬 Reply
              </button>
            {reply.username === user && (
              <button
                className="delete-btn"
                onClick={() => handleDeleteReply(parentId, reply.id)}
              >
                🗑
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="comments-page-container">
      <div className="comments-list">
        {comments.length === 0 && <p className="no-comments">No comments yet.</p>}
        {comments.map((comment) => (
          <div key={comment.id} className="comment-box">
            <div className="comment-header">
              <strong>{comment.username}</strong>
              <p>{comment.text}</p>
            </div>

            <div className="comment-footer">
              <button
                className={`like-btn ${comment.likedByUser ? "liked" : ""}`}
                onClick={() => handleLike(comment.id)}
              >
                ❤️ {comment.likes}
              </button>
              <button
                className="reply-btn"
                onClick={() => handleReply(comment.id, comment.username)}
              >
                💬 Reply
              </button>
              {comment.username === user && (
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  🗑 Delete
                </button>
              )}
            </div>

            {comment.replies && comment.replies.length > 0 &&
              renderReplies(comment.replies, comment.id)}
          </div>
        ))}
      </div>

      <div className="comment-input-bar">
        <input
          type="text"
          ref={inputRef}
          placeholder={
            replyingTo ? `Replying to @${replyingToUser}` : "Write a comment..."
          }
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={!user}
        />
        <button onClick={handlePost} disabled={!user}>Post</button>
      </div>
    </div>
  );
}

export default CommentsPage;
