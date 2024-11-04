const mongoose = require('mongoose');

const punchSchema = new mongoose.Schema({
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    punchNote:{
        type: String,
        required: true
    }
})

const Punch = mongoose.model('punches',punchSchema);

module.exports = Punch;