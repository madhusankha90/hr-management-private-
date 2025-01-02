import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const LanguageSkill = () => {
    const {id} = useParams();
    const {employeeId} = useAuth();
    const navigate = useNavigate();

    const [isUpdating, setIsUpdating] = useState(false);
    const [language, setLanguage] = useState('');
    const [competency, setCompetency] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            setIsUpdating(true);
        } else {
            setIsUpdating(false);
        }
    })

    const baseUrl = import.meta.env.VITE_BACKEND_URL;


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        const langData = { language, competency };

        try {
            const url = isUpdating
            ? `${baseUrl}/api/user/update-lang/${id}`
            : `${baseUrl}/api/user/create-lang`;
          const method = isUpdating ? "put" : "post";
          const response = await axios[method](url, langData, {
            headers: {
              "employee-id": employeeId,
            },
          });
          setSuccess(response.data.message);
          setIsUpdating(false);
          setLanguage("");
          setCompetency("");
        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to submit Language Skills"
              );
        }
    }

  return (
    <div>
      <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
        <div className="bg-white p-6 lg:p-5 w-full font-body">
          <h2 className="text-base lg:text-sm font-semibold mb-6">
            Language Skills
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="language"
                  className="block text-xs font-semibold text-gray-700"
                >
                  Language
                </label>
                <input
                  type="text"
                  id="language"
                  placeholder="Language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="competency"
                  className="block text-xs font-semibold text-gray-700"
                >
                  Competency
                </label>
                <input
                  type="text"
                  id="competency"
                  placeholder="Competency"
                  value={competency}
                  onChange={(e) => setCompetency(e.target.value)}
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

export default LanguageSkill;
