const path = require('path');
const { saveToDb } = require('../dB/dBOperations');

const uploadVideo = async (req, res) => {
  const fileIdWithExtension = req.file.filename.split('_')[1];

  // remove the extension name from the fileId
  const fileId = path.parse(fileIdWithExtension).name;

  const link = `http://${req.hostname}:${process.env.PORT}/video/${req.file.filename}`;

  const attributesToSave = {
    id: fileId,
    name: req.file.originalname,
    url: link,
    size: req.file.size,
    details: req.body.details ? req.body.details : '',
  };

  try {
    await saveToDb(attributesToSave);
    return res.json({
      success: true,
      url: link,
    });
  } catch (error) {
    return res.statusCode(500).json({
      message: error.message,
    });
  }
};

module.exports = uploadVideo;
