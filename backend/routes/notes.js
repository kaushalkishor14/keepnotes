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
// Route 1: Add a new note  using post : "/api/notes/addnotes". Login required
router.get("/addnotes", fetchuser, async (req, res) => {
  res.json();
  res.json(notes);
});

module.exports = router;
