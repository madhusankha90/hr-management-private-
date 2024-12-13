const express = require('express');
const { uploadFile } = require('../controllers/fileController');
const { upload } = require('../middleware/uploadMiddleware');
const { createProfilePic, updateProfilePic } = require('../controllers/profilePicController');
const router = express.Router();

router.post('/create-profilePic', upload.single('photo'), createProfilePic);
router.put('/update-profilePic', upload.single('photo'), updateProfilePic);
router.get('/get-pofilePic')

router.post('/attachment',uploadFile);

module.exports = router;