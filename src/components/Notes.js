import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import { NoteItem } from "./NoteItem";
import AddNote from "./AddNote";

export const Notes = () => {
  const context = useContext(NoteContext);
  const { notes } = context;
  return (
    <div className="my-3 row mx-3">
      <AddNote />
      <h1 className="my-3">Your Notes</h1>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
    </div>
  );
};
