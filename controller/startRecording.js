const videoModel = require('../models/videoInfo');

const startRecording = async (req, res) => {
  const data = new videoModel({
    ...req.body,
  });

  try {
    await data.save();

    return res.json({
      videoId: data._id,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

module.exports = startRecording;
