const Experiment = require("../models/experiment");

exports.getAllExperiments = async (req, res) => {
  try {
    const experiments = await Experiment.find()
      .populate("tools")
      .populate("parameters")
      .populate("equations");
    res.json(experiments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getExperimentById = async (req, res) => {
  try {
    const experiment = await Experiment.findById(req.params.id)
      .populate("tools")
      .populate("parameters")
      .populate("equations");
    if (!experiment) return res.status(404).json({ error: "Experiment not found" });
    res.json(experiment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createExperiment = async (req, res) => {
  try {
    const newExperiment = new Experiment(req.body);
    await newExperiment.save();
    res.status(201).json(newExperiment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateExperiment = async (req, res) => {
  try {
    const updatedExperiment = await Experiment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExperiment) return res.status(404).json({ error: "Experiment not found" });
    res.json(updatedExperiment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteExperiment = async (req, res) => {
  try {
    const deletedExperiment = await Experiment.findByIdAndDelete(req.params.id);
    if (!deletedExperiment) return res.status(404).json({ error: "Experiment not found" });
    res.json({ message: "Experiment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};