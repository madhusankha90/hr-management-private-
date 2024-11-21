const PersonalDetail = require('../models/personalDetailsModel');
const { uploadProfilePic } = require('./profilePicController');
const EmergencyDetail = require('../models/emergencyDetailsModel');
const JobDetail = require('../models/JobDetailsModel');

const createPersonal = async (req, res) => {

  // uploadProfilePic (req, res, async (err) => {
  //   if (err){
  //     return res.status(400).json({
  //       success: false,
  //       err: err.message,
  //       message: "image upload failed"
  //     })
  //   }
  // })
  const { firstName, lastName, nic, nationality, maritalStatus, dob, gender } = req.body;

  try {
    if (!firstName || !nic || !nationality || !dob ) {
      return res.status(400).json({success: false, message: "Other Fields are Required"})
    }
    const personal = new PersonalDetail({
      firstName,
      lastName, 
      nic,
      nationality, 
      maritalStatus, 
      dob, 
      gender,
      // photo: req.file ? {
      //   data: fs.readFileSync(req.file.path),
      //   contentType: req.file.mimetype
      // } : undefined
    });
    await personal.save();
    res.status(201).json({
      success: true,
      message : "Personal Details Saved Successfully",
      personal: {
        id: personal._id,
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Personal Details Save Error",
      error: error.message
    });
  }
}

const updatePersonal = async (req, res) => {
  const { _id } = req.params;
  const { firstName, lastName, nic, nationality, maritalStatus, dob, gender } = req.body;

  const updateData = {};
  if (firstName !== undefined) updateData.firstName = firstName;
  if (lastName !== undefined) updateData.lastName = lastName;
  if (nic !== undefined) updateData.nic = nic;
  if (nationality !== undefined) updateData.nationality = nationality;
  if (maritalStatus !== undefined) updateData.maritalStatus = maritalStatus;
  if (dob !== undefined) updateData.dob = dob;
  if (gender !== undefined) updateData.gender = gender;


  try {
    const update = await PersonalDetail.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators:true}
    );

    if (!update){
      return res.status(404).json({
        success: false,
        message: "personal details not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "personal details updated"
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "updating peronal details",
      error: error.message
    })
  }
}

const createEmergency = async (req, res) => {
  const {name, relationship, mobile} = req.body;
  const employeeId = req.user?.employeeId || req.headers['employee-id'];
  try {
    if ( !name || !relationship || !mobile) {
      return res.status(400).json({success: false, message: "All fields are Required"});}

    const emergency = new EmergencyDetail({ name, relationship, mobile, employeeId});
    await emergency.save();
    res.status(201).json({
      success : true, 
      message: "Emergency details saved successfully",
      emergency,
    })

  } catch (error) {
    res.status(500).json({
      success : false,
      message: "Failed to save emergency details",
      error: error.message,
     })
  }
}

const getEmergency = async (req, res) => {
  try {
    const employeeId = req.user?.employeeId || req.headers['employee-id'];
    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required to fetch emergency data"
      })
    }
    const emergencyData = await EmergencyDetail.find({employeeId});
    res.json({emergencyData})
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

const createJob = async (req, res) => {
  const {joinedDate, jobTitle, jobSpecification, jobCategory, subUnit, location, employmentStatus} = req.body;
  try {
    if (!joinedDate || !jobTitle || !jobSpecification || !jobCategory || !subUnit || !location || !employmentStatus) {
      return res.status(400).json({
        success: false,
        message: "All fields are Required",
      })
    }
    const job = new JobDetail({
      joinedDate, 
      jobTitle, 
      jobSpecification,
      jobCategory, 
      subUnit, 
      location, 
      employmentStatus
    });
    await job.save();
    res.status(201).json({
      success: true,
      message: "Job Details Saved Successfully",
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

const getJob = async (req, res) => {
  try {
    const employeeId = req.user?.employeeId || req.headers['employee-id']
    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required to fetch emergency data"
      });
    }
    const jobData = await JobDetail.findOne({ employeeId});
    res.json( { jobData } );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    })
  }
}


module.exports = { createPersonal, updatePersonal, createEmergency, getEmergency, createJob, getJob};