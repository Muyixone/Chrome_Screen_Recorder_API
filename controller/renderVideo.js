const { getFile } = require('../dB/dBOperations');

const renderVideo = async (req, res) => {
  try {
    const fileDetails = await getFile(req.params.id);

    if (!fileDetails) {
      return res.json({
        message: 'INVALID FILE ID',
      });
    }

    const storedFile = fileDetails;
    return res.json({ storedFile });
    //     const videoDetails = fileDetails.details || 'NA';
    //     const videoName = fileDetails.name;

    //     return res.json()
  } catch (error) {
    console.log(error);
  }
};

module.exports = renderVideo;
