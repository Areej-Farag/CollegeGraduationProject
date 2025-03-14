const express = require("express");
const router = express.Router();
const equationController = require("../controllers/equation.controller");

router.get("/", equationController.getAllEquations);
router.post("/", equationController.createEquation);

module.exports = router;
