const WorkExperience = require('../models/myInfoModels/workExperienceModel');

const createWorkExperience = async (req, res) => {
    const {company, jobTitle, from, to, comment} = req.body;
    try {
        if (!company || !jobTitle || !from || !to) {
            return res.status(400).json({
                success: false,
                message: "Other Fields are Required"
            })
        }

        const createWork = new WorkExperience({
            company,
            jobTitle,
            from,
            to,
            comment,
        });
        await createWork.save();
        res.status(201).json({

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: " Internal server Error in create work experience",
            error: error.message,
        })
    }
}

const updateWorkExperience = async (req, res) => {
    const {_id} = req.params;
    const {company, jobTitle, from, to, comment} = req.body;

        const updateData = {};
        if (company !== undefined) updateData.company = company;
        if (jobTitle !== undefined) updateData.jobTitle = jobTitle;
        if (from !== undefined) updateData.from = from;
        if (to !== undefined) updateData.to = to;
        if (comment !== undefined) updateData.to = to;

        try {
            const updateWork = await WorkExperience.
        } catch (error) {
            
        }
        
    }
}


module.exports = {createWorkExperience};