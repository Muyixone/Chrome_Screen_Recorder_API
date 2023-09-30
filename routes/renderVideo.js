const express = require('express');
const sendAllVideos = require('../controller/renderVideo');
const streamVideo = require('../controller/streamVideo');

const router = express.Router();

router.get('/', sendAllVideos);
router.get('/:videoName', streamVideo);

module.exports = router;
