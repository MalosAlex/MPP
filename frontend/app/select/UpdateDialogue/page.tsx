"use client"

import { useState, useEffect } from "react";
import { useCharacters } from "../../types/character"; // Assuming you're using context for the characters

interface UpdateDialogueProps {
  character: any; // Pass the entire character object here
  onConfirm: (updatedCharacter: any) => void;
  onClose: () => void;
}

const UpdateDialogue = ({ character, onConfirm, onClose }: UpdateDialogueProps) => {
  const [name, setName] = useState(character.name);
  const [mediaOfOrigin, setMediaOfOrigin] = useState(character.mediaOfOrigin);
  const [age, setAge] = useState(character.age.toString());
  const [backstory, setBackstory] = useState(character.backstory);

  console.log("Rendering UpdateDialogue", character);

  useEffect(() => {
    // Reset form when the character changes
    setName(character.name);
    setMediaOfOrigin(character.mediaOfOrigin);
    setAge(character.age.toString());
    setBackstory(character.backstory);
  }, [character]); // This effect runs whenever `character` changes

  const handleUpdate = () => {
    if (name && mediaOfOrigin && age && backstory) {
      onConfirm({
        ...character, // Preserve the existing properties
        name,
        mediaOfOrigin,
        age: Number(age),
        backstory,
      });
    }
  };

  return (
    <div className="UpdateDialogue">
      <h2>Update Character</h2>
      <div className="form-row">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Media of Origin:</label>
        <input type="text" value={mediaOfOrigin} onChange={(e) => setMediaOfOrigin(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Age:</label>
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Backstory:</label>
        <textarea value={backstory} onChange={(e) => setBackstory(e.target.value)} />
      </div>
      <div className="buttons">
        <button onClick={handleUpdate}>Update</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default UpdateDialogue;
