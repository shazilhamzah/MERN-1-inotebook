import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const initialNotes = [
    {
      _id: "66894fe3a9b4f38d465c61a0",
      user: "66894f48a9b4f38d465c6198",
      title: "anothernote",
      description: "hahah u are lol",
      tag: "",
      date: "1720274915936",
      __v: 0,
    },
    {
      _id: "66895d407307562e15a5cee97",
      user: "66894f48a9b4f38d465c6198",
      title: "anothernote1",
      description: "this is my note",
      tag: "",
      date: "1720278336157",
      __v: 0,
    },
    // Add other initial notes as needed
  ];

  const [notes, setNotes] = useState(initialNotes);

  // ADD A NOTE
  const addNote = (title, description, tag) => {
    console.log("Adding a new Note");

    // GENERATING A RANDOM NUMBER
    let randomNumber = "";
    for (let i = 0; i < 25; i++) {
      let digit = Math.floor(Math.random() * 10); // Generate a random digit (0-9)
      randomNumber += digit.toString(); // Append the digit to the number string
    }
    const newNote = {
      _id: randomNumber, // Generate a unique ID
      user: "66894f48a9b4f38d465c6198", // Assuming this is fixed for all notes
      title: title,
      description: description,
      tag: tag,
      date: Date.now().toString(), // Use current timestamp
      __v: 0,
    };
    setNotes(notes.concat(newNote)); // Update context state with new note
  };

  // DELETE A NOTE
  const deleteNote = (id) => {
    console.log("Deleting the note with id ", id);
    const newNotes = notes.filter((initialNotes) => initialNotes._id !== id);
    setNotes(newNotes);
  };

  // UPDATE A NOTE
  const updateNote = () => {
    // Implement update functionality if needed
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
