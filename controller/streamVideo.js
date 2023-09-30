const fs = require('fs');
const path = require('path');

function getFile(fileName, callback) {
  fs.readFile(path.resolve(process.env.FILE_UPLOAD_PATH, fileName), callback);
}

function streamVideoFile(req, res, videoFile) {
  const videoPath = `${process.env.FILE_UPLOAD_PATH}/${req.params.videoName}`;
  const total = videoFile.length;
  let range = req.headers.range;
  // console.log(range)
  if (range) {
    let positions = range.replace(/bytes=/, '').split('-');
    let start = parseInt(positions[0], 10);
    let end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    let chunksize = end - start + 1;
    res.writeHead(206, {
      'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    });
    res.end(videoFile.slice(start, end + 1), 'binary');
  } else {
    res.writeHead(200, {
      'Content-Length': total,
      'Content-Type': 'video/mp4',
    });
    fs.createReadStream(videoPath).pipe(res);
  }
}

const streamVideo = (req, res) => {
  const videoName = req.params.videoName;

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

// const streamVideo = (req, res) => {
//   const videoPath = `${process.env.FILE_UPLOAD_PATH}/${req.params.videoName}`;

//   // Check if the video file exists.
//   if (!fs.existsSync(videoPath)) {
//     return res.status(404).json({ error: 'Video not found' });
//   }

//   const videoStream = fs.createReadStream(videoPath);

//   // Set the appropriate headers for video streaming.
//   res.setHeader('Content-Type', 'video/mp4');
//   res.setHeader(
//     'Content-Disposition',
//     `inline; filename="${req.params.videoName}"`
//   );

//   // Pipe the video stream to the response.
//   videoStream.pipe(res);
// };

module.exports = streamVideo;
