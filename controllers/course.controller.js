const Course = require("../models/course");

// Create
exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("experiment");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("experiment");
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
