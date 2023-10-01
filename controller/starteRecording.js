const { v4: uuidv4 } = require('uuid');
const { saveToDb } = require('../dB/dBOperations');

const startRecording = async (req, res) => {
  const { mimeType } = req.body;
  if (!mimeType) {
    return console.log('Please send a mimeType for your file');
  }
  const fileId = uuidv4();

  const attributesToSave = {
    videoId: fileId,
    mimeType,
  };

  await saveToDb(attributesToSave);
  res.json({
    status: 200,
    fileId,
  });
};

module.exports = startRecording;
