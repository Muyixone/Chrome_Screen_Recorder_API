const express = require('express');
const uploadVideo = require('./uploadVideo');
const renderVideo = require('./renderVideo');

const router = express.Router();

router.use('/', uploadVideo);
router.use('/video', renderVideo);

module.exports = router;
