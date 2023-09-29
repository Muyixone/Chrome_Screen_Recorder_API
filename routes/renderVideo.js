const express = require('express');
const renderVideo = require('../controller/renderVideo');

const router = express.Router();

router.get('/:id', renderVideo);

module.exports = router;
