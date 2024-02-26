import { useState } from "react";

import { extractFeedback, buildFeedbackPath } from "../api/feedback";

export default function FeedbackPage({ feedbackItems }) {
  const [feedbackData, setFeedbackData] = useState();

  function handleLoadFeedback(id) {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data));
  }

  return (
    <>
      {feedbackData && <p>{feedbackData.feedback.email}</p>}

      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button
              type="button"
              onClick={handleLoadFeedback.bind(null, item.id)}
            >
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

// Pre-rendering a page using getStaticProps
export async function getStaticProps() {
  return {
    props: { feedbackItems: extractFeedback(buildFeedbackPath()) },
  };
}
