const Tool = require("../models/tool");

exports.getAllTools = async (req, res) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getToolById = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) return res.status(404).json({ error: "Tool not found" });
    res.json(tool);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTool = async (req, res) => {
  try {
    const newTool = new Tool(req.body);
    await newTool.save();
    res.status(201).json(newTool);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTool = async (req, res) => {
  try {
    const updatedTool = await Tool.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTool) return res.status(404).json({ error: "Tool not found" });
    res.json(updatedTool);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTool = async (req, res) => {
  try {
    const deletedTool = await Tool.findByIdAndDelete(req.params.id);
    if (!deletedTool) return res.status(404).json({ error: "Tool not found" });
    res.json({ message: "Tool deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
