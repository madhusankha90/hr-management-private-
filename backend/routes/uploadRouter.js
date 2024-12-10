const express = require('express');
const { uploadFile } = require('../controllers/fileController');
const { upload } = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/upload-profilePic', upload.single('photo'));
router.get('/get-pofilePic')

router.post('/attachment',uploadFile);

module.exports = router;