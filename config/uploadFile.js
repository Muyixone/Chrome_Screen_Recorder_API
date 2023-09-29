const multer = require('multer');
const fs = require('fs');
const path = require('path');

function fileFilter(req, file, callback) {
  let errorMessage = '';
  // upload only mp4 and mkv format

  if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
    errorMessage = `Wrong file type ${file.originalname
      .split('.')
      .pop()} found. Only mp4 video files are allowed!`;
    return callback(errorMessage);
  }

  callback(null, true);
}

function destinationPath(req, file, callback) {
  let stat = null;
  try {
    stat = fs.statSync(process.env.FILE_UPLOAD_PATH);
  } catch (error) {
    fs.mkdirSync(process.env.FILE_UPLOAD_PATH);
  }

  callback(null, process.env.FILE_UPLOAD_PATH);
}

function uniqueFileName(req, file, callback) {
  callback(
    null,
    file.fieldname + '_' + Date.now() + path.extname(file.originalname)
  );
}

const limits = {
  fileSize: 100 * 1024 * 1024, // 100MB
};

const videoStorage = multer.diskStorage({
  destination: destinationPath,
  filename: uniqueFileName,
});

const fileUploadConfig = {
  storage: videoStorage,
  limits: limits,
  fileFilter: fileFilter,
};

module.exports = fileUploadConfig;
