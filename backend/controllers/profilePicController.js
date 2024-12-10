const ProfilePicture = require('../models/myInfoModels/ProfilePicModel');
const fs = require('fs');
const path = require('path');
const { upload } = require('')

const createProfilePic = async( req, res) => {
    const employeeId = req.user?.employeeId || req.headers["employee-id"];
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

        const createdProfilePic = new ProfilePicture({
            employeeId,
            profilePic
        })
        await createdProfilePic.save();
        res.status(201).json({
            success: false,
            message: 'Profile Picture saved successfully'
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

    } catch (error) {
        
    }
}

