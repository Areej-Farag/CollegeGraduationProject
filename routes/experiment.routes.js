const express = require("express");
const router = express.Router();
const experimentController = require("../controllers/experiment.controller");

router.get("/", experimentController.getAllExperiments);
router.get("/:id", experimentController.getExperimentById);
router.post("/", experimentController.createExperiment);
router.put("/:id", experimentController.updateExperiment);
router.delete("/:id", experimentController.deleteExperiment);

module.exports = router;
