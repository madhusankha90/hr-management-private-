const mongoose = require('mongoose');

const eduExperienceSchema = new mongoose.Schema({
    institute: {
        type: String,
        required: true
    },
    specification: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    gpa: {
        type: String,
        required: false
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const EduExperience = mongoose.model('edu_experience', eduExperienceSchema);
module.exports = EduExperience;