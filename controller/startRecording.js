const videoModel = require('../models/videoInfo');

const startRecording = async (req, res) => {
  // const { mimeType } = req.body;
  // if (!mimeType) {
  //   return console.log('Please send a mimeType for your file');
  // }

  const data = new videoModel({
    ...req.body,
  });

  await data.save();

  console.log(data);

  return res.json({
    videoId: data._id,
    status: 200,
  });
};

module.exports = startRecording;
