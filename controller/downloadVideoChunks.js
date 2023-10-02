const mongoose = require('mongoose');
const ffmpeg = require('ffmpeg');
const videoModel = require('../models/videoInfo');
const fs = require('fs');
const { saveToDb, getFileById } = require('../dB/dBOperations');

// const videoStoragePath = path.resolve(_dirname, '../', 'videos');
// return console.log(videoStoragePath);

const chunksArray = [];

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

    const conctBuffer = await getFileById(videoId);
    const buffer = Buffer.concat(conctBuffer);

    const command = await ffmpeg()
      .input(buffer)
      .output(videoData.mimeType)
      .run();

    return fs.readFileSync('../videos');
    // Set output format and path.
    // command.toFormat(videoData.mimeType).save('../videos');

    return res.json({
      message: 'Video saved',
    });
    const data = await videoModel.findById({ _id: videoId });

    if (!data) {
      throw error;
    }

    chunksArray.push(blob);

    const combinedBuffer = Buffer.concat(chunksArray);

    console.log('combinedBuff:', combinedBuffer);

    const video = new videoModel({
      ...req.body,
      blob: combinedBuffer,
    });

    await video.save();

    return console.log(video);
    // const command = ffmpeg();

    // Set input as buffer.
    // command.input(combinedBuffer);

    // Set output format and path.
    // command.toFormat(data.mimeType).save(path);
  } catch (error) {}
};

module.exports = { downloadVideo, finalVideoChunk };
