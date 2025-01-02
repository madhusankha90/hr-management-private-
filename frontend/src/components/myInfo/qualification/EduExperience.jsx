import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const EduExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employeeId } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [eduData, setEduData] = useState({
    institute: "",
    specification: "",
    year: "",
    gpa: "",
    start: "",
    end: "",
  });

  const baseUrl = import.meta.env.VITE_BACKEND_URL;


  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setEduData({
      ...eduData,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const url = isUpdating
        ? `${baseUrl}/api/user/update-edu/${id}`
        : `${baseUrl}/api/user/create-edu`;
      const method = isUpdating ? "put" : "post";
      const response = await axios[method](url, eduData, {
        headers: {
          "employee-id": employeeId,
        },
      });
      setSuccess(response.data.message);
      setIsUpdating(false);
      resetForm();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to submit Education experience"
      );
    }
  };

  const resetForm = () => {
    setEduData({
      institute: "",
      specification: "",
      year: "",
      gpa: "",
      start: "",
      end: "",
    });
    setError("");
  };

  return (
    <div>
      <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
        <div className="bg-white p-6 lg:p-5 w-full font-body">
          <h2 className="text-base lg:text-sm font-semibold mb-6">
            Education Experience
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="institute"
                  className="block text-xs font-semibold text-gray-700"
                >
                  Institute
                </label>
                <input
                  type="text"
                  id="institute"
                  name="institute"
                  placeholder="Institute"
                  value={eduData.institute}
                  onChange={handleChange}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="specification"
                  className="block text-xs font-semibold text-gray-700"
                >
                  Specification
                </label>
                <input
                  type="text"
                  id="specification"
                  name="specification"
                  placeholder="Specification"
                  value={eduData.specification}
                  onChange={handleChange}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="year"
                  className="block text-xs font-semibold text-gray-700"
                >
                  Year
                </label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  placeholder="Year"
                  value={eduData.year}
                  onChange={handleChange}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="gpa"
                  className="block text-xs font-semibold text-gray-700"
                >
                  GPA
                </label>
                <input
                  type="text"
                  id="gpa"
                  name="gpa"
                  placeholder="GPA"
                  value={eduData.gpa}
                  onChange={handleChange}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="start"
                  className="block text-xs font-semibold text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="start"
                  name="start"
                  placeholder="Start"
                  value={eduData.start}
                  onChange={handleChange}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="end"
                  className="block text-xs font-semibold text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="end"
                  name="end"
                  placeholder="End Date"
                  value={eduData.end}
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

export default EduExperience;
