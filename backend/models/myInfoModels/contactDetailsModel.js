const mongoose = require('mongoose');

const contactShema = new mongoose.Schema({
    streetOne: {
        type: String,
        required: true
    },
    streetTwo: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    homeTele: {
        type: Number,
        required: false
    },
    mobile: {
        type: Number,
        required: true
    },
    workTele: {
        type: Number,
        required: true
    },
    workEmail: {
        type: String,
        required: true
    },
    otherEmail: {
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

const ContactDetail = mongoose.model('contactdetails', contactShema);
module.exports = ContactDetail;