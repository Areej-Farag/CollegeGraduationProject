const Parameter = require("../models/parameter");

exports.getAllParameters = async (req, res) => {
  try {
    const parameters = await Parameter.find();
    res.json(parameters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getParameterById = async (req, res) => {
  try {
    const param = await Parameter.findById(req.params.id);
    if (!param) return res.status(404).json({ error: "Parameter not found" });
    res.json(param);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createParameter = async (req, res) => {
  try {
    const newParam = new Parameter(req.body);
    await newParam.save();
    res.status(201).json(newParam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateParameter = async (req, res) => {
  try {
    const updatedParam = await Parameter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedParam) return res.status(404).json({ error: "Parameter not found" });
    res.json(updatedParam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteParameter = async (req, res) => {
  try {
    const deletedParam = await Parameter.findByIdAndDelete(req.params.id);
    if (!deletedParam) return res.status(404).json({ error: "Parameter not found" });
    res.json({ message: "Parameter deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
