const Tool = require("../models/tool");

exports.getAllTools = async (req, res) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTool = async (req, res) => {
  try {
    const tool = new Tool(req.body);
    await tool.save();
    res.status(201).json(tool);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
