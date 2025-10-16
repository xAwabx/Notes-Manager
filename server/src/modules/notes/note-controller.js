import { Note } from "./note-model.js";

export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    console.log(title, content);
    if (!title || !content)
      return res.status(400).json({ message: "title and content required" });

    const note = await Note.create({ title, content });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    next(err);
  }
};
