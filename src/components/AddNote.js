import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tags: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tags);
    setNote({title: "", description: "", tags: ""});
    props.showAlert(" Added Successfully","success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1 className="my-3">Add a Note</h1>
      <div className="form my-3">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={3}
              required
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">
              Tags
            </label>
            <input
              type="text"
              className="form-control"
              id="tags"
              name="tags"
              onChange={onChange}
              value={note.tags}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={note.title.length<3 || note.description.length<5}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
