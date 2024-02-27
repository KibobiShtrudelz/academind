import { useState, useEffect } from "react";

import NewComment from "./new-comment";
import CommentList from "./comment-list";

import classes from "./comments.module.css";

export default function Comments({ eventId }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function handleAddComment(commentData) {
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log("data >>>", data));
  }

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => setComments(data.comments));
    }
  }, [showComments]);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>

      {showComments && <NewComment onAddComment={handleAddComment} />}

      {showComments && <CommentList items={comments} />}
    </section>
  );
}
