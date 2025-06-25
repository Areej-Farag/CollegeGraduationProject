const Command = require("../models/command");

// Create
exports.createCommand = async (req, res) => {
  try {
    const command = new Command(req.body);
    await command.save();
    res.status(201).json(command);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all
exports.getAllCommands = async (req, res) => {
  try {
    const commands = await Command.find();
    res.json(commands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get by ID
exports.getCommandById = async (req, res) => {
  try {
    const command = await Command.findById(req.params.id);
    if (!command) return res.status(404).json({ error: "Command not found" });
    res.json(command);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateCommand = async (req, res) => {
  try {
    const command = await Command.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!command) return res.status(404).json({ error: "Command not found" });
    res.json(command);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
exports.deleteCommand = async (req, res) => {
  try {
    const command = await Command.findByIdAndDelete(req.params.id);
    if (!command) return res.status(404).json({ error: "Command not found" });
    res.json({ message: "Command deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
