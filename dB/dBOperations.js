const path = require('path');
// const folderName = './dB/';

const folderName = path.join(__dirname, 'dB');
const { read } = require('node:fs');
const fs = require('node:fs/promises');

const saveToDb = async (data, id) => {
  try {
    let currentData = await fs.readdir('./dB');

    const file = currentData.filter((item) => item === `${id}.json`);

    if (file.length > 0) {
      let currentData = await fs.readFile(`./dB/${id}.json`, {
        encoding: 'utf-8',
      });

      let parsedData = JSON.parse(currentData);

      if (parsedData.length < 1) {
        parsedData = [];
      }

      // Update data in the object
      parsedData.push(data);
      currentData = JSON.stringify(parsedData);

      return await fs.writeFile(`./dB/${id}.json`, currentData, 'utf-8');
    }

    //convert the modified object back to JSON
    currentData = JSON.stringify([data]);

    await fs.writeFile(`./dB/${id}.json`, currentData, 'utf-8');
  } catch (error) {
    throw error;
  }
};

const getFileById = async (fileId) => {
  let fileDirectory = await fs.readdir('./dB');

  const file = fileDirectory.filter((item) => item === `${fileId}.json`);

  if (file.length < 0) {
    throw new Error('File not found', 404);
  }

  let fileToRead = await fs.readFile(`./dB/${file}`, { encoding: 'utf-8' });

  const parsedFile = JSON.parse(fileToRead);

  const extractedBuffArr = [];
  for (const singleBuff of parsedFile) {
    if (singleBuff.hasOwnProperty('data') && Array.isArray(singleBuff.data)) {
      extractedBuffArr.push.apply(extractedBuffArr, singleBuff.data);
      // extractedBuffArr.push(...singleBuff.data);
    }
  }

  console.log(extractedBuffArr);

  // for (const item of currentData) {
  //   if (item === `${fileId}.json`) {
  //     let currentData = await fs.readFile(`./dB/${item}`, {
  //       encoding: 'utf-8',
  //     });

  //     return console.log(JSON.parse(currentData));
  //   }
  // }
  // return console.log('No file found');
};

const readFromDb = async (id) => {
  let currentData = await fs.readFile(`./dB/${id}.json`, {
    encoding: 'utf-8',
  });

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
  } catch (error) {
    throw error;
  }
};

const getAllFiles = async () => {
  // let data = await fs.readFile(fileName, { encoding: 'utf8' });
  let data = await readFromDb();
  return data;
};

module.exports = {
  saveToDb,
  readFromDb,
  getFile,
  getAllFiles,
  getFileById,
};
