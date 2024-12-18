const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = 'uploads/profilePics';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Custom filename
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, 
    fileFilter: function (req, file, cb) {
        
        const filetypes = /jpeg|jpg|webp|png/; 

        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed!')); // Custom error message
        }
    }
});


module.exports = {upload} ;
