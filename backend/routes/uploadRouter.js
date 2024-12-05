const express = require('express');
const { uploadFile } = require('../controllers/fileController');
const { upload } = require('../controllers/profilePicController');
const router = express.Router();

router.post('/profile-pic', upload.single('photo'));
router.post('/attachment',uploadFile);

module.exports = router;