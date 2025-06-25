const mongoose = require("mongoose");

const toolImageSchema = new mongoose.Schema({
  Tool_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tool",
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
});

const experimentImageSchema = new mongoose.Schema({
  Exp_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Experiment",
    required: true,
  },
  Tools: {
    type: [toolImageSchema],
    required: true,
  },
});

// ✅ هذا هو الحل
module.exports = mongoose.models.ExperimentImage || mongoose.model("ExperimentImage", experimentImageSchema);
