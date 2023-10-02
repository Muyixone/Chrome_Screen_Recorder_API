const mongoose = require('mongoose');
const videoModel = require('../models/videoInfo');
const fs = require('fs');
const path = require('path');
const { saveToDb, getFileById } = require('../dB/dBOperations');

const videoStoragePath = path.resolve(__dirname, '../', 'videos');

const downloadVideo = async (req, res) => {
  const videoId = req.params.id;
  const mimeType = req.headers['content-type'];

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return console.log('Invalid Id');
  }

  const video = await videoModel.findById({ _id: videoId });
  if (!video) {
    return console.log('File not found');
  }

  video.set({ mimeType: mimeType });
  await video.save();

  const chunks = [];
  req.on('data', (chunk) => {
    chunks.push(chunk);
  });

  req.on('end', async () => {
    // Combine all received chunks into a single buffer
    const dataBuffer = Buffer.concat(chunks);

    await saveToDb(dataBuffer, videoId);
  });
  return res.json({
    message: 'Chunks of data recieved',
  });
};

const finalVideoChunk = async (req, res) => {
  //1. get the videoId, blob from the req.body
  //2. Check if the request body has the isComplete field set to true
  //3. If No, return an error message that this is the wrong route else, continue

  try {
    const videoId = req.params.id;
    // const mimeType = req.headers['content-type'];

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return console.log('Invalid Id');
    }

    const videoData = videoModel.findById({ _id: videoId });
    if (!videoData) {
      return console.log('File not found');
    }

    const chunks = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });

    req.on('end', async () => {
      // Combine all received chunks into a single buffer
      const dataBuffer = Buffer.concat(chunks);

      await saveToDb(dataBuffer, videoId);
    });

    const binaryArray = await getFileById(videoId);

    //convert the binaryArray to a buffer
    const videoBuffer = Buffer.from(binaryArray);

    if (Buffer.isBuffer(videoBuffer)) {
      // The Buffer is converted back to a videofile and saved to the saver
      fs.writeFile(`./videos/${videoId}.webm`, videoBuffer, (err) => {
        if (err) {
          console.error(`Error writing video file: ${err}`);
        } else {
          return res.json({
            message: 'Video saved',
            status: 200,
          });
        }
      });
    } else {
      return res.json({
        message: 'Buffer not valid',
      });
    }
  } catch (error) {}
};

module.exports = { downloadVideo, finalVideoChunk };
