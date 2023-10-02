const express = require('express');
const startRecording = require('../controller/startRecording');
const {
  downloadVideo,
  finalVideoChunk,
} = require('../controller/downloadVideoChunks');

const router = express.Router();

//videoUploda.start
router.post('/start-record', startRecording);
router.post('/video-chunks/:id', downloadVideo);
router.post('/final-upload/:id', finalVideoChunk);

module.exports = router;
