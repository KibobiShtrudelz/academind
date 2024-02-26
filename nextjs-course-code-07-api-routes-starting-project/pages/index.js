import { useRef, useState } from "react";

export default function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailRef = useRef();
  const feedbackRef = useRef();

  function handleSubmitForm(event) {
    event.preventDefault();

    const enteredEmail = emailRef?.current.value;
    const enteredFeedback = feedbackRef?.current.value;

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail, text: enteredFeedback }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function handleLoadFeedback() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback));
  }

  return (
    <div>
      <h1>The Home Page</h1>

      <form onSubmit={handleSubmitForm}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input ref={emailRef} type="email" id="email" />
        </div>

        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea ref={feedbackRef} id="feedback" rows="5"></textarea>
        </div>

        <button>Send Feedback</button>
      </form>

      <hr />

      <button onClick={handleLoadFeedback}>Get Feedback</button>

      <ul>
        {feedbackItems?.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
