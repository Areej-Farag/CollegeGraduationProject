const upload = require("../upload");
const Tool = require("../models/tool");
exports.PostImageforTools = async (req, res) => {
  try {
    const imageUrl = req.file.path;

    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }

    tool.image = imageUrl;
    await tool.save();

    res.json({ message: "Image uploaded and linked to tool", tool });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading image" });
  }
}
exports.GetImageforTools =  async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }

    if (!tool.image) {
      return res.status(404).json({ message: "No image found for this tool" });
    }

    res.json({ image: tool.image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving image" });
  }
}


exports.deleteImageforTools = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }

    if (!tool.image) {
      return res.status(404).json({ message: "No image to delete for this tool" });
    }

    // Optionally: Add Cloudinary deletion logic here if needed

    tool.image = null;
    await tool.save();

    res.json({ message: "Image deleted successfully", tool });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting image" });
  }
};

