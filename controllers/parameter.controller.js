const Parameter = require("../models/parameter");

exports.getAllParameters = async (req, res) => {
  try {
    const parameters = await Parameter.find();
    res.json(parameters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createParameter = async (req, res) => {
  try {
    const parameter = new Parameter(req.body);
    await parameter.save();
    res.status(201).json(parameter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
