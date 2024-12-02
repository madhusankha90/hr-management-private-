const PersonalDetail = require('../models/personalDetailsModel');
const { uploadProfilePic } = require('./profilePicController');
const EmergencyDetail = require('../models/emergencyDetailsModel');
const JobDetail = require('../models/JobDetailsModel');
const ContactDetail = require('../models/myInfoModels/contactDetailsModel');

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
  const employeeId = req.user?.employeeId || req.headers['employee-id'];

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
      employeeId
      // photo: req.file ? {
      //   data: fs.readFileSync(req.file.path),
      //   contentType: req.file.mimetype
      // } : undefined
    });
    await personal.save();
    res.status(201).json({
      success: true,
      message : "Personal Details Saved Successfully",
      personal
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
  const employeeId = req.user?.employeeId || req.headers['employee-id'];
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
    const updatePersonal = await PersonalDetail.findOneAndUpdate(
      {employeeId},
      updateData,
      { new: true, runValidators:true}
    );

    if (!updatePersonal){
      return res.status(404).json({
        success: false,
        message: "personal Details not Found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Personal Details Updated",
      updatePersonal
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating peronal details",
      error: error.message
    })
  }
}

const getPersonal = async (req, res) => {
  const employeeId = req.user?.employeeId || req.headers['employee-id'];
  try {
    const getPersonal = await PersonalDetail.findOne({employeeId})
    res.status(200).json({
      success: true,
      getPersonal
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting personal details",
      error: error.message,
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
      message: "Internal server error in create emergency details",
      error: error.message,
     })
  }
}

const updateEmergency = async (req, res) => {
  const { _id } = req.params;
  const { name, relationship, mobile } = req.body; 

  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (relationship !== undefined) updateData.relationship = relationship;
  if (mobile !== undefined) updateData.mobile = mobile;

  try {
    const updatedEmergency =  await EmergencyDetail.findByIdAndUpdate(
       _id ,
      updateData,
      { new: true, runValidators: true}
    );

    if (!updatedEmergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency details not found",
        updatedEmergency,
      })
    }
    res.status(200).json({
      success: true,
      message: "Emergency details updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in update Emergency details",
      error: error.message,
    })
  }
}

const getEmergency = async (req, res) => {
  const employeeId = req.user?.employeeId || req.headers['employee-id'];
  try {
    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required to fetch emergency data"
      })
    }
    const emergencyData = await EmergencyDetail.find({employeeId});
    res.json({ emergencyData })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in get Emergency data",
      error: error.message,
    })
  }
}

const deleteEmergency = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedEmergency = await EmergencyDetail.findByIdAndDelete(
    { _id });
    if (!deletedEmergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency details not found"
      })
    }
    res.status(200).json({
      success: true,
      message: "Emergency details deleted successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in delete Emergency details",
      error: error.message,
    })
  }
}

const createJob = async (req, res) => {
  const {joinedDate, jobTitle, jobSpecification, jobCategory, subUnit, location, employmentStatus} = req.body;
  const employeeId = req.user?.employeeId || req.headers['employee-id'];
  try {
    if (!joinedDate || !jobTitle || !jobSpecification || !jobCategory || !subUnit || !location || !employmentStatus) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      })
    }
    const job = new JobDetail({
      joinedDate, 
      jobTitle, 
      jobSpecification,
      jobCategory, 
      subUnit, 
      location, 
      employmentStatus,
      employeeId,
    });
    await job.save();
    res.status(201).json({
      success: true,
      message: "Job Details saved successfully",
    })
  

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Job Details saving error",
      error: error.message,
    })
  }
}

const updateJob = async (req, res) => {
  const { _id } = req.params;
  const {joinedDate, jobTitle, jobSpecification, jobCategory, subUnit, location, employmentStatus} = req.body;

  const updateData = {};
  if (joinedDate !== undefined) updateData.joinedDate = joinedDate;
  if (jobTitle !== undefined) updateData.jobTitle = jobTitle;
  if (jobSpecification !== undefined) updateData.jobSpecification = jobSpecification;
  if (jobCategory !== undefined) updateData.jobCategory = jobCategory;
  if (subUnit !== undefined) updateData.subUnit = subUnit;
  if (location !== undefined) updateData.location = location;
  if (employmentStatus !==undefined) updateData.employmentStatus = employmentStatus;

  try {
    const updatedJob = await JobDetail.findByIdAndUpdate(
      _id,
      updateData,
      { new:true , runValidators: true}
    );
    
    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Dob details not found"
      })}
      res.status(200).json({
        success: true,
        message: "Job Details updated",
      });
  
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in updating details",
      error: error.message,
    })
  }
}

const getJob = async (req, res) => {
  const employeeId = req.user?.employeeId || req.headers['employee-id']
  try {
    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required to fetch emergency data"
      });
    }
    const getjob = await JobDetail.find({ employeeId});
    res.status(200).json({ 
      success: true,
      getjob, 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    })
  }
}

const deleteJob = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedJob = await JobDetail.findByIdAndDelete(
    { _id });
    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job details not found"
      })
    }
    res.status(200).json({
      success: true,
      message: "Job details deleted successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in delete Job details",
      error: error.message,
    })
  }
}

const createContact = async (req, res) => {
  const { streetOne, streetTwo, city, state, zip, country, homeTele, mobile, workTele, workEmail, otherEmail } = req.body;
  const employeeId = req.user?.employeeId || req.headers['employee-id'];
  try {
    if (!streetOne || !city || !state || !zip || !country || !mobile || !workTele || !workEmail || !otherEmail) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }
    const contact = new ContactDetail({
      streetOne, 
      streetTwo, 
      city, 
      state, 
      zip, 
      country, 
      homeTele, 
      mobile, 
      workTele, 
      workEmail, 
      otherEmail,
      employeeId
    })
    await contact.save();
    res.status(201).json({
      success: true,
      message: "Contact details saved"
    });

  } catch (error) {
    res.staus(500).json({
      success: false,
      message: "Contact details saving error",
      error: error.message
    })
  }
}

const updateContact = async(req, res) =>  {
  const { streetOne, streetTwo, city, state, zip, country, homeTele, mobile, workTele, workEmail, otherEmail } = req.body;
  const employeeId = req.user?.employeeId || req.headers['employee-id'];
  
    const updateData = {};
    if (streetOne !== undefined) updateData.streetOne = streetOne;
    if (streetTwo !== undefined) updateData.streetTwo = streetTwo;
    if (city !== undefined) updateData.city = city;
    if (state !== undefined) updateData.state = state;
    if (zip !== undefined) updateData.zip = zip;
    if (country !== undefined) updateData.country = country;
    if (homeTele !== undefined) updateData.homeTele = homeTele;
    if (mobile !== undefined) updateData.mobile = mobile;
    if (workTele !== undefined) updateData.workTele = workTele;
    if (workEmail !== undefined) updateData.workEmail = workEmail;
    if (otherEmail !== undefined) updateData.otherEmail = otherEmail;

    try {
      const updateContact = await ContactDetail.findOneAndUpdate(
        {employeeId},
        updateData,
        { new: true, runValidators: true}
      );

      if (!updateContact) {
        return res.status(404).json({
          success: false,
          message: "Contact details not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Contact details updated",
        updateContact
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Contact details updating error",
        error: error.message,
      })
    }
}

const getContact = async (req, res) => {
  const employeeId = req.user?.employeeId || req.headers['employee-id']
  try {
    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required to fetch emergency data"
      });
    }
    const getContact = await ContactDetail.findOne({ employeeId });
    res.status(200).json({ 
      success: true,
      getContact,
     });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting contact details",
      error: error.message
    })
    
  }
}

module.exports = { createPersonal, updatePersonal, getPersonal,
   createEmergency, updateEmergency, getEmergency, deleteEmergency, 
   createJob, updateJob, getJob, deleteJob, 
  createContact, updateContact, getContact
};