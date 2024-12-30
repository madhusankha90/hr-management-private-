const mongoose = require('mongoose');

const punchSchema = new mongoose.Schema({
    punchTime: {
        type: Date,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Punch = mongoose.model("punchs", punchSchema);
module.exports = Punch;