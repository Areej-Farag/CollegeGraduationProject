const Parameter = require("../models/parameter");

// رفع صورة وربطها بـ Parameter
const uploadParameterImage = async (req, res) => {
  try {
    const imageUrl = req.file.path;

    const parameter = await Parameter.findById(req.params.id);
    if (!parameter) {
      return res.status(404).json({ message: "Parameter not found" });
    }

    parameter.image = imageUrl;
    await parameter.save();

    res.json({ message: "Image uploaded and linked to parameter", parameter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading image" });
  }
};

// جلب صورة Parameter
const getParameterImage = async (req, res) => {
  try {
    const parameter = await Parameter.findById(req.params.id);
    if (!parameter) {
      return res.status(404).json({ message: "Parameter not found" });
    }

    if (!parameter.image) {
      return res.status(404).json({ message: "No image found for this parameter" });
    }

    res.json({ image: parameter.image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving image" });
  }
};

module.exports = {
  uploadParameterImage,
  getParameterImage,
};
