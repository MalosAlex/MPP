"use client"

import { useState } from "react";

interface CharacterDialogueProps {
  characterName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function CharacterDialogue({ characterName, onConfirm, onClose }: CharacterDialogueProps) {
  const [input, setInput] = useState("");

  return (
    <div className="DialogueOverlay">
      <div className="DialogueBox">
        <h2>Delete Character</h2>
        <p>Type "<strong>{characterName}</strong>" to confirm deletion:</p>
        <input
          type="text"
          color="white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="DialogueInput"
        />
        <div className="DialogueActions">
          <button onClick={onClose} className="CancelButton">Cancel</button>
          <button
            onClick={() => input === characterName && onConfirm()}
            disabled={input !== characterName}
            className="ConfirmDeleteButton">Delete
          </button>
        </div>
      </div>
    </div>
  );
}
