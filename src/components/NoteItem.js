import React, { useContext, useRef } from "react";
import NoteContext from "../context/notes/noteContext";

export const NoteItem = (props) => {
  const { note,updateNote } = props;
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  return (
    <>
      
      <div className="col-md-3 my-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <i
              className="fa-solid fa-trash"
              onClick={() => deleteNote(note._id)}
            ></i>
            <i
              className="fa-regular fa-pen-to-square mx-3"
              onClick={() => updateNote(note)}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};
