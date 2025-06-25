const express = require("express");
const router = express.Router();
const parameterController = require("../controllers/parameter.controller");

router.get("/", parameterController.getAllParameters);
router.get("/:id", parameterController.getParameterById);
router.post("/", parameterController.createParameter);
router.put("/:id", parameterController.updateParameter);
router.delete("/:id", parameterController.deleteParameter);
module.exports = router;
