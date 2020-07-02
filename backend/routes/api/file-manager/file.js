const express = require('express');
const router = express.Router();
const Controllers = require('../../../controllers');
const multer = require('multer');
const fs = require('fs');


const MIME_TYPE_MAP = {
        'image/png': 'png',
        'image/jpg': 'jpg',
        'image/jpeg': 'jpg',

        'audio/mpeg' : 'mpeg',
        'audio/wave' : 'wave',
        'audio/mp3' : 'mp3',

        'video/mp4': 'mp4',
        'video/x-matroska': 'x-matroska',
        'video/webm': 'webm'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Error");
      if (isValid) {
          error = null;
      }
      const time = new Date();
      const year = time.getFullYear();
      const month = time.getMonth() +1;
      const date = time.getDate();

      fs.readdir('backend/files', (err, files) => {
        if (err){
          console.log('Error');
        } else {
          let status = true;
          for (let i=0; i<files.length; i++) {
            if (year == files[i]) {
                status = false;
            }
          }
          if (status) {
            fs.mkdir("backend/files/" + year, function(err) {
              if (err) {
                 console.log(err);
              } else {
                fs.mkdir("backend/files/" + year + '/' + month, function(err) {
                  if (err) {
                      console.log(err);
                  } else {
                    fs.mkdir("backend/files/" + year + '/' + month + '/' + date, function(err) {
                        if(err) {
                          console.log(err);
                        } else {

                          fs.mkdir("backend/files/" + year + '/' + month + '/' + date  + '/' + 'music', function(err) {
                            if (err) {
                               console.log(err);
                            }

                        });
                        fs.mkdir("backend/files/" + year + '/' + month + '/' + date  + '/' + 'images', function(err) {
                            if (err) {
                               console.log(err);
                            }

                         });
                         fs.mkdir("backend/files/" + year + '/' + month + '/' + date  + '/' + 'videos', function(err) {
                            if (err) {
                              console.log(err);
                           }
                         });
                          console.log('Folder created');
                        }
                    })
                  }
                })
              }
            });
          } else {
            fs.readdir('backend/files/' + year, (err, files) => {
                if (err){
                  console.log(err);
                } else {
                  let statusMonth = true;
                  for (let i=0; i < files.length; i++) {
                    if (month == files[i]) {
                        statusMonth = false;
                    }
                  }
                  if (statusMonth) {
                    fs.mkdir("backend/files/" + year + '/' + month, function(err) {
                      if (err) {
                          console.log(err);
                      } else {
                        fs.mkdir("backend/files/" + year + '/' + month + '/' + date, function(err) {
                            if(err) {
                              console.log(err);
                            } else {

                              fs.mkdir("backend/files/" + year + '/' + month + '/' + date  + '/' + 'music', function(err) {
                                if (err) {
                                   console.log(err);
                                }

                            });
                            fs.mkdir("backend/files/" + year + '/' + month + '/' + date  + '/' + 'images', function(err) {
                                if (err) {
                                   console.log(err);
                                }

                             });
                             fs.mkdir("backend/files/" + year + '/' + month + '/' + date  + '/' + 'videos', function(err) {
                                if (err) {
                                  console.log(err);
                               }
                             });
                              console.log('Folder created');
                            }
                        })
                      }
                    })
                  } else {
                    fs.readdir('backend/files/' + year + '/' + month, (err, files) => {
                          if (err) {
                            console.log(err);
                          } else {
                            let statusDate = true;
                            for (let i=0; i < files.length; i++) {
                              if (date == files[i]) {
                                  statusDate = false;
                              }
                            }
                            if (statusDate) {
                               fs.mkdir("backend/files/" + year + '/' + month + '/' + date, function(err) {
                                    if(err) {
                                           console.log(err);
                                    } else {

                                      fs.mkdir("backend/files/" + year + '/' + month + '/' + date  + '/' + 'music', function(err) {
                                          if (err) {
                                             console.log(err);
                                          }

                                      });
                                      fs.mkdir("backend/files/" + year + '/' + month + '/' + date  + '/' + 'images', function(err) {
                                          if (err) {
                                             console.log(err);
                                          }

                                       });
                                       fs.mkdir("backend/files/" + year + '/' + month + '/' + date  + '/' + 'videos', function(err) {
                                          if (err) {
                                            console.log(err);
                                         }
                                       });
                                           console.log('Folder created');
                               }
                            })
                            }
                          }
                    })
                  }
                }
            } )
          }
        }
      });

      if (file.mimetype == 'audio/mpeg' || file.mimetype == 'audio/wave' || file.mimetype == 'audio/mp3') {
        cb(error, 'backend/files/' + year + '/' + month + '/' + date + '/music');
      }
      if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
        cb(error, 'backend/files/' + year + '/' + month + '/' + date + '/images');
      }
      if (file.mimetype == 'video/mp4' || file.mimetype == 'video/x-matroska' || file.mimetype == 'webm') {
        cb(error, 'backend/files/' + year + '/' + month + '/' + date + '/videos');
      }
  },
  filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, Date.now() + name);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), Controllers.file.create);
router.get('/', Controllers.file.getFiles);
router.get('/:id', Controllers.file.getOneFile);
router.patch('/:id', Controllers.file.update);
router.delete('/:id', Controllers.file.deleteFile);

module.exports = router;
