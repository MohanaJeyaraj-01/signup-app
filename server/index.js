import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Temporary storage
let users = [];

// API route
app.get("/api", (req, res) => {
  res.send("✅ Signup API is running successfully!");
});

app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existing = users.find((u) => u.email === email);
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ name, email, password });
  res.json({ message: "Signup successful!", users });
});

// Serve React frontend (after build)
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
