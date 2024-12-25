const WorkExperience = require("../models/myInfoModels/workExperienceModel");
const EduExperience = require("../models/myInfoModels/eduExperienceModel");

const createWorkExperience = async (req, res) => {
  const { company, jobTitle, from, to, comment } = req.body;
  const employeeId = req.user?.employeeId || req.headers["employee-id"];

  try {
    if (!company || !jobTitle || !from || !to) {
      return res.status(400).json({
        success: false,
        message: "Other Fields are Required",
      });
    }
    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format.",
      });
    }

    if (new Date(from) >= new Date(to)) {
      return res.status(400).json({
        success: false,
        message: "'From' date must be earlier than 'To' date.",
      });
    }

    const createWork = new WorkExperience({
      company,
      jobTitle,
      from,
      to,
      comment,
      employeeId,
    });

    await createWork.save();
    return res.status(201).json({
      success: true,
      message: "Work experience saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " Internal server Error in create work experience",
      error: error.message,
    });
  }
};

const updateWorkExperience = async (req, res) => {
  const { _id } = req.params;
  const { company, jobTitle, from, to, comment } = req.body;

  const updateData = {};
  if (company !== undefined) updateData.company = company;
  if (jobTitle !== undefined) updateData.jobTitle = jobTitle;
  if (from !== undefined) updateData.from = new Date(from);
  if (to !== undefined) updateData.to = new Date(to);
  if (comment !== undefined) updateData.comment = comment;

  try {
    if (updateData.from || updateData.to) {
      const fromDate = updateData.from || new Date();
      const toDate = updateData.to || new Date();

      if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format.",
        });
      }

      if (updateData.from && updateData.to && fromDate >= toDate) {
        return res.status(400).json({
          success: false,
          message: "'From' date must be earlier than 'To' date.",
        });
      }
    }

    const updateWork = await WorkExperience.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updateWork) {
      return res.status(404).json({
        success: false,
        message: "Work Experience not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Work Experience updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server Error in updating Work Experinece",
      error: error.message,
    });
  }
};

const getWorkExperience = async (req, res) => {
  const employeeId = req.user?.employeeId || req.headers["employee-id"];
  try {
    if (!employeeId) {
      return res.status(404).json({
        success: false,
        message: "Employee Id is required to fetch data",
      });
    }
    const getWork = await WorkExperience.find({
      employeeId,
    });
    res.json({
      getWork,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in get Work Experience",
      error: error.message,
    });
  }
};


const deleteWorkExperience = async (req, res) => {
  const { _id } = req.params;
  try {
    const deleteWork = await WorkExperience.findByIdAndDelete({
      _id,
    });
    if (!deleteWork) {
      return res.status(404).json({
        success: false,
        message: "Work Experience not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Work Experience Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server Error in deleting Work Experience",
      error: error.message,
    });
  }
};


const createEduExperience = async (req, res) => {
  const { institute, specification, year, gpa, start, end} = req.body;
  const employeeId = req.user?.employeeId || req.headers["employee-id"];
  try {
    if (!institute || !specification || !year || !gpa || !start || !end) {
        return res.status(400).json({
          success: false,
          message: "Other fields are Required"
        })
    }
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format.",
      });
    }

    if (new Date(start) >= new Date(end)) {
      return res.status(400).json({
        success: false,
        message: "Start date must be earlier than End date.",
      });
    }

    const createEdu = new EduExperience({
      institute,
      specification,
      year,
      gpa,
      start,
      end,
      employeeId
    });
    await createEdu.save();
    res.status(201).json({
      success: false,
      message: "Educational Experience created successfully"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in creating Education Experience",
      error: error.message
    })
  }
}

const updateEduExperience = async (req, res) => {
  const {_id} = req.params;
  const { institute, specification, year, gpa, start, end} = req.body;

  const updateData = {};
  if (institute !== undefined) updateData.institute = institute;
  if (specification !== undefined) updateData.specification = specification;
  if (year !== undefined) updateData.year = year;
  if (gpa !== undefined) updateData.gpa = gpa;
  if (start !== undefined) updateData.start = start;
  if (end !== undefined) updateData.end = end;

  try {
    if (updateData.start || updateData.end) {
      const startDate = updateData.start || new Date();
      const endDate = updateData.end || new Date();

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format.",
        });
      }

      if (updateData.start && updateData.end && startDate >= endDate) {
        return res.status(400).json({
          success: false,
          message: "'From' date must be earlier than 'To' date.",
        });
      }
    }

    const updateEdu = await EduExperience.findByIdAndUpdate(_id, updateData,{
      new: true,
      runValidators: true
    });
    if (!updateEdu) {
      return res.status(404).json({
        success: false,
        message: "Education Experience Not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Education Experince Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server Error in upating Education Experience",
      error: error.message
    })
  }
}

const getEduExperience = async (req, res) => {
  const employeeId = req.user?.employeeId || req.headers["employee-id"];
  try {
    if (!employeeId) {
      return res.status(404).json({
        success: false,
        message: "Employee Id is required to fetch data"
      })
    }
    const getEdu = await EduExperience.find({
      employeeId
    });
    res.json({getEdu});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in get Education Experience"
    })
  }
}

const deleteEduExperience = async (req, res) => {
  const {_id} = req.params;
  try {
    const deleteEdu = await EduExperience.findByIdAndDelete({_id});
    if (!deleteEdu) {
      return res.status(404).json({
        success: false,
        message: "Education Experience not found"
      })
    }
    res.status(200).json({
      success: true,
      message: "Education Experience Deleted successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in Deleting Education Experience",
      error: error.message
    })
  }
}



module.exports = {
  createWorkExperience,
  updateWorkExperience,
  getWorkExperience,
  deleteWorkExperience,

  createEduExperience,
  updateEduExperience,
  getEduExperience,
  deleteEduExperience
};


