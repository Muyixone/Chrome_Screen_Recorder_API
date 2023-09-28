const uploadVideo = (req, res) => {
  return console.log(`Video uploaded: ${req.file.filename}`);
};

module.exports = uploadVideo;
