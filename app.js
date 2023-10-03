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
