const Experiment = require("../models/experiment");

exports.getAllExperiments = async (req, res) => {
  try {
    const experiments = await Experiment.find()
      .populate("tools")
      .populate("parameters")
      .populate("equations");
    res.json(experiments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getExperimentById = async (req, res) => {
  try {
    const experiment = await Experiment.findById(req.params.id)
      .populate("tools")
      .populate("parameters")
      .populate("equations");
    if (!experiment) return res.status(404).json({ error: "Experiment not found" });
    res.json(experiment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createExperiment = async (req, res) => {
  try {
    const newExperiment = new Experiment(req.body);
    await newExperiment.save();
    res.status(201).json(newExperiment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateExperiment = async (req, res) => {
  try {
    const updatedExperiment = await Experiment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExperiment) return res.status(404).json({ error: "Experiment not found" });
    res.json(updatedExperiment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteExperiment = async (req, res) => {
  try {
    const deletedExperiment = await Experiment.findByIdAndDelete(req.params.id);
    if (!deletedExperiment) return res.status(404).json({ error: "Experiment not found" });
    res.json({ message: "Experiment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateExperimentTools = async (req, res) => {
  try {
      const { experimentId } = req.params;
      const { tools } = req.body;

      // التحقق من وجود التجربة
      const experiment = await Experiment.findById(experimentId);
      if (!experiment) return res.status(404).json({ message: "Experiment not found" });

      // تحديث الأدوات
      experiment.tools = tools;
      await experiment.save();

      res.json({ message: "Tools updated successfully", experiment });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.updateExperimentParameters = async (req, res) => {
  try {
      const { experimentId } = req.params;
      const { parameters } = req.body; // المصفوفة الجديدة من الـ Parameters

      // تأكد أن parameters موجودة ومصفوفة
      if (!parameters || !Array.isArray(parameters)) {
          return res.status(400).json({ message: "Invalid parameters array" });
      }

      // تحديث تجربة معينة بالـ Parameters الجديدة
      const updatedExperiment = await Experiment.findByIdAndUpdate(
          experimentId,
          { parameters }, // يتم استبدال القديم بالجديد
          { new: true } // يرجع البيانات بعد التحديث
      );

      if (!updatedExperiment) {
          return res.status(404).json({ message: "Experiment not found" });
      }

      res.json({ message: "Parameters updated successfully", updatedExperiment });

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
exports.getExperimentTools = async (req, res) => {
  try {
      const { experimentId } = req.params;

      // البحث عن التجربة مع جلب الـ tools فقط
      const experiment = await Experiment.findById(experimentId).populate("tools");

      if (!experiment) {
          return res.status(404).json({ message: "Experiment not found" });
      }

      res.json({ tools: experiment.tools });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
exports.getExperimentParameters = async (req, res) => {
  try {
      const { experimentId } = req.params;

      // البحث عن التجربة مع جلب الـ parameters فقط
      const experiment = await Experiment.findById(experimentId).populate("parameters");

      if (!experiment) {
          return res.status(404).json({ message: "Experiment not found" });
      }

      res.json({ parameters: experiment.parameters });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// exports.updateExperimentToolsDetailed = async (req, res) => {
//     try {
//         const { experimentId } = req.params;
//         const { tools } = req.body;

//         // التحقق من وجود التجربة
//         const experiment = await Experiment.findById(experimentId);
//         if (!experiment) return res.status(404).json({ message: "Experiment not found" });

//         // تحديث الأدوات مباشرة بكائناتها الجديدة
//         experiment.tools = tools;
//         await experiment.save();

//         res.json({ message: "Tools updated successfully", experiment });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
