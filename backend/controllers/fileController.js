const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = 'uploads/Attachments';

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Directory to store uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Custom filename
    }
});

// Initialize multer with the storage configuration and file filter (optional)
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: function (req, file, cb) {
        // Allowed file types
        const filetypes = /jpeg|jpg|png|pdf/; // Add more file types as needed
        // Check extension
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mime type
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images and PDFs are allowed!')); // Custom error message
        }
    }
});

// Upload file function
const uploadFile = async (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(500).send(err.message || "Upload failed");
        }
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
        res.status(200).json({
            message: "File uploaded successfully",
            file: req.file
        });
    });
};

module.exports = { uploadFile };
