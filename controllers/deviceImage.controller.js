// controllers/deviceImage.controller.js
const Experiment = require("../models/experiment");

const uploadDeviceImage = async (req, res) => {
  try {
    const imageUrl = req.file.path;

    const experiment = await Experiment.findById(req.params.id);
    if (!experiment) {
      return res.status(404).json({ message: "Experiment not found" });
    }

    // push الصورة الجديدة على المصفوفة
    experiment.deviceImage.push(imageUrl);
    await experiment.save();

    res.json({ message: "Device image uploaded successfully", experiment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading device image" });
  }
};

const getDeviceImages = async (req, res) => {
  try {
    const experiment = await Experiment.findById(req.params.id);
    if (!experiment) {
      return res.status(404).json({ message: "Experiment not found" });
    }

    res.json({ deviceImages: experiment.deviceImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching device images" });
  }
};

module.exports = {
  uploadDeviceImage,
  getDeviceImages,
};
