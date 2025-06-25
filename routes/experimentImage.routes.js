const experimentImageController = require("../controllers/experimentImage.controller");
const express = require("express");
const router = express.Router();

// POST - Create new image record
router.post("/", experimentImageController.createExperimentImage);

// GET - All image records
router.get("/", experimentImageController.getAllExperimentImages);

// GET - Single image record by ID
router.get("/:id", experimentImageController.getExperimentImageById);

// GET - Get image by Exp_ID
router.get(
  "/by-experiment/:expId",
  experimentImageController.getExperimentImageByExpID
);

// PUT - Update image record by ID
router.put("/:id", experimentImageController.updateExperimentImage);

// DELETE - Remove image record by ID
router.delete("/:id", experimentImageController.deleteExperimentImage);

module.exports = router;
