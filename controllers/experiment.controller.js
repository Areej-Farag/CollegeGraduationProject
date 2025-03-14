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

exports.createExperiment = async (req, res) => {
  try {
    const experiment = new Experiment(req.body);
    await experiment.save();
    res.status(201).json(experiment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
