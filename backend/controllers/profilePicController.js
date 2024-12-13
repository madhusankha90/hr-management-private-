const ProfilePicture = require('../models/myInfoModels/ProfilePicModel');
const fs = require('fs');
const path = require('path');

const createProfilePic = async( req, res) => {
    const employeeId = req.user?.employeeId || req.headers["employee-id"];
    const profilePic = req.file;
    try {
        if (!employeeId) {
            return res.status(400).json({
                success: false,
                message: "EmplyeeId required"
            })
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file Uploaded"
            })
        }
        const profilePicPath = profilePic.path;

        const createProPic = new ProfilePicture({
            employeeId,
            profilePic: profilePicPath,
        })
        await createProPic.save();
        res.status(201).json({
            success: true,
            message: 'Profile Picture saved successfully',
            profilePic: createProPic.profilePic
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error in create Profile Picture",
            error: error.message,
        })
    }
}

const updateProfilePic = async (req, res) => {
    const employeeId = req.user?.employeeId || req.headers["employee-id"];

    try {
        if (!employeeId) {
            return res.status(400).json({
                message: "EmployeeId required"
            })
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file Uploaded"
            })
        }

        const existingProPic = await ProfilePicture.findOne(
            { employeeId }
        )
        
        if (!existingProPic) {
            return res.status(404).json({
                success: false,
                message: 'Profile Picture not found'
            })
        }

        if (existingProPic.profilePic) {
            const existingFilePath = path.join(
                __dirname,
                "..",
                "uploads",
                "profilePics",
                existingProPic.profilePic
            );

            if (fs.existsSync(existingFilePath)) {
                fs.unlinkSync(existingFilePath);
            }
        }
        
        existingProPic.profilePic = req.file.filename;
        await existingProPic.save();
        res.status(200).json({
            success: true,
            message: 'Profile Picture updated successfully',
            profilePic: existingProPic.profilePic
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server Error in update Profile Picture",
            error: error.message
        })
    }
}

const getProfilePic = async (req, res) => {
    const employeeId = req.user?.employeeId || req.headers["employee-id"];
    try {
        if (!employeeId) {
            return res.status(400).json({
                success: false,
                message: 'EmployeeId required to get Profile picture'
            })
        }
        const getProPic = await ProfilePicture.findOne({employeeId});
        if (!gotProfilePic) {
            return res.status(404).json({
                success: false,
                message: "Profile Picture not found"
            })
        }
        res.json({
            profilePic: getProPic.profilePic
            ? `${req.protocol}://${req.get('host')}/${uploadDir}/${getProPic.profilePic}`
            : null
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error in get Profile Picture",
            error: error.message
        })
    }
}

module.exports = {createProfilePic, updateProfilePic, getProfilePic}
