const mongoose = require('mongoose');
const videoModel = require('../models/videoInfo');
const fs = require('fs');
const path = require('path');
const { saveToDb, getFileById, deleteFile } = require('../dB/dBOperations');

const downloadVideo = async (req, res) => {
  const videoId = req.params.id;
  // const mimeType = req.headers['content-type'];

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return console.log('Invalid Id');
  }

  try {
    const video = await videoModel.findById({ _id: videoId });
    if (!video) {
      return console.log('File not found');
    }

    // Set the filetype in the data base to a specific video format
    video.set('mimeType', 'video/webm');
    await video.save();

    // Get chunks of data from client
    const chunks = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });

    req.on('end', async () => {
      // Combine all received chunks into a single buffer array
      const dataBuffer = Buffer.concat(chunks);

      // Save to a local file in the server
      await saveToDb(dataBuffer, videoId);
    });
    return res.json({
      message: `Chunks of data for videoId ${video._id} recieved`,
    });
  } catch (error) {
    res.json({
      message: 'Something went wrong',
    });
  }
};

const finalVideoChunk = async (req, res) => {
  try {
    const videoId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return console.log('Invalid Id');
    }

    const videoData = await videoModel.findById({ _id: videoId });
    if (!videoData) {
      return res.status(404).json({
        message: 'Video file missing',
      });
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
      fs.writeFile(`./videos/${videoId}.webm`, videoBuffer, async (err) => {
        if (err) {
          return res.json({ message: err });
        } else {
          const link = `http://${req.hostname}:${process.env.PORT}/video/play/${videoId}.webm`;

          // update the url and blob fields in the mongoose model
          videoData.set({
            url: link,
          });
          await videoData.save();

          //Once buffer ias been decoded back to the orinal video file, delete the buffer file in mememory
          await deleteFile(videoId);

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
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = { downloadVideo, finalVideoChunk };
