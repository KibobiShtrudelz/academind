import fs from "node:fs";

import xss from "xss";
import slugify from "slugify";
import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error("Failed to fetch meals");
  return db.prepare("SELECT * FROM meals").all();
}

export async function getMeal(slug) {
  // За да се ;редпазим от XXS атаки, използваме = ? вместо ${slug}!
  // Затова ползваме .get(slug). Под капака библиотеката ни защитава от SQL инжекции.
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extention = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extention}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals 
      (slug, title, image, creator, summary, creator_email, instructions) 
    VALUES (
      @slug,
      @title,
      @image,
      @creator,
      @summary,
      @instructions,
      @creator_email
    )
  `
  ).run(meal);
}
