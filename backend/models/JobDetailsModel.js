const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    joinedDate: {
        type: Date,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobSpecification: {
        type: String,
        required: true
    },
    jobCategory: {
        type: String,
        required: true
    },
    subUnit: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    employmentStatus: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const JobDetail = mongoose.model('jobdetails', JobSchema);

module.exports = JobDetail;

