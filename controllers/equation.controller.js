const Equation = require("../models/equation");

exports.getAllEquations = async (req, res) => {
  try {
    const equations = await Equation.find()
      .populate("eqFormula.inputs.operand")
      .populate("eqFormula.output");
    res.json(equations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEquation = async (req, res) => {
  try {
    const equation = new Equation(req.body);
    await equation.save();
    res.status(201).json(equation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
