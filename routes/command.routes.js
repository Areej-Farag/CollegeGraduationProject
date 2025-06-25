const express = require("express");
const router = express.Router();
const commandController = require("../controllers/command.controller");

router.post("/", commandController.createCommand);
router.get("/", commandController.getAllCommands);
router.get("/:id", commandController.getCommandById);
router.put("/:id", commandController.updateCommand);
router.delete("/:id", commandController.deleteCommand);

module.exports = router;
