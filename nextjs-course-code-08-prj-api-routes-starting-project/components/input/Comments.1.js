import { useState, useEffect } from "react";
import NewComment from "./new-comment";
import CommentList from "./comment-list";
import classes from "./comments.module.css";

export default function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);

    // if (!showComments) {
    //   fetch(`/api/newsletter/comments/${eventId}`, {
    //     method: "GET",
    //   })
    //     .then((response) => response.json())
    //     .then((data) => console.log("data >>>", data));
    // }
  }

  function handleAddComment(commentData) {
    fetch(`/api/newsletter/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log("data >>>", data));
  }

  useEffect(() => {
    if (showComments) {
      fetch(`/api/newsletter/comments/${eventId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => console.log("data >>>", data));
    }
  }, []);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>

      {showComments && <NewComment onAddComment={handleAddComment} />}

      {showComments && <CommentList />}
    </section>
  );
}
