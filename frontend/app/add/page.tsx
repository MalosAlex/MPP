"use client";
import { useEffect, useState } from "react";
import { useCharacters } from "../types/character";
import { useRouter } from "next/navigation";

export default function Home() {
  const { characters, addCharacter } = useCharacters();
  const router = useRouter();

  // State and validation functions remain the same as in your original code
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [media, setMedia] = useState("");
  const [mediaError, setMediaError] = useState("");
  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState("");
  const [backstory, setStory] = useState("");
  const [storyError, setStoryError] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [characterType, setCharType] = useState("");
  const [image, setImage] = useState("");
  const [dialogueOpen, setDialogueOpen] = useState(false);

  const validateName = () => {
    if (!name) {
      setNameError("Name cannot be empty");
    } else {
      setNameError("");
    }
  };

  const validateMedia = () => {
    if (!media) {
      setMediaError("Media or origin cannot be empty");
    } else {
      setMediaError("");
    }
  };

  const validateAge = () => {
    if (!age) {
      setAgeError("Age cannot be empty");
    } else if (isNaN(Number(age))) {
      setAgeError("Age must be a number");
    } else {
      setAgeError("");
    }
  };

  const validateStory = () => {
    if (!backstory) {
      setStoryError("Backstory cannot be empty");
    } else {
      setStoryError("");
    }
  };

  const handleSubmit = () => {
    validateName();
    validateMedia();
    validateAge();
    validateStory();

    if (!nameError && !mediaError && !ageError && !storyError) {
      // Use a default image if none is selected
      const selectedImage = image || "default.png";

      addCharacter({
        name: name,
        mediaOfOrigin: media,
        age: Number(age),
        typeOfMedia: mediaType,
        typeOfCharacter: characterType,
        backstory: backstory,
        image: `/images/${selectedImage}`,
      });

      setDialogueOpen(true);
      
      // Navigate to select page after a short delay
      setTimeout(() => {
        router.push("../select");
      }, 500);
    }
  };

  return (
    <div>
      <div className="Add">
        <label>
          Name:
          <input type="text" onChange={(e) => setName(e.target.value)} onBlur={validateName} className="TextField" />
          {nameError && <p className="Error">{nameError}</p>}
        </label>

        <label>
          Media of Origin:
          <input type="text" onChange={(e) => setMedia(e.target.value)} onBlur={validateMedia} className="TextField" />
          {mediaError && <p className="Error">{mediaError}</p>}
        </label>

        <label>
          Age:
          <input type="text" onChange={(e) => setAge(e.target.value)} onBlur={validateAge} className="TextField" />
          {ageError && <p className="Error">{ageError}</p>}
        </label>

        <label>
          Type of Media:
          <select value={mediaType} onChange={(e) => setMediaType(e.target.value)} className="DropDown">
            <option value="">Select Media Type</option>
            <option value="Video Game">Video Game</option>
            <option value="Movie">Movie</option>
            <option value="Books">Book</option>
            <option value="Series">Series</option>
          </select>
        </label>

        <label>
          Type of Character:
          <select value={characterType} onChange={(e) => setCharType(e.target.value)} className="DropDown">
            <option value="">Select Character Type</option>
            <option value="Protagonist">Protagonist</option>
            <option value="Antagonist">Antagonist</option>
            <option value="Deuteragonist">Deuteragonist</option>
            <option value="Confidant">Confidant</option>
            <option value="Love Option">Love Option</option>
          </select>
        </label>

        <label>
          Backstory:
          <textarea className="TextField" onChange={(e) => setStory(e.target.value)} onBlur={validateName}></textarea>
          {storyError && <p className="Error">{storyError}</p>}
        </label>

        <label>
          Image:
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files ? e.target.files[0].name : "")} />
        </label>
      </div>
      <button className="ConfirmButton" onClick={handleSubmit}>Confirm</button>
      {dialogueOpen && (
        <div className="dialogue">
          <p>Character added successfully!</p>
          <button onClick={() => window.location.href = "../select"}>OK</button>
        </div>
      )}
    </div>
  );
}
