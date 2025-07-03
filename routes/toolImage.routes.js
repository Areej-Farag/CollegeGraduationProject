// routes/toolImage.routes.js
const express = require("express");
const router = express.Router();
const upload = require("../upload");
const ToolsImagesControllers = require("../controllers/toolImages.controller");

// POST /api/tools/:id/upload-image
router.post(
  "/:id/upload-image",
  upload.single("image"),
  ToolsImagesControllers.PostImageforTools
);
// GET /api/tools/:id/image
router.get("/:id/image", ToolsImagesControllers.GetImageforTools);
// DELETE /api/tools/:id/delete-image
router.delete("/:id/delete-image", ToolsImagesControllers.deleteImageforTools);

module.exports = router;
