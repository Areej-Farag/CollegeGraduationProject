const ExperimentImage = require("../models/experimentImage");

// Create a new ExperimentImage
exports.createExperimentImage = async (req, res) => {
  try {
    const newImage = await ExperimentImage.create(req.body);
    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all ExperimentImages
exports.getAllExperimentImages = async (req, res) => {
  try {
    const images = await ExperimentImage.find()
      .populate("Exp_ID")
      .populate("Tools.Tool_ID");
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one ExperimentImage by ID
exports.getExperimentImageById = async (req, res) => {
  try {
    const image = await ExperimentImage.findById(req.params.id)
      .populate("Exp_ID")
      .populate("Tools.Tool_ID");
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get ExperimentImage by Experiment ID (Exp_ID)
exports.getExperimentImageByExpID = async (req, res) => {
  try {
    const image = await ExperimentImage.findOne({ Exp_ID: req.params.expId })
      .populate("Exp_ID")
      .populate("Tools.Tool_ID");

    if (!image)
      return res
        .status(404)
        .json({ message: "Image for this experiment not found" });

    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update ExperimentImage
exports.updateExperimentImage = async (req, res) => {
  try {
    const updated = await ExperimentImage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Image not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete ExperimentImage
exports.deleteExperimentImage = async (req, res) => {
  try {
    const deleted = await ExperimentImage.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Image not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
