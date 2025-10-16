import express from "express";
import * as ctrl from "./note-controller.js";

const router = express.Router();

router
  .route("/")
  .get(ctrl.getNotes) // GET /api/notes
  .post(ctrl.createNote); // POST /api/notes

router
  .route("/:id")
  .put(ctrl.updateNote) // PUT /api/notes/:id
  .delete(ctrl.deleteNote); // DELETE /api/notes/:id

export default router;
