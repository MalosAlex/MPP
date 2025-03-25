"use client";
import { createContext, useContext, useState, ReactNode} from 'react';

export type Character = {
    name: string;
    mediaOfOrigin: string;
    age: number;
    typeOfMedia: string;
    typeOfCharacter: string;
    backstory: string;
    image: string; // images/image.png
  }

// the context type, having the list and the add function
type CharacterContextType = {
  characters: Character[];
  addCharacter: (character: Character) => void;
  removeCharacter: (name: string) => void;
  updateCharacter: (updatedCharacter: Character) => void;
};

// creating the context
const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({children}: {children: ReactNode}){

    // fill the list with predifined characters
    const [characters, setCharacters] = useState<Character[]>([
        {
            name: "Cloud Strife",
            mediaOfOrigin: "Final Fantasy VII",
            age: 21,
            typeOfMedia: "Video Game",
            typeOfCharacter: "Protagonist",
            backstory: "The main character of all of the ff7 games, along the story we experience Cloud's identity crisis which is also the main theme of the games",
            image: "images/cloud.png"
        },
        {
            name: "Tifa Lockhart",
            mediaOfOrigin: "Final Fantasy VII",
            age: 20,
            typeOfMedia: "Video Game",
            typeOfCharacter: "Confidant",
            backstory: "Tifa is considered to be the most important character in the game as she holds the team together, by helping Cloud remain sane and find himself again.",
            image: "images/tifa.png"
        },
        {
            name: "Sephiroth",
            mediaOfOrigin: "Final Fantasy VII",
            age: 27,
            typeOfMedia: "Video Game",
            typeOfCharacter: "Antagonist",
            backstory: "Considered one of the best villains ever, he is a master at manipulating Cloud and extremely strong. His main goal is to attain godhood by destroying the planet in revenge for his mother.",
            image: "images/sephiroth.png"
        },
        {
            name: "Lee Chandler",
            mediaOfOrigin: "Manchaster by the sea",
            age: 21,
            typeOfMedia: "Movie",
            typeOfCharacter: "Protagonist",
            backstory: "The character who the story is revolved around, the story focusing on the grief he faces after an accident cause by him leading to the death of his wife and children.",
            image: "images/manchester.png"
        },
        {
            name: "Paul Atreides",
            mediaOfOrigin: "Dune",
            age: 25,
            typeOfMedia: "Books",
            typeOfCharacter: "Protagonist",
            backstory: "The main character of the original series. The action revolves around him taking the planet back from the family that killed his family, while becoming the legendary Lisan al-gaib",
            image: "images/dune.png"
        },
        {
            name: "Saul Goodman",
            mediaOfOrigin: "Breaking Bad",
            age: 49,
            typeOfMedia: "Series",
            typeOfCharacter: "Deuteragonist",
            backstory: "The second most important character in the Breaking Bad show, getting his own spin off. He is a man obsessed with being recognised as a real lawyer and being useful through any way.",
            image: "images/saul.png"
        }
    ])

    const addCharacter = (character : Character) => {
        
        setCharacters((prev) => [...prev, character]);
    }

    const removeCharacter = (name: string) => {
        setCharacters((prev) => prev.filter(char => char.name !== name));
    };

    const updateCharacter = (updatedCharacter: Character) => {
        setCharacters((prev) =>
          prev.map((char) =>
            char.name === updatedCharacter.name ? { ...char, ...updatedCharacter } : char
          )
        );
      };

    return (
        <CharacterContext.Provider value={{characters, addCharacter,removeCharacter,updateCharacter}}>
            {children}
        </CharacterContext.Provider>
    );
}

export function useCharacters(){
    const context = useContext(CharacterContext);
    if(!context){
        throw new Error("useCharacters must be used within a CharacterProvider")
    }
    return context
}


