// const express = require('express');
// const router = express.Router();
// const upload = require('../upload');
// const Image = require('../models/imageModel');

// // API لرفع الصورة
// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     const imageUrl = req.file.path;

//     const newImage = new Image({ url: imageUrl });
//     await newImage.save();

//     res.json({ message: 'Image uploaded successfully', url: imageUrl });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error uploading image' });
//   }
// });

// // API لعرض الصور
// router.get('/', async (req, res) => {
//   try {
//     const images = await Image.find();
//     res.json(images);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching images' });
//   }
// });

// module.exports = router;
// uploadRoute.js
const express = require("express");           // 👈 أضف هذا
const router = express.Router();              // 👈 وكذلك هذا
const upload = require("../upload");          // ميدل وير الرفع
const Tool = require("../models/tool");       // موديل الأداة

// Route for uploading an image
router.post("/:id/upload-image", upload.single("image"), async (req, res) => {
  console.log("🔍 req.file:", req.file);
  if (!req.file) {
    return res.status(400).json({ error: "الصورة ماتوصلتش أصلاً" }); 
  }

  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ error: "الأداة مش موجودة" }); 
    }

    tool.image = req.file.path;
    await tool.save();

    res.json({ message: "تم رفع الصورة بنجاح على Cloudinary!", tool }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message }); 
  }
});

// 👇 لا تنسي التصدير
module.exports = router;
