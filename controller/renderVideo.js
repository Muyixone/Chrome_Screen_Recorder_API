const mongoose = require('mongoose');
const videoModel = require('../models/videoInfo');

const getVideo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      message: 'Not a valid mongoose Id',
    });
  }
  try {
    const video = await videoModel.findById({ _id: id });
    if (!video) {
      return console.log('File not found');
    }
    return res.json({
      video,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

module.exports = getVideo;
