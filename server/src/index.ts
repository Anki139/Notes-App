import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import notesRoutes from "./routes/notes.routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "https://notes-frontend-akcl.onrender.com", // ✅ your frontend domain
    credentials: true, // ✅ if using cookies or Authorization headers
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
