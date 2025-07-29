import { Request, Response } from "express";
import { db } from "../config/db";
import { AuthRequest } from "../middleware/verifyToken";

// ✅ GET all notes for logged-in user
export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM notes WHERE user_id = $1",
      [req.user!.id]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("Get Notes Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ POST create new note
export const createNote = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    await db.query(
      "INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3)",
      [req.user!.id, title, content]
    );
    res.status(201).json({ message: "Note created successfully." });
  } catch (err) {
    console.error("Create Note Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ PUT update existing note
export const updateNote = async (req: AuthRequest, res: Response) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  try {
    await db.query(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 AND user_id = $4",
      [title, content, noteId, req.user!.id]
    );
    res.status(200).json({ message: "Note updated successfully." });
  } catch (err) {
    console.error("Update Note Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ DELETE a note
export const deleteNote = async (req: AuthRequest, res: Response) => {
  const noteId = req.params.id;

  try {
    await db.query(
      "DELETE FROM notes WHERE id = $1 AND user_id = $2",
      [noteId, req.user!.id]
    );
    res.status(200).json({ message: "Note deleted successfully." });
  } catch (err) {
    console.error("Delete Note Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
