const fs = require('fs');
const path = require('path');

function getFile(fileName, callback) {
  fs.readFile(path.resolve(process.env.FILE_UPLOAD_PATH, fileName), callback);
}

function streamVideoFile(req, res, videoFile) {
  const videoPath = `${process.env.FILE_UPLOAD_PATH}/${req.params.videoId}`;
  const total = videoFile.length;
  let range = req.headers.range;

  if (range) {
    let positions = range.replace(/bytes=/, '').split('-');
    let start = parseInt(positions[0], 10);
    let end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    let chunksize = end - start + 1;
    res.writeHead(206, {
      'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/webm',
    });
    res.end(videoFile.slice(start, end + 1), 'binary');
  } else {
    res.writeHead(200, {
      'Content-Length': total,
      'Content-Type': 'video/webm',
    });
    fs.createReadStream(videoPath).pipe(res);
  }
}

const streamVideo = (req, res) => {
  const videoName = req.params.videoId;

  function handleFile(error, fileData) {
    if (error) {
      if (error.code === 'ENOENT') {
        return res.status(404).json({
          error: 'No such file found',
        });
      }
      return res.json(error);
    }
    streamVideoFile(req, res, fileData);
  }
  getFile(videoName, handleFile);
};

module.exports = streamVideo;
