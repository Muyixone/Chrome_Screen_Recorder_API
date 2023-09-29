const express = require('express');
const multer = require('multer');

const uploadVideo = require('../controller/uploadVideo');
const fileUploadConfig = require('../config/uploadFile');
const upload = multer(fileUploadConfig);

const router = express.Router();

router.post('/save-video', upload.single('record'), uploadVideo);

module.exports = router;
