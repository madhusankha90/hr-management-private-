const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    personalDetails: {
      employeeName: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
        },
      },
      nic: {
        type: String,
      },
      nationality: {
        type: String,
      },
      maritalStatus: {
        type: String,
        enum: ["Single", "Married"],
        required: true,
      },
      dob: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
      },
    },
    contactsDetails: {
      address: {
        street1: {
          type: String,
        },
        street2: {
          type: String,
        },
        city: {
          type: String,
        },
        province: {
          type: String,
        },
        zip: {
          type: String,
        },
        country: {
          type: String,
        },
      },
      telePhone: {
        home: {
          type: String,
        },
        mobile: {
          type: String,
        },
        work: {
          type: String,
        },
      },
      email: {
        workEmail: {
          type: String,
        },
        otherEmail: {
          type: String,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("employees", employeeSchema);

// Remove this line if 'userName' index doesn't exist in the current collection
// Employee.collection.dropIndex("userName_1", (err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("Index dropped successfully");
//   }
// });

module.exports = Employee;
