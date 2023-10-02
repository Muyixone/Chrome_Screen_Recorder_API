const express = require('express');
const startRecording = require('../controller/startRecording');
const {
  downloadVideo,
  finalVideoChunk,
} = require('../controller/downloadVideoChunks');

const multer = require('multer');
// const uploadVideo = require('../controller/uploadVideo');
// const fileUploadConfig = require('../config/uploadFile');
// const upload = multer(fileUploadConfig);

const router = express.Router();

// router.post('/save-video', upload.single('record'), uploadVideo);
//videoUploda.start
router.post('/start-record', startRecording);
router.post('/video-chunks/:id', downloadVideo);
router.post('/final-upload/:id', finalVideoChunk);

module.exports = router;
