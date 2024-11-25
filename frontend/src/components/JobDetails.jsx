import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function truncateText(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

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
        jobData,
        {
          headers: { "employee-id": localStorage.getItem("employeeId") },
        }
      );
      setSuccess(response.data.message);
      fetchJobs();
      resetForm();
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

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/get-job",
        {
          headers: { "employee-id": localStorage.getItem("employeeId") },
        }
      );
      const job = response.data.jobData;
      setJobs(Array.isArray(job) ? job : job ? [job] : []);
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred while fetching jobs"
      );
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
        <div className="bg-white p-6 lg:p-5 w-full font-primary">
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
                className="w-[4rem] lg:w-[9rem] font-bold bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
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
                        className="px-2 py-1 bg-green-500 text-white hover:bg-green-600 transition duration-200
                      rounded-lg text-xs sm:inline-block"
                      >
                        Edit
                      </button>
                      <button
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
