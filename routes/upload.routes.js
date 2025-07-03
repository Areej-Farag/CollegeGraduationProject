const express = require('express');
const router = express.Router();
const upload = require('../upload');
const ImageController = require('../controllers/ImageUpload.controller');
const { image } = require('../cloudinary');

// API لرفع الصورة
router.post('/', upload.single('image'),ImageController.PostImage );

// API لعرض الصور
router.get('/', ImageController.GetImage );

module.exports = router;
