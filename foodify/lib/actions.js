"use server"; // Слагаме тази директива най-горе казваме на Next, че всички долу описани функции са сървърни екшъни!

import { redirect } from "next/navigation";

import { saveMeal } from "./meals";

export async function shareMeal(formData) {
  // "use server";
  // "use server" директивата създава, т.нар. server action. Това е функция, която се изпълнява САМО на сървъра!
  // И тъй като това е сървърна функция трябва да е асинхронна.
  // Такъв server action може да се ползва, само ако компонента НЕ е клиентски!

  const meal = {
    title: formData.get("title"),
    image: formData.get("image"),
    creator: formData.get("name"),
    summary: formData.get("summary"),
    creator_email: formData.get("email"),
    instructions: formData.get("instructions"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    throw new Error("Invalid input!");
  }

  await saveMeal(meal);

  redirect("/meals");
}

function isInvalidText(text) {
  return !text || text.trim() === "";
}
