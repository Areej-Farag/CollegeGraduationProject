// routes/deviceImage.routes.js
const express = require("express");
const router = express.Router();
const upload = require("../upload");

const {
  uploadDeviceImage,
  getDeviceImages,
} = require("../controllers/deviceImage.controller");

router.post("/:id/upload-device-image", upload.single("image"), uploadDeviceImage);
router.get("/:id/device-images", getDeviceImages);

module.exports = router;

