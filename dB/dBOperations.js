const fileName = 'dB/dBFiles.json';
const fs = require('node:fs/promises');

const saveToDb = async (data) => {
  try {
    let currentData = await fs.readFile(fileName, { encoding: 'utf8' });

    //Parse current Data to an Object
    let parsedData = JSON.parse(currentData);

    if (parsedData.length < 1) {
      return [];
    }

    // Update data in the object
    parsedData.push(data);

    //convert the modified object back to JSON
    currentData = JSON.stringify(parsedData);

    await fs.writeFile(fileName, currentData, 'utf8');
  } catch (error) {
    throw error;
  }
};

const readFromDb = async () => {
  let currentData = await fs.readFile(fileName, { encoding: 'utf8' });

  if (!currentData) {
    currentData = '{}';
  }
  const parsedData = JSON.parse(currentData);
  return parsedData;
};

const getFile = async (fileId) => {
  if (!fileId) {
    return null;
  }
  try {
    let currentData = await fs.readFile(fileName, { encoding: 'utf8' });

    if (!currentData) {
      currentData = [];
    }
    const parsedData = JSON.parse(currentData);
    return parsedData[fileId];
  } catch (error) {}
};

const getAllFiles = async () => {
  let data = await fs.readFile(fileName, { encoding: 'utf8' });

  if (!data) {
    return [];
  }
  const parsedData = JSON.parse(data);
  return parsedData;
};

module.exports = {
  saveToDb,
  readFromDb,
  getFile,
  getAllFiles,
};
