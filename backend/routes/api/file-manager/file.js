const express = require('express');
const router = express.Router();
const Controllers = require('../../../controllers');
const multer = require('multer');

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
      if (file.mimetype == 'audio/mpeg' || file.mimetype == 'audio/wave' || file.mimetype == 'audio/mp3') {
        cb(error, "backend/files/music");
      }
      if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
        cb(error, "backend/files/images");
      }
      if (file.mimetype == 'video/mp4' || file.mimetype == 'video/x-matroska' || file.mimetype == 'webm') {
        cb(error, "backend/files/videos");
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
