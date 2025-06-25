const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  animation: String,
  category: String
});

module.exports = mongoose.model("Tool", toolSchema);
