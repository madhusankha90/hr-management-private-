const mongoose = require('mongoose');

const workExperienceSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    commnent: {
        type: String,
        required: false,
        maxlength: 2000
    }
},{
    timestamps: true
})

const WorkExperience = mongoose.model('work_experience', workExperienceSchema);

module.exports = WorkExperience;