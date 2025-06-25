const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: String,
  image: String,
  experiment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Experiment" }],
  category: String
})

module.exports = mongoose.model("Course", CourseSchema);