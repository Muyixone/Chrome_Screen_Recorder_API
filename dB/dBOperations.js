const fileName = 'dB/dBFiles.json';
const fs = require('fs');

const saveToDb = (data) => {
  let currentData = fs.readFileSync(fileName, 'utf8');

  if (!currentData) {
    currentData = '{}';
  }
  const parsedData = JSON.parse(currentData);

  parsedData[data.id] = data;
  currentData = JSON.stringify(parsedData);
  fs.writeFileSync(fileName, currentData, 'utf8');
};

module.exports = {
  saveToDb,
};
