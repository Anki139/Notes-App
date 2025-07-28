import express from "express";
import { getNotes, createNote, updateNote, deleteNote } from "../controllers/notes.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

// ✅ Protected routes only
router.get("/", verifyToken, getNotes);
router.post("/", verifyToken, createNote);
router.put("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);

export default router;
