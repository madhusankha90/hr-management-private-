const express = require('express');
const { uploadFile } = require('../controllers/fileController');
const { upload } = require('../middleware/uploadMiddleware');
const { createProfilePic, updateProfilePic, getProfilePic } = require('../controllers/profilePicController');
const router = express.Router();

router.post('/create-profilePic', upload.single('photo'), createProfilePic);
router.put('/update-profilePic', upload.single('photo'), updateProfilePic);
router.get('/get-profilePic', getProfilePic);

// router.get('/get-profilePic', (req, res) => {
//     res.status(200).json({ error: "false"})
// });

router.post('/attachment',uploadFile);

module.exports = router;