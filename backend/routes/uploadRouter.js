const express = require('express');
const { uploadProfilePic } = require('../controllers/profilePicController');
const { uploadFile } = require('../controllers/fileController');
const router = express.Router();

router.post('/profile-pic',uploadProfilePic);
router.post('/attachment',uploadFile);

module.exports = router;