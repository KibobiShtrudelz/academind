import { useRef } from "react";

import classes from "./newsletter-registration.module.css";

export default function NewsletterRegistration() {
  const inputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: inputRef?.current.value }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>

      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={inputRef}
            id="email"
            type="email"
            placeholder="Your email"
            aria-label="Your email"
          />

          <button>Register</button>
        </div>
      </form>
    </section>
  );
}
