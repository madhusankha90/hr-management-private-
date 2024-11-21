import axios from "axios";
import React, { useState } from "react";

const JobDetails = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobData, setJobData] = useState({
    joinedDate: "",
    jobTitle: "",
    jobSpecification: "",
    jobCategory: "",
    subUnit: "",
    location: "",
    employmentStatus: "",
  });

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setSaving(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/create-job",
        jobData, {
          headers: { "employee-id": localStorage.getItem("employeeId") }
        }
      );
      setSuccess(response.data.message);
      resetForm();
      handleJob();
    } catch (error) {
      setError(error.response?.data?.message || "Error saving Job Details");
    } finally {
      setTimeout(() => {
        setSaving(false);
      }, 700);
    }
  };

  const resetForm = () => {
    setJobData({
      joinedDate: "",
      jobTitle: "",
      jobSpecification: "",
      jobCategory: "",
      subUnit: "",
      location: "",
      employmentStatus: "",
    });
  };

  const handleJob = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.get('http://localhost:5000/api/user/get-job',
        {
          headers: { 'employee-id': localStorage.getItem('employeeId') }
        }
      )
      const job = response.data.jobData;
      setJobs(Array.isArray(job) ? job : job ? [job] : []);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occured')
    }
  }

  return (
    <div>
      <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
        <div className="bg-white p-6 lg:p-5 w-full font-primary">
          <h2 className="text-base lg:text-sm font-semibold mb-6">
            Job Details
          </h2>

          {saving ? (
            <p className="text-green-500 mb-4 text-xs font-semibold">
              Saving Emergency Details...
            </p>
          ) : (
            <>
              {error && (
                <p className="text-red-500 mb-4 text-xs font-semibold">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-green-500 mb-4 text-xs font-semibold">
                  {success}
                </p>
              )}
            </>
          )}

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="joinedDate"
                  className="block text-xs font-medium text-gray-700"
                >
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
                <label
                  htmlFor="jobTitle"
                  className="block text-xs font-medium text-gray-700"
                >
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
                <label
                  htmlFor="jobSpecification"
                  className="block text-xs font-medium text-gray-700"
                >
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
                <label
                  htmlFor="jobCategory"
                  className="block text-xs font-medium text-gray-700"
                >
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
                <label
                  htmlFor="subUnit"
                  className="block text-xs font-medium text-gray-700"
                >
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
                <label
                  htmlFor="location"
                  className="block text-xs font-medium text-gray-700"
                >
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
                <label
                  htmlFor="employmentStatus"
                  className="block text-xs font-medium text-gray-700"
                >
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
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-full"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-white mt-5 p-6 lg:p-5 w-full font-primary mx-auto rounded-xl shadow-md min-h-[8rem] lg:min-h-[15rem]">
          <h2 className="text-base lg:text-sm font-semibold mb-4">
            Records Found
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto font-secondary">
              <thead>
                <tr>
                  <th className="px-4 py-2 border text-xs">Joined Date</th>
                  <th className="px-4 py-2 border text-xs">Job Title</th>
                  <th className="px-4 py-2 border text-xs">Job Specification</th>
                  <th className="px-4 py-2 border text-xs">Job Category</th>
                  <th className="px-4 py-2 border text-xs">Sub Unit</th>
                  <th className="px-4 py-2 border text-xs">Location</th>
                  <th className="px-4 py-2 border text-xs">Employment Status</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 border text-xs">{job.joinedDate}</td>
                    <td className="px-4 py-3 border text-xs">{job.jobTitle}</td>
                    <td className="px-4 py-3 border text-xs">{job.jobSpecification}</td>
                    <td className="px-4 py-3 border text-xs">{job.jobCategory}</td>
                    <td className="px-4 py-3 border text-xs">{job.subUnit}</td>
                    <td className="px-4 py-3 border text-xs">{job.location}</td>
                    <td className="px-4 py-3 border text-xs">{job.employmentStatus}</td>
                  </tr>
                ))}
              </tbody> 

            </table>

          </div>
      </div>
    </div>
  );
};

export default JobDetails;
