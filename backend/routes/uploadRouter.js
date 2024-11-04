const express = require('express');
const { uploadProfilePic } = require('../controllers/profilePicController');
const { uploadFile } = require('../controllers/fileController');
const router = express.Router();

router.post('/profilepic',uploadProfilePic);
router.post('/attachment',uploadFile);

module.exports = router;