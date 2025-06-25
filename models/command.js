const mongoose = require("mongoose");

const commandSchema = new mongoose.Schema({
  verb: { type: String, required: true },
  numberOfAttributes: { type: Number, required: true },
  attributes: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length === this.numberOfAttributes;
      },
      message:
        "The number of attributes must match the value of numberOfAttributes.",
    },
  },
});

module.exports = mongoose.model("Command", commandSchema);
