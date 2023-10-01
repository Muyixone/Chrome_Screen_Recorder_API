const express = require('express');
// const multer = require('multer');
const path = require('path');

// const fileUploadConfig = require('./config/uploadFile');
const routes = require('./routes/index');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT;

// const upload = multer(fileUploadConfig);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/public/upload.html'));
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
