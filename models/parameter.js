const mongoose = require("mongoose");

const parameterSchema = new mongoose.Schema({
  name: String,
  unit: String,
  symbol: String,
  image: String,
  category: String,
  properties: {
    atomicStructure: String,
    color: String,
    smell: String,
    state: String,
  },
  constraints: {
    minValue: Number,
    maxValue: Number,
  },
});

module.exports = mongoose.model("Parameter", parameterSchema);
