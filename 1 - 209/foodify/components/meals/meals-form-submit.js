"use client";

import * as ReactDOM from "react-dom";

const { useFormStatus } = ReactDOM;

export default function MealsFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
}
