const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: '',
    }
},{
    timestamps: true
})

const ProfilePicture = mongoose.model('profilepictures', profileSchema);

module.exports = ProfilePicture;