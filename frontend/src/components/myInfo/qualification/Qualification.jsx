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
  const [id, setId] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

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
        setCurrentPage(0);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching Work Experience"
        );
      }
    };
    fetchWorkExperience();
  }, [employeeId]);

  const experiencePerPage = 3;

  const handleNextPage = () => {
    if ((currentPage + 1) * experiencePerPage < work.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedUsers = work.slice(
    currentPage * experiencePerPage,
    currentPage * experiencePerPage + experiencePerPage
  );

  const handleEdit = (workExperienceId) => {
    setId(workExperienceId);
    navigate(`/admin/my-info/qualification/work-experience/${workExperienceId}`)
  }

  const handleDeleteWorkExperience = async (workExperienceId) => {
    if (!window.confirm("Are you sure you want to delete this Work Experience ?")) return;
    setSuccess("");
    setError("");

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/user/delete-work/${workExperienceId}`,
        {
          headers: {
            "employee-id": employeeId,
          }
        }
      );
      setSuccess(response.data.message);
      window.location.reload();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to delete Work Experience"
      );
    }
  }
  return (
    <div>
      <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
        <div className="bg-white p-6 lg:p-5 w-full font-body">
          <h2 className="text-base lg:text-sm font-semibold mb-4">
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
                {displayedUsers.length > 0 ? (
                  displayedUsers.map((workExperience, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                        {truncateText(workExperience.company, 20)}
                      </td>
                      <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                        {truncateText(workExperience.jobTitle, 20)}
                      </td>
                      <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                        {new Date(workExperience.from).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                        {new Date(workExperience.to).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                        {truncateText(workExperience.comment, 20)}
                      </td>
                      <td
                        className="text-xs lg:space-x-2 space-y-2 text-center bg-yellow-200
      sm:table-cell sm:justify-around"
                      >
                        <button
                          onClick={()=> handleEdit(workExperience._id)}
                          className="px-2 py-1 bg-green-500 text-white hover:bg-green-600 transition duration-200
          rounded-lg text-xs sm:inline-block"
                        >
                          Edit
                        </button>
                        <button
                          onClick={()=> handleDeleteWorkExperience(workExperience._id)}
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

          <div className="flex flex-row mt-6 justify-between">
            <div className="text-sm lg:text-xs">
              <button
                onClick={() =>
                  navigate("/admin/my-info/qualification/work-experience/")
                }
                className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-white"
              >
                Add More
              </button>
            </div>
            <div className="text-sm lg:text-xs">
              {currentPage > 0 && (
                <button
                  onClick={handlePrevPage}
                  className="px-3 py-2 bg-gray-500 hover:bg-gray-600 rounded-xl text-white"
                >
                  Prev
                </button>
              )}
              {(currentPage + 1) * experiencePerPage < work.length && (
                <button
                  onClick={handleNextPage}
                  className="px-3 py-2 bg-gray-500 hover:bg-gray-600 rounded-xl text-white"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mt-5 p-6 lg:p-5 w-full font-body mx-auto rounded-xl shadow-md overflow-auto">
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
