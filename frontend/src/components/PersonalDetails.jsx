import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./context/authContext";
import man from "../imges/man.png";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const PersonalDetails = () => {
  const { userName, employeeId, _id } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [file, setFile] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [preview, setPreview] = useState("");
  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    nic: "",
    nationality: "",
    maritalStatus: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/get-personal",
          {
            headers: { "employee-id": employeeId },
          }
        );
        if (response.data.getPersonal) {
          setPersonalData(response.data.getPersonal);
          setIsUpdating(true);
        }
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching personal details"
        );
      }
    };

    fetchPersonalDetails();
  }, []);

  const handleChange = (e) => {
    setPersonalData({
      ...personalData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenderChange = (e) => {
    setPersonalData({
      ...personalData,
      gender: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isUpdating
        ? `http://localhost:5000/api/user/update-personal/${employeeId}`
        : `http://localhost:5000/api/user/create-personal/${employeeId}`;
      const method = isUpdating ? "put" : "post";

      const response = await axios[method](url, personalData, {
        headers: { "employee-id": employeeId },
      });

      setSuccess(response.data.message);
      resetForm();
      setIsUpdating(false);
    } catch (error) {
      setError(
        error.response?.data?.message || "Error Submiting personal details"
      );
    }
  };

  const resetForm = () => {
    setPersonalData({
      firstName: "",
      lastName: "",
      nic: "",
      nationality: "",
      maritalStatus: "",
      dob: "",
      gender: "",
    });
    setError("");
  };

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/upload/get-profilePic",
          {
            headers: {
              "employee-id": employeeId,
            },
          }
        );
        const profilePicUrl = response.data.profilePicPath || man; 
        setPreview(profilePicUrl);
        setIsProfileUpdating(true);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching Profile Picture"
        );
        setPreview(man);
      }
    };

    fetchProfilePic();
  }, [employeeId, refreshKey]);

  const handleProfilePic = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); 
      await handleUpload(selectedFile); 
    }
  };

  const handleUpload = async (selectedFile) => {
    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      const url = isProfileUpdating
        ? "http://localhost:5000/api/upload/update-profilePic"
        : "http://localhost:5000/api/upload/create-profilePic";
      const method = isProfileUpdating ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "employee-id": employeeId,
        },
      });
      setSuccess(
        response.data.message || "Profile picture uploaded successfully!"
      );
      setIsProfileUpdating(false);
      setPreview(response.data.profilePicPath);
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      setError(
        error.response?.data?.message || "Error uploading Profile Picture"
      );
    }
  };

  const nationalities = ["Sinhala", "Tamil", "Muslim"];

  return (
    <div>
      <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
        <div className="bg-white p-6 lg:p-5 w-full font-body">
          <h2 className="text-base lg:text-sm font-semibold mb-2 uppercase">
            {userName}
          </h2>
          <p className="text-gray-500 mb-8 text-sm lg:text-xs font-light">
            Your account is ready, you can now apply for advice...
          </p>
          {error && (
            <p className="text-red-500 mb-4 text-xs font-semibold">{error}</p>
          )}
          {success && (
            <p className="text-green-500 mb-4 text-xs font-semibold">
              {success}
            </p>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3 border-r border-gray-300  p-6 overflow-auto">
              <div className="flex flex-col items-center">
                <div className="relative inline-block">
                  <img
                    src={preview}
                    alt="Profile"
                    className="rounded-full w-28 h-28 mb-4 object-cover border border-gray-300"
                  />

                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePic}
                  />

                  <label
                    htmlFor="fileInput"
                    className="absolute bottom-3 right-0 bg-blue-500 text-white py-1 px-1 rounded-full cursor-pointer"
                  >
                    <CameraAltIcon />
                  </label>
                </div>

                <h3 className="text-base lg:text-lg font-bold">CTO</h3>
                <p className="text-gray-700 text-base lg:text-base uppercase font-semibold">
                  {personalData.firstName}
                </p>
                <p className="text-gray-500">2001-11-16</p>
                <p className="text-gray-500">Sri Lankan</p>
              </div>
            </div>

            <div className="w-full lg:w-2/3 text-sm">
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-gray-700 text-xs font-semibold"
                    >
                      Employee Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      value={personalData.firstName}
                      onChange={handleChange}
                      className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
                    />
                  </div>
                  <div className="mt-auto">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={personalData.lastName}
                      onChange={handleChange}
                      className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs font-semibold">
                      Employee Id
                    </label>
                    <input
                      type="text"
                      value={employeeId}
                      readOnly
                      className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="nic"
                      className="block text-gray-700 text-xs font-semibold"
                    >
                      NIC
                    </label>
                    <input
                      type="text"
                      id="nic"
                      name="nic"
                      placeholder="NIC Number"
                      value={personalData.nic}
                      onChange={handleChange}
                      className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="nationality"
                      className="block text-gray-700 text-xs font-semibold"
                    >
                      Nationality
                    </label>
                    <select
                      id="nationality"
                      name="nationality"
                      className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
                      value={personalData.nationality}
                      onChange={handleChange}
                    >
                      <option value="">-- Select --</option>
                      {nationalities.map((national) => (
                        <option key={national} value={national}>
                          {national}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="maritalStatus"
                      className="block text-gray-700 text-xs font-semibold"
                    >
                      Marital Status
                    </label>
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
                      value={personalData.maritalStatus}
                      onChange={handleChange}
                    >
                      <option value="">-- Select --</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="dob"
                      className="block text-gray-700 text-xs font-semibold"
                    >
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      type="date"
                      name="dob"
                      value={personalData.dob ? new Date(personalData.dob).toISOString().slice(0, 10) : ''}
                      onChange={handleChange}
                      className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs font-semibold">
                      Gender
                    </label>
                    <div className="mt-1">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={personalData.gender === "Male"}
                          onChange={handleGenderChange}
                          className="form-radio"
                        />
                        <span className="ml-2 text-xs font-medium">Male</span>
                      </label>
                      <label className="inline-flex items-center ml-6">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={personalData.gender === "Female"}
                          onChange={handleGenderChange}
                          className="form-radio"
                        />
                        <span className="ml-2 text-xs font-medium">Female</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6 text-sm md:text-xs lg:text-xs col-span-2">
                    <button
                      type="button"
                      className="w-[4rem] lg:w-[9rem] bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl font-bold"
                    >
                      Add
                    </button>
                    <button
                      type="submit"
                      className="w-[4rem] lg:w-[9rem] bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-bold"
                    >
                      {isUpdating ? "Update" : "Save"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
