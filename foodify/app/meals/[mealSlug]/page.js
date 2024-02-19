import Image from "next/image";
import { notFound } from "next/navigation";

import { getMeal } from "@/lib/meals";

import classes from "./page.module.css";

export default async function MealSlugPage({ params }) {
  const meal = await getMeal(params.mealSlug);

  if (!meal) {
    // notFound() е функция от Next, която връща най-близката Error или 404 страница
    notFound();
  }

  // \n е игнорирано от dangerouslySetInnerHTML затова ги заменяме с <br /> tag, който браузъра чете
  // и рендерира правилно като нов ред
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>

        <div className={classes.headerText}>
          <h1>{meal.title}</h1>

          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>

          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>

      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        />
      </main>
    </>
  );
}
