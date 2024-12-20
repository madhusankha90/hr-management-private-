import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function truncateText(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

const Qualification = () => {
  const { employeeId } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [work, setWork] = useState([]);

  useEffect(() => {
    const fetchWorkExperience = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/get-work",
          {
            headers: { "employee-id": employeeId },
          }
        );
        const workExperience = response.data.getWork;
        setWork(
          Array.isArray(workExperience)
            ? workExperience
            : workExperience
            ? [workExperience]
            : []
        );
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching Work Experience"
        );
      }
    };
  });

  return (
    <div>
      <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
        <div className="bg-white p-6 lg:p-5 w-full font-body">
          <h2 className="text-base lg:text-sm font-semibold mb-4">
            Work Experience
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto font-secondary">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-xs">Company</th>
                  <th className="px-4 py-2 text-xs">Job Title</th>
                  <th className="px-4 py-2 text-xs">From</th>
                  <th className="px-4 py-2 text-xs">To</th>
                  <th className="px-4 py-2 text-xs">Comment</th>
                  <th className="px-4 py-2 text-xs">Action</th>
                </tr>
              </thead>
              <tbody>
                {work.length > 0 ? (
                  work.slice(0, 3).map((workExperience, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-xs bg-yellow-200 text-cente"></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-3 text-center text-xs bg-yellow-200"
                    >
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex text-sm lg:text-xs mt-6">
            <button
              onClick={() =>
                navigate("/admin/my-info/qualification/work-experience/")
              }
              className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-white"
            >
              Add More
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white mt-5 p-6 lg:p-5 w-full font-primary mx-auto rounded-xl shadow-md overflow-auto">
        <h2 className="text-base lg:text-sm font-semibold mb-4">
          Education Experience
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto font-secondary">
            <thead>
              <tr>
                <th className="px-4 py-2 text-xs">Institute</th>
                <th className="px-4 py-2 text-xs">Specification</th>
                <th className="px-4 py-2 text-xs">Year</th>
                <th className="px-4 py-2 text-xs">GPA</th>
                <th className="px-4 py-2 text-xs">Start Date</th>
                <th className="px-4 py-2 text-xs">End Date</th>
                <th className="px-4 py-2 text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan="7"
                  className="px-4 py-3 text-center text-xs bg-yellow-200"
                >
                  No records found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex text-sm lg:text-xs mt-6">
          <button className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-white">
            Add More
          </button>
        </div>
      </div>
      <div className="bg-white mt-5 p-6 lg:p-5 w-full font-primary mx-auto rounded-xl shadow-md overflow-auto">
        <h2 className="text-base lg:text-sm font-semibold mb-4">Language</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto font-secondary">
            <thead>
              <tr>
                <th className="px-4 py-2 text-xs">Language</th>
                <th className="px-4 py-2 text-xs">Competency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan="7"
                  className="px-4 py-3 text-center text-xs bg-yellow-200"
                >
                  No records found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex text-sm lg:text-xs mt-6">
          <button className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-white">
            Add More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Qualification;
