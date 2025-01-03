import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useAuth } from "./context/authContext";

function truncateText(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

const JobDetails = () => {
  const {employeeId} = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
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

  const baseUrl = import.meta.env.VITE_BACKEND_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      if (isUpdating) {
        const response = await axios.put(
          `${baseUrl}/api/user/update-job/${jobId}`,
          jobData,
          {
            headers: { "employee-id": employeeId },
          }
        );
        setSuccess(response.data.message);
        resetForm();
        handleJobs();
      } else {
        const response = await axios.post(
          `${baseUrl}/api/user/create-job`,
          jobData,
          {
            headers: { "employee-id": employeeId },
          }
        );
        setSuccess(response.data.message);
        resetForm();
        handleJobs();
        setIsUpdating(false)
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to submit Job data");
    }
  };

  const handleJobs = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/user/get-job`,
        {
          headers: { "employee-id": employeeId },
        }
      );
      const job = response.data.getjob;
      setJobs(Array.isArray(job) ? job : job ? [job] : []);
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred while fetching jobs"
      );
    }
  };

  useEffect(() => {
    handleJobs();
  }, []);

  const handleEdit = (job) => {
    setJobId(job._id);
    setIsUpdating(true);
    setError('');
    setSuccess('');
    setJobData({
      joinedDate: job.joinedDate,
      jobTitle: job.jobTitle,
      jobSpecification: job.jobSpecification,
      jobCategory: job.jobCategory,
      subUnit: job.subUnit,
      location: job.location,
      employmentStatus: job.employmentStatus,
    });
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Job Details?")) return;
    
    setSuccess("");
    setError("");

    try {
      const response = await axios.delete(
        `${baseUrl}/api/user/delete-job/${id}`
      );
      setSuccess(response.data.message);
      resetForm();
      handleJobs();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to delete Job details"
      );
    }
  };

  const jobTitles = ["CEO", "CFO", "CTO", "CMO", "HR Executive", "Accountant", "Wordpress Developer", "Marketing Specialist"];

  return (
    <div>
      <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
        <div className="bg-white p-6 lg:p-5 w-full font-body">
          <h2 className="text-base lg:text-sm font-semibold mb-6">
            Job Details
          </h2>

          {error && (
            <p className="text-red-500 mb-4 text-xs font-semibold">{error}</p>
          )}
          {success && (
            <p className="text-green-500 mb-4 text-xs font-semibold">
              {success}
            </p>
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
                  value={jobData.joinedDate ? new Date(jobData.joinedDate).toISOString().slice(0, 10) : ''}
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
                <select
                  id="jobTitle"
                  name="jobTitle"
                  value={jobData.jobTitle}
                  onChange={handleChange}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                >
                <option value="">-- Select --</option>
                {jobTitles.map((jobTitle) => (
                <option key={jobTitle}>{jobTitle}</option>
                ))}
                </select>
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
                className="w-[4rem] lg:w-[9rem] font-bold bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl"
              >
                { isUpdating ? "Update" : "Save" }
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-white mt-5 p-6 lg:p-5 w-full font-primary mx-auto rounded-xl shadow-md min-h-[8rem] lg:min-h-[15rem]">
        <h2 className="text-base lg:text-sm font-semibold mb-4">
          ({jobs.length}) Records Found
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto font-secondary">
            <thead>
              <tr>
                <th className="px-4 py-2 text-xs">Joined Date</th>
                <th className="px-4 py-2 text-xs">Job Title</th>
                <th className="px-4 py-2 text-xs">Job Specification</th>
                <th className="px-4 py-2 text-xs">Job Category</th>
                <th className="px-4 py-2 text-xs">Sub Unit</th>
                <th className="px-4 py-2 text-xs">Location</th>
                <th className="px-4 py-2 text-xs">Employment Status</th>
                <th className="px-4 py-2 text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs.slice(0, 5).map((job, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                      {new Date(job.joinedDate).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                      {truncateText(job.jobTitle, 8)}
                    </td>
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                      {truncateText(job.jobSpecification, 8)}
                    </td>
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                      {truncateText(job.jobCategory, 8)}
                    </td>
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                      {truncateText(job.subUnit, 8)}
                    </td>
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                      {truncateText(job.location, 8)}
                    </td>
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                      {truncateText(job.employmentStatus, 8)}
                    </td>
                    <td
                      className="text-xs lg:space-x-2 space-y-2 text-center bg-yellow-200
                    sm:table-cell sm:justify-around"
                    >
                      <button
                        onClick={ () => handleEdit(job)}
                        className="px-2 py-1 bg-green-500 text-white hover:bg-green-600 transition duration-200
                      rounded-lg text-xs sm:inline-block"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 transition duration-200
                      rounded-lg sm:inline-block"
                      >
                        <DeleteOutlineOutlinedIcon
                          style={{ fontSize: "12px" }}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-3 text-center text-xs bg-yellow-200"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
