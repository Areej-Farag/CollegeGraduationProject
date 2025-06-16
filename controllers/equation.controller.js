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

exports.getEquationById = async (req, res) => {
  try {
    const equation = await Equation.findById(req.params.id).populate("eqFormula.inputs.operand").populate("eqFormula.output");
    if (!equation) return res.status(404).json({ error: "Equation not found" });
    res.json(equation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEquation = async (req, res) => {
  try {
    const newEquation = new Equation(req.body);
    await newEquation.save();
    res.status(201).json(newEquation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateEquation = async (req, res) => {
  try {
    const updatedEquation = await Equation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEquation) return res.status(404).json({ error: "Equation not found" });
    res.json(updatedEquation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteEquation = async (req, res) => {
  try {
    const deletedEquation = await Equation.findByIdAndDelete(req.params.id);
    if (!deletedEquation) return res.status(404).json({ error: "Equation not found" });
    res.json({ message: "Equation deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};