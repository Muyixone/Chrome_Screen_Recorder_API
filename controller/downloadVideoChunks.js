const fileType = (async () => {
  await import('file-type');
  // Use fileMimeType here
})();

const videoModel = require('../models/videoInfo');
// const videoStoragePath = path.resolve(_dirname, '../', 'videos');
// return console.log(videoStoragePath);

const chunksArray = [];

const downloadVideo = async (req, res) => {
  const { videoId, blob } = req.body;

  return console.log(...req.body);
  try {
    const data = await videoModel.findById({ _id: videoId });

    if (!data) {
      throw error;
    }

    // Get the mimeType of the incoming blob
    const mimeType = fileType(blob);
    if (mimeType === 'video/webm') {
      chunksArray.push(blob);

      console.log('chunksArray:', chunksArray);
      return res.json({
        status: 200,
        message: 'Chunk saved',
      });
    } else {
      return console.log('Mime type error');
    }
  } catch (error) {
    console.log(error);
  }
};

const finalVideoChunk = async (req, res) => {
  //1. get the videoId, blob from the req.body
  //2. Check if the request body has the isComplete field set to true
  //3. If No, return an error message that this is the wrong route else, continue
  const { videoId, blob } = req.body;

  try {
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
    // command.toFormat(data.mimeType).save();
  } catch (error) {}
};

module.exports = { downloadVideo, finalVideoChunk };
