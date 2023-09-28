const express = require('express');
const uploadVideo = require('../controller/uploadVideo');

const router = express.Router();

router.post('/save-video', uploadVideo);

module.exports = router;
