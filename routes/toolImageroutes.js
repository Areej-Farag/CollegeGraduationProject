// routes/toolImage.routes.js

const express = require("express");
const router = express.Router();
const upload = require("../upload");
const Tool = require("../models/tool");

// POST /api/tools/:id/upload-image
router.post("/:id/upload-image", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file.path;

    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }

    tool.image = imageUrl;
    await tool.save();

    res.json({ message: "Image uploaded and linked to tool", tool });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading image" });
  }
});

router.get("/:id/image", async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }

    if (!tool.image) {
      return res.status(404).json({ message: "No image found for this tool" });
    }

    res.json({ image: tool.image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving image" });
  }
});

module.exports = router;
