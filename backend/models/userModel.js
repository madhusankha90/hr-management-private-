const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        enum: ["Admin", "Employee"],
        required: true
    },
    userName: {
        type: String,
        required: true,
        set: (value) =>value.toUpperCase()
    },
    status: {
        type: String,
        enum: ["Enable", "Disable"],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // personalId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "PersonalDetail"
    // }
}, {
    timestamps: true,
    autoIndex: false,
    autoCreate: false
});

const User = mongoose.model('users', userSchema);

module.exports = User;
