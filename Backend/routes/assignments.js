import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import Assignment from "../models/Assignment.js";
import auth from "../middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter: (_, file, cb) => {
    const allowed = /pdf|doc|docx|txt|jpg|jpeg|png|zip|rar/;
    cb(null, allowed.test(path.extname(file.originalname).toLowerCase()));
  },
});

const router = express.Router();

// GET /api/assignments  — logged-in user's assignments
router.get("/", auth, async (req, res) => {
  try {
    const assignments = await Assignment.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/assignments  — create + optional file upload
router.post("/", auth, upload.single("file"), async (req, res) => {
  try {
    const { title, subject, description, deadline } = req.body;

    if (!title || !subject || !description) {
      return res.status(400).json({ error: "title, subject and description are required" });
    }

    const files = [];
    if (req.file) {
      const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 3001}`;
      files.push({
        file_name: req.file.originalname,
        file_url: `${backendUrl}/uploads/${req.file.filename}`,
      });
    }

    const assignment = await Assignment.create({
      user: req.user.id,
      title,
      subject,
      description,
      deadline: deadline || null,
      status: "Pending Payment",
      files,
    });

    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/assignments/:id
router.get("/:id", auth, async (req, res) => {
  try {
    const assignment = await Assignment.findOne({ _id: req.params.id, user: req.user.id });
    if (!assignment) return res.status(404).json({ error: "Assignment not found" });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
