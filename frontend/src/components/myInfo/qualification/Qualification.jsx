import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function truncateText(text, maxLength) {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
const PaginationControls = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onNext,
  onPrev,
}) => (
  <div className="flex">
    {currentPage > 0 && (
      <button
        onClick={onPrev}
        className="px-3 py-2 bg-gray-500 hover:bg-gray-600 rounded-xl text-white"
      >
        Prev
      </button>
    )}
    {(currentPage + 1) * itemsPerPage < totalItems && (
      <button
        onClick={onNext}
        className="px-3 py-2 bg-gray-500 hover:bg-gray-600 rounded-xl text-white"
      >
        Next
      </button>
    )}
  </div>
);

const Qualification = () => {
  const { employeeId } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [work, setWork] = useState([]);
  const [edu, setEdu] = useState([]);
  const [lang, setLang] = useState([]);
  const [id, setId] = useState("");
  const [workCurrentPage, setWorkCurrentPage] = useState(0);
  const [eduCurrentPage, setEduCurrentPage] = useState(0);
  const [langCurrentPage, setLangCurrentPage] = useState(0);

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
        setWorkCurrentPage(0);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching Work Experience"
        );
      }
    };
    fetchWorkExperience();
  }, [employeeId]);

  const handleWorkEdit = (workExperienceId) => {
    setId(workExperienceId);
    navigate(
      `/admin/my-info/qualification/work-experience/${workExperienceId}`
    );
  };

  useEffect(() => {
    const fetchEduExperience = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/get-edu",
          {
            headers: {
              "employee-id": employeeId,
            },
          }
        );
        const eduExperience = response.data.getEdu;
        setEdu(
          Array.isArray(eduExperience)
            ? eduExperience
            : eduExperience
            ? [eduExperience]
            : []
        );
        setEduCurrentPage(0);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching Education Experience"
        );
      }
    };
    fetchEduExperience();
  }, [employeeId]);

  useEffect(() => {
    const fetchLangSkill = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/get-lang",
          {
            headers: {
              "employee-id": employeeId
            }
          }
        );
        const langSkill = response.data.getLang;
        setLang(
          Array.isArray(langSkill)
          ? langSkill
          : langSkill
          ? [langSkill]
          : []
        )
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching Work Experience"
        );
      }
    };
    fetchLangSkill();
  }, [employeeId]);

  const experiencePerPage = 3;

  const handleNextWorkPage = () => setWorkCurrentPage((prev) => prev + 1);
  const handlePrevWorkPage = () => setWorkCurrentPage((prev) => prev - 1);
  const handleNextEduPage = () => setEduCurrentPage((prev) => prev + 1);
  const handlePrevEduPage = () => setEduCurrentPage((prev) => prev - 1);
  const handleNextLangPage = () => setLangCurrentPage((prev) => prev + 1);
  const handlePrevLangPage = () => setLangCurrentPage((prev) => prev - 1);

  const displayedWork = work.slice(
    workCurrentPage * experiencePerPage,
    workCurrentPage * experiencePerPage + experiencePerPage
  );
  const displayedEdu = edu.slice(
    eduCurrentPage * experiencePerPage,
    eduCurrentPage * experiencePerPage + experiencePerPage
  );
  const displayedLang = lang.slice(
    langCurrentPage * experiencePerPage,
    langCurrentPage * experiencePerPage + experiencePerPage
  );

  const handleDelete = async (id, endpoint) => {
    if (
      !window.confirm("Are you sure you want to delete this Work Experience ?")
    )
      return;
    setSuccess("");
    setError("");

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/user/${endpoint}/${id}`,
        {
          headers: {
            "employee-id": employeeId,
          },
        }
      );
      setSuccess(response.data.message);
      window.location.reload();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to delete Work Experience"
      );
    }
  };

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
                {displayedWork.length > 0 ? (
                  displayedWork.map((workExperience) => (
                    <tr key={workExperience._id}>
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
                          onClick={() => handleWorkEdit(workExperience._id)}
                          className="px-2 py-1 bg-green-500 text-white hover:bg-green-600 transition duration-200
          rounded-lg text-xs sm:inline-block"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(workExperience._id, "delete-work")
                          }
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
              <PaginationControls
                currentPage={workCurrentPage}
                totalItems={work.length}
                itemsPerPage={experiencePerPage}
                onNext={handleNextWorkPage}
                onPrev={handlePrevWorkPage}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mt-5 p-6 lg:p-5 w-full font-body mx-auto rounded-xl shadow-md overflow-auto">
        <h2 className="text-base lg:text-sm font-semibold mb-4">
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
              {displayedEdu.length > 0 ? (
                displayedEdu.map((eduExperience) => (
                  <tr key={eduExperience._id}>
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                      {truncateText(eduExperience.institute, 20)}
                    </td>
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                      {truncateText(eduExperience.specification, 20)}
                    </td>
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                      {truncateText(eduExperience.year, 4)}
                    </td>
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                      {truncateText(eduExperience.gpa, 8)}
                    </td>
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                      {new Date(eduExperience.start).toLocaleDateString(
                        "en-US",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                      {new Date(eduExperience.end).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td
                      className="text-xs lg:space-x-2 space-y-2 text-center bg-yellow-200
      sm:table-cell sm:justify-around"
                    >
                      <button
                        onClick={() => navigate(`/admin/my-info/qualification/edu-experience/${eduExperience._id}`)}
                        className="px-2 py-1 bg-green-500 text-white hover:bg-green-600 transition duration-200
          rounded-lg text-xs sm:inline-block"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(eduExperience._id, "delete-edu")
                        }
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
        <div className="flex text-row mt-6 justify-between">
        <div className="text-sm lg:text-xs">
              <button
                onClick={() =>
                  navigate('/admin/my-info/qualification/edu-experience/')
                }
                className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-white"
              >
                Add More
              </button>
            </div>
            <div className="text-sm lg:text-xs">
              <PaginationControls
                currentPage={eduCurrentPage}
                totalItems={edu.length}
                itemsPerPage={experiencePerPage}
                onNext={handleNextEduPage}
                onPrev={handlePrevEduPage}
              />
            </div>
        </div>
      </div>
      <div className="bg-white mt-5 p-6 lg:p-5 w-full font-body mx-auto rounded-xl shadow-md overflow-auto">
        <h2 className="text-base lg:text-sm font-semibold mb-4">
          Language
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
              <tr >
                <th className="px-4 py-2 text-xs">Language</th>
                <th className="px-4 py-2 text-xs">Competency</th>
                <th className="px-4 py-2 text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedLang.length > 0 ? (
                displayedLang.map((langSkill) => (
                  <tr key={langSkill._id}>
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                        {truncateText(langSkill.language, 10)}
                      </td>
                      <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                        {truncateText(langSkill.language, 10)}
                      </td>
                      <td
                        className="text-xs lg:space-x-2 space-y-2 text-center bg-yellow-200
      sm:table-cell sm:justify-around"
                      >
                        <button
                          onClick={() => navigate(`/admin/my-info/qualification/language-skills/${langSkill._id}`)}
                          className="px-2 py-1 bg-green-500 text-white hover:bg-green-600 transition duration-200
          rounded-lg text-xs sm:inline-block"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(langSkill._id, "delete-lang")
                          }
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
              ): (
                <tr>
                <td
                  colSpan="3"
                  className="px-4 py-3 text-center text-xs bg-yellow-200"
                >
                  No records found
                </td>
              </tr>
              )
              }
            </tbody>
          </table>
        </div>
        <div className="flex flex-row mt-6 justify-between">
            <div className="text-sm lg:text-xs">
              <button
                onClick={() =>
                  navigate("/admin/my-info/qualification/language-skills/")
                }
                className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-white"
              >
                Add More
              </button>
            </div>
            <div className="text-sm lg:text-xs">
              <PaginationControls
                currentPage={langCurrentPage}
                totalItems={lang.length}
                itemsPerPage={experiencePerPage}
                onNext={handleNextLangPage}
                onPrev={handlePrevLangPage}
              />
            </div>
          </div>
      </div>
    </div>
  );
};

export default Qualification;
