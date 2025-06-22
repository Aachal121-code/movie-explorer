// src/components/CommentsPage.js
import React, { useState } from "react";
import "./CommentsPage.css";

function CommentsPage() {
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

    const handlePost = () => {
        if (commentText.trim()) {
            setComments([
                {
                    id: Date.now(),
                    username: "User123",
                    text: commentText.trim()
                },
                ...comments
            ]);
            setCommentText("");
        }
    };

    return (
        <div className="comments-page">
            <h2>Comments Section</h2>

            <div className="comment-form">
                <input
                    type="text"
                    placeholder="Write your comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <button onClick={handlePost}>Post Comment</button>
            </div>

            <div className="comments-list">
                {comments.length === 0 && <p className="no-comments">No comments yet.</p>}
                {comments.map((comment) => (
                    <div key={comment.id} className="comment-box">
                        <strong>{comment.username}</strong>
                        <p>{comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentsPage;
