const express = require('express');
const getVideo = require('../controller/renderVideo');
const streamVideo = require('../controller/streamVideo');

const router = express.Router();

router.get('/play/:videoId', streamVideo);
router.get('/:id', getVideo);

module.exports = router;
