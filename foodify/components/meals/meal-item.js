import Link from "next/link";
import Image from "next/image";

import classes from "./meal-item.module.css";

export default function MealItem({ slug, title, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          {/* fill може да се ползва, когато не знаем предварително width & height на снимката */}
          <Image src={image} alt={title} fill />{" "}
        </div>

        <div className={classes.headerText}>
          <h2>{title}</h2>

          <p>by {creator}</p>
        </div>
      </header>

      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>

        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
