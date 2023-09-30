const express = require('express');
const renderVideo = require('../controller/renderVideo');
const streamVideo = require('../controller/streamVideo');

const router = express.Router();

// router.get('/', renderVideo);
router.get('/:videoName', streamVideo);

module.exports = router;
