import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Note {
  id: number;
  title: string;
  content: string;
}

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchNotes();
    }
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://notes-app-gkes.onrender.com/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched Notes Response:", res.data);
      setNotes(res.data || []);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch notes.");
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateNote = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      if (editingId) {
        await axios.put(
          `https://notes-app-gkes.onrender.com/api/notes/${editingId}`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:4000/api/notes",
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setTitle("");
      setContent("");
      setEditingId(null);
      fetchNotes();
    } catch (err: any) {
      console.error(err);
      setError("Error saving note.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://notes-app-gkes.onrender.com/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      console.error(err);
      setError("Failed to delete note.");
    }
  };

  const handleEdit = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Notes</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full mb-2 p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="w-full mb-2 p-2 border rounded h-24"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={handleAddOrUpdateNote}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Update Note" : "Add Note"}
          </button>
        </div>

        <div>
          {loading ? (
            <p className="text-center text-gray-500">Loading notes...</p>
          ) : notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note.id}
                className="border rounded p-4 mb-4 bg-gray-50 shadow-sm"
              >
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <p className="text-gray-700">{note.content}</p>
                <div className="mt-2 flex gap-4">
                  <button
                    onClick={() => handleEdit(note)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No notes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
