const path = require('path');
const { saveToDb } = require('../dB/dBOperations');

const uploadVideo = (req, res) => {
  const fileIdWithExtension = req.file.filename.split('_')[1];

  // remove the extension name from the fileId
  const fileId = path.parse(fileIdWithExtension).name;

  const link = `http://${req.hostname}:${process.env.PORT}/video/${fileId}`;

  res.json({
    success: true,
    link: link,
  });

  const attributesToSave = {
    id: fileId,
    name: req.file.originalname,
    size: req.file.size,
    path: req.file.path,
    encoding: req.file.encoding,
    details: req.body.details ? req.body.details : '',
  };

  return saveToDb(attributesToSave);
};

module.exports = uploadVideo;
