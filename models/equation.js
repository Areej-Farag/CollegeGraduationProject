const mongoose = require("mongoose");

const equationSchema = new mongoose.Schema({
  eqFormula: {
    inputs: [
      {
        operand: { type: mongoose.Schema.Types.ObjectId, ref: "Parameter", required: true },
        operator: { type: String, enum: ["+", "-", "*", "/", "->"], required: false },
      }
    ],
    output: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parameter", required: true }]
  },
  description: String,
  measurementUnit: String,
  operands: [String],
  catalyst: String,
});

module.exports = mongoose.model("Equation", equationSchema);
