const express = require("express");
const router = express.Router();
var fetchuser = require("./middleware/fetchuser");
const Notes = require("../models/Notes");
// Route 1: Get All the notes  : GET "/api/notes/fetchallnotes". Login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json();
  res.json(notes);
});
// Route 2: Add a new note  using post : "/api/notes/addnotes". Login required
router.get("/addnotes", fetchuser, async (req, res) => {
  res.json();
  res.json(notes);
});

// route -3 Upadate and delete note using put "/api/notes/addnotes"". login requried
router.put("/upadtenote/id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create a newnote object
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
    //find the  note to be upadted and updatde

    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }

    if (note.user.tostring() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await NOte.findByIdAndUpadte(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal  server error occurs");
  }
});

// route -4  delete note using delete "/api/notes/addnotes"". login requried
router.delete("/deletenote/id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //find the  note to be delete and delete it

    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }

    // allow deletion only if user owns this note
    if (note.user.tostring() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: " note has been deleted ", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal  server error occurs");
  }
});

module.exports = router;
