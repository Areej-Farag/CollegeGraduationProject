// routes/toolImage.routes.js

const express = require("express");
const router = express.Router();
const upload = require("../upload"); // الميدل وير اللي بيرفع الصور
const Tool = require("../models/tool"); // موديل الأداة

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
    console.error("Upload error:", error.stack);
    res.status(500).json({ message: "Error uploading image", error: error.stack });
  }
});
// routes/tool.routes.js   (أو فى controller)
router.get('/:id', async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) return res.status(404).json({ message: 'Tool not found' });
    res.json(tool);          // هيرجع { name, description, image, ... }
  } catch (error) {
  console.error("خطأ حصل أثناء رفع الصورة:");
  console.error(error.message); // دي لو عايزة الرسالة بس
  res.status(500).json({ message: "Error uploading image", error: error.message });
}

});


module.exports = router;
