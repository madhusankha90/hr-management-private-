const ProfilePicture = require("../models/myInfoModels/ProfilePicModel");
const fs = require("fs");
const path = require("path");

const createProfilePic = async (req, res) => {
  const employeeId = req.user?.employeeId || req.headers["employee-id"];
  const profilePic = req.file;
  try {
    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "EmplyeeId required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file Uploaded",
      });
    }

    const existingProPic = await ProfilePicture.findOne({ employeeId });

    if (existingProPic) {
      return res.status(400).json({
        success: false,
        message: "Profile picture already exists",
      });
    }

    const profilePicFilename = profilePic.filename;

    const createProPic = new ProfilePicture({
      employeeId,
      profilePic: profilePicFilename,
    });
    await createProPic.save();
    res.status(201).json({
      success: true,
      message: "Profile Picture saved successfully",
      profilePic: createProPic.profilePic,
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(path.join(__dirname, "..", "uploads", "profilePics", req.file.filename));
    }
    res.status(500).json({
      success: false,
      message: "Internal server error in create Profile Picture",
      error: error.message,
    });
  }
};

const updateProfilePic = async (req, res) => {
  const employeeId = req.user?.employeeId || req.headers["employee-id"];

  try {
    if (!employeeId) {
      return res.status(400).json({
        message: "EmployeeId required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file Uploaded",
      });
    }

    const existingProPic = await ProfilePicture.findOne({ employeeId });

    if (!existingProPic) {
      return res.status(404).json({
        success: false,
        message: "Profile Picture not found",
      });
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
      message: "Profile Picture updated successfully",
      profilePic: existingProPic.profilePic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server Error in update Profile Picture",
      error: error.message,
    });
  }
};

const getProfilePic = async (req, res) => {
  const employeeId = req.user?.employeeId || req.headers["employee-id"];
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";

  try {
    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "EmployeeId required to get Profile picture",
      });
    }

    const getProPic = await ProfilePicture.findOne({ employeeId });
    if (!getProPic) {
      return res.status(400).json({
        success: false,
        message: "profile picture not found",
      });
    }

    const profilePicPath = path.join(
      __dirname,
      "../uploads/profilePics",
      getProPic.profilePic
    );

    if (fs.existsSync(profilePicPath)) {
      return res.status(200).json({
        success: true,
        message: "Profile picture retrieved successfully",
        profilePicPath: `${baseUrl}/uploads/profilePics/${getProPic.profilePic}`,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Profile Picture file not found on server",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in get Profile Picture",
      error: error.message,
    });
  }
};

module.exports = { createProfilePic, updateProfilePic, getProfilePic };
