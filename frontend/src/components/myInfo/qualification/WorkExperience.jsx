import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const WorkExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employeeId } = useAuth();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [workData, setWorkData] = useState({
    company: "",
    jobTitle: "",
    from: "",
    to: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setWorkData({
      ...workData,
      [name]:
        type === "date" ? new Date(value).toISOString().split("T")[0] : value,
    });
  };

  useEffect(() => {
    if (id) {
      setIsUpdating(true);
    } else {
      setIsUpdating(false);
    }
  }, [id]);
  
  const baseUrl = import.meta.env.VITE_BACKEND_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const url = isUpdating
        ? `${baseUrl}/api/user/update-work/${id}`
        : `${baseUrl}/api/user/create-work`;
      const method = isUpdating ? "put" : "post";
      const response = await axios[method](url, workData, {
        headers: {
          "employee-id": employeeId,
        },
      });
      setSuccess(response.data.message);
      resetForm();
      setIsUpdating(false);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to submit work experience"
      );
    }
  };

  const resetForm = () => {
    setWorkData({
      company: "",
      jobTitle: "",
      from: "",
      to: "",
      comment: "",
    });
    setIsUpdating(false);
    setError("");
  };

  return (
    <div>
      <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
        <div className="bg-white p-6 lg:p-5 w-full font-body">
          <h2 className="text-base lg:text-sm font-semibold mb-6">
            Work Experience
          </h2>
          {error && (
            <p className="text-red-500 mb-4 text-xs font-semibold">{error}</p>
          )}
          {success && (
            <p className="text-green-500 mb-4 text-xs font-semibold">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="company"
                  className="block text-xs font-semibold text-gray-700"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Company"
                  value={workData.company}
                  onChange={handleChange}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="jobtitle"
                  className="block text-xs font-semibold text-gray-700"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobtitle"
                  name="jobTitle"
                  placeholder="Job Title"
                  value={workData.jobTitle}
                  onChange={handleChange}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="from"
                  className="block text-gray-700 text-xs font-semibold"
                >
                  From Date
                </label>
                <input
                  id="from"
                  type="date"
                  name="from"
                  value={workData.from}
                  onChange={handleChange}
                  className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
                />
              </div>
              <div>
                <label
                  htmlFor="to"
                  className="block text-gray-700 text-xs font-semibold"
                >
                  To Date
                </label>
                <input
                  id="to"
                  type="date"
                  name="to"
                  value={workData.to}
                  onChange={handleChange}
                  className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
                />
              </div>
              <div>
                <label
                  htmlFor="comment"
                  className="block text-xs font-semibold text-gray-700"
                >
                  Comment
                </label>
                <textarea
                  type="text"
                  id="comment"
                  name="comment"
                  placeholder="Comment"
                  value={workData.comment}
                  onChange={handleChange}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end text-sm lg:text-xs mt-6 gap-4">
              <button
                onClick={() => navigate("/admin/my-info/qualification/")}
                className="w-[4rem] lg:w-[9rem] bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-xl font-bold"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-[4rem] lg:w-[9rem] bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-bold"
              >
                {isUpdating ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
