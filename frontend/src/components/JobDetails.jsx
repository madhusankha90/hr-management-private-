import React, { useState } from "react";

const JobDetails = () => {
  const [jobData, setJobData] = useState({
    joinedDate: '', 
    jobTitle: '', 
    jobSpecification: '',
    jobCategory: '', 
    subUnit: '', 
    location: '', 
    employmentStatus: ''
  });

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    
  }


  return (
    <div>
      <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
        <div className="bg-white p-6 lg:p-5 w-full font-primary">
          <h2 className="text-base lg:text-sm font-semibold mb-6">
            Job Details
          </h2>

          <form className="flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="joinedDate"
                className="block text-xs font-medium text-gray-700">
                    Joined Date
                </label>
                <input
                    type="date"
                    id="joinedDate"
                    name="joinedDate"
                    value={jobData.joinedDate}
                    onChange={handleChange}
                    className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="jobTitle"
                className="block text-xs font-medium text-gray-700">
                    Job Title
                </label>
                <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={jobData.jobTitle}
                    onChange={handleChange}
                    placeholder="Enter Job Title"
                    className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="jobSpecification"
                className="block text-xs font-medium text-gray-700">
                    Job Specification
                </label>
                <input
                    type="text"
                    id="jobSpecification"
                    name="jobSpecification"
                    value={jobData.jobSpecification}
                    onChange={handleChange}
                    placeholder="Enter Job Specification"
                    className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="jobCategory" 
                className="block text-xs font-medium text-gray-700">
                    Job Category
                </label>
                <input
                    type="text"
                    id="jobCategory"
                    name="jobCategory"
                    value={jobData.jobCategory}
                    onChange={handleChange}
                    placeholder="Enter Job Category"
                    className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="subUnit"
                className="block text-xs font-medium text-gray-700">
                    Sub Unit
                </label>
                <input
                    type="text"
                    id="subUnit"
                    name="subUnit"
                    value={jobData.subUnit}
                    onChange={handleChange}
                    placeholder="Enter Unit"
                    className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="location"
                className="block text-xs font-medium text-gray-700">
                    Location
                </label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={jobData.location}
                    onChange={handleChange}
                    placeholder="WFO / On Office"
                    className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="employmentStatus"
                className="block text-xs font-medium text-gray-700">
                    Employment Status
                </label>
                <input
                    type="text"
                    id="employmentStatus"
                    name="employmentStatus"
                    value={jobData.employmentStatus}
                    onChange={handleChange}
                    placeholder="Enter Home Tele"
                    className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              
            </div>
            <div className="flex mt-6 text-sm md:text-xs lg:text-xs justify-end">
                <button type="button"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-full">
                    Save
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
