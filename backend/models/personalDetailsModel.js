const mongoose = require("mongoose");

const personalSchema = new mongoose.Schema(
  { 
    firstName: { 
      type: String,
      required: true 
    },
    lastName: { 
      type: String
    },
    nic: { 
      type: String,
      required: true 
    },
    nationality: {
      type: String, 
      required: true 
    },
    maritalStatus: { 
      type: String, 
      enum: ["Single", "Married"] 
    },
    dob: { 
      type: Date,
      required: true 
    },
    gender: { 
      type: String 
    },
    employeeId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const PersonalDetail = mongoose.model("personaldetails", personalSchema);

module.exports = PersonalDetail;
