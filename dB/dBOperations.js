const fileName = 'dB/dBFiles.json';
const fs = require('fs');

const saveToDb = (data) => {
  let currentData = fs.readFileSync(fileName, 'utf8');

  //Parse current Data to an Object
  let parsedData = JSON.parse(currentData);

  if (parsedData.length < 1) {
    parsedData = [];
  }

  // Update data in the object
  parsedData.push(data);

  //convert the modified object back to JSON
  currentData = JSON.stringify(parsedData);

  fs.writeFileSync(fileName, currentData, 'utf8');
};

const readFromDb = () => {
  let currentData = fs.readFileSync(fileName, 'utf8');

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
    let currentData = fs.readFileSync(fileName, 'utf8');

    if (!currentData) {
      currentData = [];
    }
    const parsedData = JSON.parse(currentData);
    return parsedData[fileId];
  } catch (error) {}
};

module.exports = {
  saveToDb,
  readFromDb,
  getFile,
};
