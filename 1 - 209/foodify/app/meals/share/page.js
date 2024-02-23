"use client";

import * as ReactDOM from "react-dom";

import ImagePicker from "@/components/meals/image-picker/image-picker.js";

import { shareMeal } from "@/lib/actions.js";

import MealsFormSubmit from "@/components/meals/meals-form-submit.js";

import classes from "./page.module.css";

const { useFormState } = ReactDOM;

export default function ShareMealPage() {
  const [state, formAction] = useFormState(shareMeal, {
    message: null,
  }); // Служи за да се вземат стойностите на полетата от формата, която бива изпълнена със СЪРВЪР ЕКШЪН!

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>

        <p>Or any other meal you feel needs sharing!</p>
      </header>

      <main className={classes.main}>
        <form
          className={classes.form}
          action={formAction} // Назначаваме formAction тук, защото вече подаваме shareMeal на useFormState. useFormState работи с формите (менажира стейта на формата), които ползват server action-и!
          // action={shareMeal} // Тъй като shareMeal е сървърна функция трябва да я назначин на "action" атрибута на формата! Въпреки, че е сървърна функция мога да я ползвам в клиентски компонент така, импортната от друг файл!
        >
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>

            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            />
          </p>

          <ImagePicker name="image" label="Chose an image" />

          {state.message && <p className={classes.error}>{state.message}</p>}

          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
