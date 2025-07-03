
const Image = require('../models/imageModel_tool');

exports.PostImage = async (req, res) => {
  try {
    const imageUrl = req.file.path;

    const newImage = new Image({ url: imageUrl });
    await newImage.save();

    res.json({ message: "Image uploaded successfully", url: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading image" });
  }
};

exports.GetImage = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching images" });
  }
};
