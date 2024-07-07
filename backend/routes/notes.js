const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//? FETCHING ALL NOTES USING: GET "/api/notes/fetchallnotes" - LOGIN REQUIRED
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // CATCHING ERROR
    console.error(error.message);
    res.status(500).send("Some error occured!");
  }
});

//? ADDING NOTES USING: POST "/api/notes/addnote" - LOGIN REQUIRED
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title must be atleast 3 characters.").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // DETECTING INVALID INPUT
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      // CREATING A NOTE
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      console.log("Success checkpoint 1");
      res.json(savedNote);
    } catch (error) {
      // CATCHING ERROR
      console.error(error.message);
      res.status(500).send("Some error occured!");
    }
  }
);

//? UPDATING NOTES USING: POST "/api/notes/updatenote/:id" - LOGIN REQUIRED
router.post("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // FINDING THE NOTE TO BE UPDATED
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found!");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Note not allowed!");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured!");
  }
});

//? DELETING NOTES USING: POST "/api/notes/deletenote/:id" - LOGIN REQUIRED
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // FINDING THE NOTE TO BE UPDATED
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found!");
    }

    // ALLOWING DELETION IF USER OWNS THIS NOTE
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Note not allowed!");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Deleted Successfully!", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured!");
  }
});

module.exports = router;
