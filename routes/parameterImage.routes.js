const express = require("express");
const router = express.Router();
const upload = require("../upload");
const {
  uploadParameterImage,
  getParameterImage,
} = require("../controllers/parameterImage.controller");

router.post("/:id/upload-image", upload.single("image"), uploadParameterImage);
router.get("/:id/image", getParameterImage);

module.exports = router;
