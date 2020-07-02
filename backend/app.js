const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');


//  GridFS test

const multer  = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const url =   config.MONGO_URL;
// Create a storage object with a given configuration
const storage = new GridFsStorage({ url });

// Set multer storage engine to the newly created object
const upload = multer({ storage });



// end test GridFs

const routes = require('./routes');
const cors = require("cors");
const app = express();

app.use(cors());

mongoose.connect(
    config.MONGO_URL
    ).then( () => {
      console.log('Connected to database')
  })
  .catch( () =>{
      console.log('Error in connected database')
  });

module.exports = { mongoose };

// app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/files', express.static(path.join("backend/files")));
// app.use('/images', express.static(path.join("backend/images")));
// app.use('/images', express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-Width, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next()
});


//
app.post('/profile', upload.single('test'), (req, res, next) => {
  console.log('AAAA');
  console.log(req.file);
})
//
app.use('/api', routes.api);

module.exports = app;
