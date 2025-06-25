const express = require("express");
const router = express.Router();
const equationController = require("../controllers/equation.controller");

router.get("/", equationController.getAllEquations);
router.get("/:id", equationController.getEquationById);
router.post("/", equationController.createEquation);
router.put("/:id", equationController.updateEquation);
router.delete("/:id", equationController.deleteEquation);

module.exports = router;
