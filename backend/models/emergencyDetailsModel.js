const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    relationship: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

const EmergencyDetail = mongoose.model('emergencydetails', emergencySchema);

module.exports = EmergencyDetail;