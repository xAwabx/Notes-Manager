import express from "express";
import cors from "cors";

import notesRouter from "./modules/notes/note-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRouter);

app.get("/", (req, res) => res.send("Note Manager API is running"));

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

export default app;
