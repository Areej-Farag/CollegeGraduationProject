const mongoose = require("mongoose");

const experimentSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  name: String,
  description: String,
  domain: String,
  subDomain: String,
  observation: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
    }
  ],
  results: [
    {
      question: { type: String },
    }
  ],
  basedOn: String,
  steps: [
    {
      verb: { type: String, required: true },
      attrs: [
        {
          key: { type: String, required: true },
          value: { type: mongoose.Schema.Types.Mixed, required: true }
        }
      ]
    }
  ],
  tools: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tool" }],
  parameters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parameter" }],
  equations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equation" }],
});

module.exports = mongoose.model("Experiment", experimentSchema);
