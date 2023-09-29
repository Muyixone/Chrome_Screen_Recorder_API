const fileName = 'dB/dBFiles.json';
const fs = require('fs');

const saveToDb = (data) => {
  let currentData = fs.readFileSync(fileName, 'utf8');

  if (!currentData) {
    currentData = '{}';
  }
  //Parse current Data to an Object
  const parsedData = JSON.parse(currentData);

  // Update data in the object
  parsedData[data.id] = data;

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

const getFile = (fileId) => {
  if (!fileId) {
    return null;
  }
  let currentData = fs.readFileSync(fileName, 'utf8');

  if (!currentData) {
    currentData = '{}';
  }
  const parsedData = JSON.parse(currentData);
  return parsedData[fileId];
};

module.exports = {
  saveToDb,
};
