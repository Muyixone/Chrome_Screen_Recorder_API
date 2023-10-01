(async () => {
  const fileType = await import('file-type');
  // Use fileMimeType here
})();

// const videoStoragePath = path.resolve(_dirname, '../', 'videos');
// return console.log(videoStoragePath);
const videoModel = require('../models/videoInfo');

const chunksArray = [];

const downloadVideo = async (req, res) => {
  const { videoId, blob } = req.body;

  try {
    const data = await videoModel.findById({ _id: videoId });

    if (!data) {
      throw error;
    }

    // Get the mimeType of the incoming blob
    const mimeType = fileType(blob);
    if (mimeType !== data.mimeType) {
      return console.log('File format not supported');
    }

    chunksArray.push(blob);

    return res.json({
      status: 200,
      message: 'Chunk saved',
    });
  } catch (error) {
    console.log(error);
  }
};

const finalVideoChunk = async (req, res) => {
  //1. get the videoId, blob from the req.body
  //2. Check if the request body has the isComplete field set to true
  //3. If No, return an error message that this is the wrong route else, continue
  const { videoId, blob, isComplete } = req.body;

  try {
    const data = await videoModel.findById({ _id: videoId });

    if (!data) {
      throw error;
    }

    chunksArray.push(blob);

    const combinedBuffer = Buffer.concat(chunksArray);

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
    // command.toFormat(data.mimeType).save();
  } catch (error) {}
};

module.exports = { downloadVideo, finalVideoChunk };
