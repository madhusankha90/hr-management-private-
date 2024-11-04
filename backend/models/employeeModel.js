const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    personalDetails: {
      fullName: {
        type: String,
        required: false,
        default: "none"
      },
      employeeId: {
        type: String,
        unique: true,
        required: true
      },
      otherId: {
        type: String,
        required: false,
        default: "none"

      },
      licenseNumber: {
        type: String,
        required: false,
        default: "none"

      },
      // licenseExpireDate: {
      //   type: Date,
      //   default: null,

      // },
      nationality: {
        type: String,
        default: "Sri Lanka",
      },
      // maritalStatus: {
      //   type: String,
      //   enum: ["Single", "Married", "Other"],
      //   required: false,
      //   default: "none"
        
      // },
      // dateOfBirth: {
      //   type: Date,
      //   required: false,
      //   default: "none"
      // },
      // gender: {
      //   type: String,
      //   enum: ["male", "female"],
      //   required: false,
      //   default: "none"

      // },
    },
    contactsDetails: {
      address: {
        street1: {
          type: String,
          required: false,
          default: "none"

        },
        street2: {
          type: String,
          required: false,
        default: "none"

        },
        city: {
          type: String,
          required: false,
        default: "none"

        },
        state: {
          type: String,
          required: false,
        default: "none"

        },
        zip: {
          type: String,
          required: false,
        default: "none"

        },
        country: {
          type: String,
          required: false,
        default: "none"

        },
      },
      telePhone: {
        home: {
          type: String,
          required: false,
        default: "none"

        },
        mobile: {
          type: String,
          required: false,
        default: "none"

        },
        work: {
          type: String,
          required: false,
        default: "none"

        },
      },
      email: {
        workEmail: {
          type: String,
          required: false,
        default: "none"

        },
        otherEmail: {
          type: String,
          required: false,
        default: "none"

        },
      },
    },
    customFields: {
      // bloodType: {
      //   type: String,
      //   enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      //   default: "none"
      // },
      testField: {
        type: String,
        required: false,
        default: "none"

      },
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("employees", employeeSchema);


Employee.collection.dropIndex("userName_1", (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Index dropped successfully");
  }
});

module.exports = Employee;
