const express = require("express");
const router = express.Router();
const parameterController = require("../controllers/parameter.controller");

router.get("/", parameterController.getAllParameters);
router.post("/", parameterController.createParameter);

module.exports = router;
