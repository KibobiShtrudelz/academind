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
