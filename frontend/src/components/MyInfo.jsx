import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./context/authContext";
import axios from "axios";


const MyInfo = () => {
  const navigate = useNavigate();
  const { userName, employeeId, _id } = useAuth();
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    nic: '',
    nationality: '',
    matirialStatus: '',
    dob: '',
    gender: ''
  });

  const handleChange = (e) => {
    setPersonalData({
      ...personalData,
      [e.target.name]: e.target.value,
    });
  }
  const handleGenderChange = (e) => {
    setPersonalData({
      ...personalData,
      gender: e.target.value,
    });
  }

  const createPersonalDetails = async () => {
    try {
      await axios.post('http://localhost:5000/api/user/create-personal', personalData);
      resetForm();

    } catch (error) {
      setError(error.response?.data?.message || 'error saving personal details');
    }
  }
  const updatePersonalDetails = async () => {
    try {
      await axios.put('/update-personal', personalData);
      resetForm();
    } catch (error) {
      setError(error.response?.data?.message || 'error updating personal details');
    }
  }
  const handelSubmit = (e) => {
    e.preventDefault();
    isUpdating ? updatePersonalDetails() : createPersonalDetails();
  }

  const resetForm = () => {
    setPersonalData({
      firstName: '',
      lastName: '',
      nic: '',
      nationality: '',
      matirialStatus: '',
      dob: '',
      gender: ''

    })
  }


  const nationalities = [
    "Sinhala", "Tamil", "Muslim" 
  ];


  return (
    <div>   
      <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
        <div className="bg-white p-6 lg:p-5 w-full font-primary">
          <h2 className="text-base lg:text-sm font-semibold mb-2 uppercase">{userName}</h2>
          <p className="text-gray-500 mb-8 text-sm lg:text-xs font-light">
            Your account is ready, you can now apply for advice...
          </p>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3 bg-green-50 p-6 rounded-lg overflow-auto">
              <div className="flex flex-col items-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="rounded-full w-28 h-28 mb-4"
                />
                <h3 className="text-base lg:text-base font-semibold">CTO</h3>
                <p className="text-gray-700 text-sm lg:text-sm uppercase">{userName}</p>
                <p className="text-gray-500">{employeeId}</p>
                <p className="text-gray-500">{_id}</p>
                <p className="text-gray-500">2001-11-16</p>
                <p className="text-gray-500">Sri Lankan</p>
              </div>
            </div>

            <div className="w-full lg:w-2/3 text-sm">
              <form className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-xs font-medium">Employee Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block"
                  />
                </div>
                <div className="mt-auto">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full border rounded-xl p-4 lg:p-3 mt-1 text-xs block"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-medium">Employee Id</label>
                  <input
                    type="text"
                    value={employeeId}
                    readOnly
                    className="w-full border rounded-xl p-4 lg:p-3 mt-1 text-xs block"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-medium">NIC</label>
                  <input
                    type="text"
                    placeholder="NIC Number"
                    className="w-full border rounded-xl p-4 lg:p-3 mt-1 text-xs block"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-medium">Nationality</label>
                  <select className="w-full border rounded-xl p-4 lg:p-3 mt-1 text-xs block">
                  <option value="">-- Select --</option>
                  {nationalities.map((national) => 
                    <option key={national} value={national}>{national}</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-medium">Marital Status</label>
                  <select className="w-full border rounded-xl p-4 lg:p-3 mt-1 text-xs block">
                  <option value="">-- Select --</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-medium">Date of Birth</label>
                  <input
                    type="date"
                    className="w-full border rounded-xl p-4 lg:p-3 mt-1 text-xs block"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-medium">Gender</label>
                  <div className="mt-1">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value='Male'
                        checked={personalData.gender === 'Male'}
                        onChange={handleGenderChange}
                        className="form-radio"
                      />
                      <span className="ml-2 text-xs font-medium">Male</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        name="gender"
                        value='Female'
                        checked={personalData.gender === 'Female'}
                        onChange={handleGenderChange}
                        className="form-radio"
                      />
                      <span className="ml-2 text-xs font-medium">Female</span>
                    </label>
                  </div>
                </div>
              </form>
              <div className="flex justify-between mt-6 text-sm md:text-xs lg:text-xs">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-full">
                  ADD
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-full">
                  {isUpdating ? 'Update' : 'Save'}
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
