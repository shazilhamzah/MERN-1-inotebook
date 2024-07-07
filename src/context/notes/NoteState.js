  import React, { useState } from "react";
  import NoteContext from "./noteContext";

  const NoteState = (props) => {
    const host = "http://localhost:5000";
   

    const [notes, setNotes] = useState([]);

    const getNotes = async (id, title, description, tag) => {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4OTRmNDhhOWI0ZjM4ZDQ2NWM2MTk4In0sImlhdCI6MTcyMDI3NDg4OH0.xHIy_7zlSUSD2Nn1oGNl3_dYE2qqy_ORp1golL0qy0M",
        },
      });
      const a = await response.json()
      console.log(a);
      setNotes(a);
    };

    // ADD A NOTE
    const addNote = async (title, description, tag) => {
      console.log("Adding a new Note");
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4OTRmNDhhOWI0ZjM4ZDQ2NWM2MTk4In0sImlhdCI6MTcyMDI3NDg4OH0.xHIy_7zlSUSD2Nn1oGNl3_dYE2qqy_ORp1golL0qy0M",
        },
        body: JSON.stringify({title,description,tag}),
      });
      const json = await response.json();
      const newNote = json;
      // const newNote = {
      //   title: title,
      //   description: description,
      //   tag: tag,
      // };
      setNotes(notes.concat(newNote)); // Update context state with new note
    };

    // DELETE A NOTE
    const deleteNote = async (id) => {
      console.log("Deleting the note with id ", id);
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4OTRmNDhhOWI0ZjM4ZDQ2NWM2MTk4In0sImlhdCI6MTcyMDI3NDg4OH0.xHIy_7zlSUSD2Nn1oGNl3_dYE2qqy_ORp1golL0qy0M",
        },
      });
      const newNotes = notes.filter((notes) => notes._id !== id);
      setNotes(newNotes);
    };

    // UPDATE A NOTE
    const updateNote = async (id, title, description, tag) => {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4OTRmNDhhOWI0ZjM4ZDQ2NWM2MTk4In0sImlhdCI6MTcyMDI3NDg4OH0.xHIy_7zlSUSD2Nn1oGNl3_dYE2qqy_ORp1golL0qy0M",
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
