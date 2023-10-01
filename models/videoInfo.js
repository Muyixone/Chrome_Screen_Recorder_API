const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videoModel = new Schema({
  name: String,
  url: String,
  mimeType: String,
  transcription: String,
  payload: String,
  details: String,
});

module.exports = mongoose.model('Video', videoModel);
