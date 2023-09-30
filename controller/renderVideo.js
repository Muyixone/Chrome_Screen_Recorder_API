const { getAllFiles } = require('../dB/dBOperations');

const sendAllVideos = async (req, res) => {
  try {
    const fileDetails = await getAllFiles();

    if (!fileDetails) {
      return res.json({ message: [] });
    }

    return res.json(fileDetails);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendAllVideos;
