"use client";

import React from "react";

import Image from "next/image";

import classes from "./image-picker.module.css";

const { useRef, useState } = React;

export default function ImagePicker({ name, label }) {
  const [pickedImage, setPickedImage] = useState(null);

  const imageInputRef = useRef();

  function handleImagePick() {
    imageInputRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    setPickedImage(file);

    const fileReader = new FileReader();

    // fileReader.onload се извиква когато fileReader.readAsDataURL е завършил
    fileReader.onload = () => {
      // fileReader.result същност е URL към изображението
      // Ако не го направим това file ще е обект със свойства, които не ни вършат работа
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor="image">{label}</label>

      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage ? (
            <Image
              src={pickedImage}
              alt="The food image selected by the user"
              fill
            />
          ) : (
            <p>No image picked yet.</p>
          )}
        </div>

        <input
          ref={imageInputRef}
          required
          id={name}
          type="file"
          name={name}
          className={classes.input}
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />

        <button
          type="button"
          className={classes.button}
          onClick={handleImagePick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
