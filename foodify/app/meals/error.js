"use client";

// Next подава "error" като аргумент на компонента, от който можем да достъпим различни неща, като
// message и т.н.
export default function MealsErrorPage() {
  return (
    <main className="error">
      <h1>Error occurred!</h1>

      <p>Failed to create meal. Go home hungry!</p>
    </main>
  );
}
