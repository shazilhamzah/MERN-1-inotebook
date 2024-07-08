import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import { NoteItem } from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

export const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, updateNote } = context;
  const s = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    }
    else{
      s("/login")
    }
  });
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etags: "" });

  const handleClick = (e) => {
    e.preventDefault();
    updateNote(note.id, note.etitle, note.edescription, note.etags);
    ref.current.click();
    props.showAlert(" Edited Successfully","success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote1 = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id || "",
      etitle: currentNote.title || "",
      edescription: currentNote.description || "",
      etags: currentNote.tags || ""
    });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                  required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etags" className="form-label">
                    Tags
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etags"
                    name="etags"
                    value={note.etags}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.etitle.length<3 || note.edescription.length<5}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="my-3 row mx-3">
        <AddNote showAlert={props.showAlert}/>
        <h1 className="my-3">Your Notes</h1>
        
        {notes.length===0 && <div className="container mx-1 my-3">No Notes to Display!</div>}
        
        {notes.map((note) => (
          <NoteItem key={note._id} showAlert={props.showAlert} updateNote1={updateNote1} note={note} />
        ))}
      </div>
    </>
  );
};
