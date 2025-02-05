  import React, { useState } from "react";
  import NoteContext from "./noteContext";

  const NoteState = (props) => {

    //! FOR LOCAL UNCOMMENT THIS
    // const host = "http://localhost:5000";   
    
    //! FOR CLOUD UNCOMMENT THIS
    const host = "https://inotebook-cloud-backend.onrender.com"
   

    const [notes, setNotes] = useState([]);

    const getNotes = async (id, title, description, tag) => {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const a = await response.json()
      setNotes(a);
    };

    // ADD A NOTE
    const addNote = async (title, description, tag) => {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token"),
        },
        body: JSON.stringify({title,description,tag}),
      });
      const json = await response.json();
      const newNote = json;
      setNotes(notes.concat(newNote)); // Update context state with new note
    };

    // DELETE A NOTE
    const deleteNote = async (id) => {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const newNotes = notes.filter((notes) => notes._id !== id);
      setNotes(newNotes);
    };

    // UPDATE A NOTE
    const updateNote = async (id, title, description, tag) => {
     await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({title,description,tag}),
      });
      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++){
        const element = newNotes[index];
        if(element._id===id){
          newNotes[index].title=title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);

      // const json = await response.json(); 
      // const newNotes = notes.map(note => {
      //   if (note._id === id) {
      //     return { ...note, title, description, tag };
      //   }
      //   return note;
      // });
      // setNotes(newNotes);
    };

    return (
      <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote,getNotes }}>
        {props.children}
      </NoteContext.Provider>
    );
  };

  export default NoteState;
