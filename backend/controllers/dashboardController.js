const Punch = require('../models/dashBoardModels/punchModel');

const punchOut = async (req, res) => {
    const {punchTime} = req.body;
    const employeeId = req.user?.employeeId || req.headers["employee-id"];
    try {
        const punchedOut = new Punch({
            punchTime, employeeId
        });
        await punchedOut.save();
        res.status(201).json({
            success: true,
            message: "Your Worked hours saved successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error in saving punched out time"
        })
    }
}


module.exports = {punchOut};