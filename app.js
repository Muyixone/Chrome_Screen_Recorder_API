const express = require('express');
// const multer = require('multer');
const path = require('path');
const connectDb = require('./config/dbConfig');
const cors = require('cors');

// const fileUploadConfig = require('./config/uploadFile');
const routes = require('./routes/index');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT;

// const upload = multer(fileUploadConfig);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/public/upload.html'));
// });

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.raw({ type: '*/*', limit: '10mb' }));
app.use('/', routes);

const start = async () => {
  try {
    await connectDb(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log('App is running');
    });
  } catch (error) {}
};

start();
