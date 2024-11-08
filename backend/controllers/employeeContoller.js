const PersonalDetail = require('../models/personalDetailsModel');

const createPersonal = async (req, res) => {
  const { firstName, lastName, nic, nationality, maritalStatus, dob, gender } = req.body;

  try {
    if (!firstName || !nic || !nationality || !dob ) {
      return res.status(400).json({sucess: false, message: "other fields are required"})
    }
    const personal = new PersonalDetail({
      firstName, lastName, nic, nationality, maritalStatus, dob, gender });
    await personal.save();
    res.status(201).json({
      success: true,
      message : "personal details saved successfully",
      personal: {
        _id: personal._id
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "personal details save error",
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

module.exports = { createPersonal, updatePersonal};