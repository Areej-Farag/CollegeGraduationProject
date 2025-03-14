const express = require("express");
const router = express.Router();
const experimentController = require("../controllers/experiment.controller");

router.get("/", experimentController.getAllExperiments);
router.post("/", experimentController.createExperiment);

module.exports = router;
