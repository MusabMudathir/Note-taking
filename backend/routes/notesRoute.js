const express = require("express");
const Notes = require("../models/Notes");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const notes = await Notes.find();
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
  }
});

router.post("/create", async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const note = await Notes.create({ title, content });
    res.status(201).json({ message: "note created", note });
  } catch (error) {
    console.log(error);
  }
});

router.post("/update/:id", async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const note = await Notes.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    res.status(200).json({ message: "note updated", note });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const note = await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "note deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
