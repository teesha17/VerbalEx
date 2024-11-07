const express = require("express");
const multer = require("multer");
const { execFile } = require("child_process");
const path = require("path");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), (req, res) => {
  const filePath = path.join(__dirname, "..", req.file.path);

  execFile("python3", ["extract_text.py", filePath], (error, stdout, stderr) => {
    if (error) {
      console.error("Error executing Python script:", error);
      return res.status(500).json({ error: "Failed to extract text" });
    }

    if (stderr) {
      console.error("Python script error:", stderr);
      return res.status(500).json({ error: "Error in text extraction" });
    }

    res.json({ extractedText: stdout.trim() });
  });
});

module.exports = router;
