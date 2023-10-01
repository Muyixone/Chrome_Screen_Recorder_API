const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videoModel = new Schema({
  name: String,
  url: String,
  mimeType: String,
  transcription: String,
  blob: Buffer,
  details: String,
  isComplete: Boolean,
});

module.exports = mongoose.model('Video', videoModel);
