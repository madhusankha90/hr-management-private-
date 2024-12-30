const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true
    },
    competency: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Language = mongoose.model('languages', languageSchema);

module.exports = Language;