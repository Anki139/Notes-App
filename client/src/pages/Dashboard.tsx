import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      // Replace this with an actual API call to fetch user notes
      setNotes(["Welcome Note", "Your First Note"]);
    }
  }, [user, navigate]);

  if (!user) return null; // Prevent rendering before redirect

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Welcome, {user.name || user.email}
        </h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h3 className="text-lg font-medium mb-2">Your Notes:</h3>
      <ul className="list-disc pl-6">
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
