const express = require('express');
const multer = require('multer');
const path = require('path');

const route = require('./routes/uploadVideo');

const app = express();

const PORT = process.env.PORT || 3500;

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './videos');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/public/upload.html'));
// });

app.use('/', upload.single('record'), route);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
