import React, { useContext} from "react";
import NoteContext from "../context/notes/noteContext";

export const NoteItem = (props) => {
  const { note,updateNote1 } = props;
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const handleDeleteClick=()=>{
    deleteNote(note._id);
    props.showAlert(" Deleted successfully","success")
  }

  return (
    <>
      
      <div className="col-md-3 my-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <i
              className="fa-solid fa-trash"
              onClick={() => handleDeleteClick()}
            ></i>
            <i
              className="fa-regular fa-pen-to-square mx-3"
              onClick={()=>
                {updateNote1(note)}
              }
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};
