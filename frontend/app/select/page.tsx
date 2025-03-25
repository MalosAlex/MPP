"use client"

import { useState } from "react";
import { useCharacters } from "../types/character";
import CharacterDialogue from "./deleteDialogue/page"; // Your existing delete dialogue
import UpdateDialogue from "./UpdateDialogue/page"; // Your update dialogue
import { useEffect } from "react";

export default function Home() {
  const { characters, removeCharacter, updateCharacter } = useCharacters();
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [updateDialogueOpen, setUpdateDialogueOpen] = useState(false); // State for update dialogue
  const [selectedCharacter, setSelectedCharacter] = useState<any | null>(null); // Store the character object
  const [selectedCharacterName, setSelectedCharacterName] = useState<string | null>(null); // Store the character name
  const [filter, setFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredCharacters = characters.filter((char) => (filter ? char.typeOfMedia === filter : true)).sort((a, b) => {
    if (!sortBy) return 0;
    if (sortBy === "Age") return sortOrder === "asc" ? Number(a.age) - Number(b.age) : Number(b.age) - Number(a.age);
    if (sortBy === "Name") return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    return 0;
  });

  // Handle delete action
  const handleDeleteCharacter = () => {
    if (selectedCharacterName) {
      removeCharacter(selectedCharacterName); // Pass the character name to remove
      setDialogueOpen(false);
    }
  };

  // Handle update action
  const handleUpdateCharacter = (updatedCharacter: any) => {
    if (updatedCharacter) {
      updateCharacter(updatedCharacter); // Update the character with the new details
      setUpdateDialogueOpen(false); // Close the update dialogue after updating
    }
  };

  return (
    <div>
      <div className="FilterSortContainer">
        {/* Filters and sorters */}
        <select onChange={(e) => setFilter(e.target.value)} defaultValue="">
          <option value="">All</option>
          <option value="Video Game">Video Game</option>
          <option value="Movie">Movie</option>
          <option value="Books">Books</option>
          <option value="Series">Series</option>
        </select>

        <select onChange={(e) => setSortBy(e.target.value)} defaultValue="">
          <option value="">None</option>
          <option value="Age">Age</option>
          <option value="Name">Name</option>
        </select>

        <button onClick={() => setSortOrder("asc")}>Ascending</button>
        <button onClick={() => setSortOrder("desc")}>Descending</button>
      </div>

      <ul>
        {filteredCharacters.map((char, index) => (
          <li key={index} className="Character">
            <img src={char.image} alt={char.name} />
            <div className="CharacterDetails">
              <h2>{char.name}</h2>
              <p><strong>Media of Origin:</strong> {char.mediaOfOrigin}</p>
              <p><strong>Age:</strong> {char.age}</p>
              <p><strong>Type:</strong> {char.typeOfCharacter}</p>
              <p>{char.backstory}</p>
              <button 
                onClick={() => {
                  setSelectedCharacterName(char.name); // Store the character name
                  setSelectedCharacter(char); // Store the full character object
                  setDialogueOpen(true); // Open the delete dialogue
                }} 
                className="DeleteButton"
              >
                Delete
              </button>
              <button 
                onClick={() => {
                  console.log("Opening update dialogue")
                  setSelectedCharacterName(char.name); // Store the character name
                  setSelectedCharacter(char); // Store the full character object
                  setUpdateDialogueOpen(true); // Open update dialogue
                }} 
                className="UpdateButton"
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Delete Dialogue */}
      {dialogueOpen && selectedCharacterName && (
        <CharacterDialogue
          characterName={selectedCharacterName} // Pass the character name for deletion
          onConfirm={handleDeleteCharacter}
          onClose={() => setDialogueOpen(false)}
        />
      )}

      {/* Update Dialogue */}
      {updateDialogueOpen && selectedCharacter && (
        console.log("OSKIV"),
        <UpdateDialogue
          character={selectedCharacter} // Pass the full character object for update
          onConfirm={handleUpdateCharacter}
          onClose={() => setUpdateDialogueOpen(false)}
        />
      )}
    </div>
  );
}
