import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/authContext";


const MyInfo = () => {
  const navigate = useNavigate();
  // const [userName, setUserName] = useState("");
  // const [employeeId, setEmployeeId] = useState("");

  // useEffect(() => {
  //   const storedUserName = localStorage.getItem("userName");
  //   if (storedUserName) {
  //     setUserName(storedUserName);
  //   }
  // }, []);

  // useEffect(()=> {
  //   const storeemployeeId = localStorage.getItem("employeeId");
  //   if (storeemployeeId) {
  //     setEmployeeId(storeemployeeId);
  //   }
  // },[])
  const { userName, employeeId, _id, logout } = useAuth();


  return (
    <div>
      <div className="pb-5">
        <div className="container mx-auto flex justify-center items-center">
          <div className="hidden md:flex space-x-6 font-primary text-xs cursor-pointer">
            <span
              className="hover:text-gray-800 hover:bg-yellow-500 bg-white p-3 rounded-xl shadow-md
            transition duration-500 hover:ease-in-out
            "
            >
              Personal Details
            </span>
            <span
              className="hover:text-white hover:bg-yellow-500 bg-white p-3 rounded-xl shadow-md
            transition duration-500 hover:ease-in-out
            "
            >
              Contact Details
            </span>
            <span
              className="hover:text-white hover:bg-yellow-500 bg-white p-3 rounded-xl shadow-md
            transition duration-500 hover:ease-in-out
            "
            >
              Emergency Details
            </span>
            <span
              className="hover:text-white hover:bg-yellow-500 bg-white p-3 rounded-xl shadow-md
            transition duration-500 hover:ease-in-out
            "
            >
              Job
            </span>
            <span
              className="hover:text-white hover:bg-yellow-500 bg-white p-3 rounded-xl shadow-md
            transition duration-500 hover:ease-in-out
            "
            >
              Qualifications
            </span>
            <span
              className="hover:text-white hover:bg-yellow-500 bg-white p-3 rounded-xl shadow-md
            transition duration-500 hover:ease-in-out
            "
            >
              Report To
            </span>
          </div>
        </div>
      </div>
      <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
        <div className="bg-white p-5 w-full font-primary">
          <h2 className="text-base font-semibold mb-2 uppercase">{userName}</h2>
          <p className="text-gray-500 mb-8 text-sm">
            Your account is ready, you can now apply for advice...
          </p>

          <div className="flex gap-8">
            <div className="w-1/3 bg-green-50 p-6 rounded-lg">
              <div className="flex flex-col items-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="rounded-full w-28 h-28 mb-4"
                />
                <h3 className="text-xl font-semibold">CTO</h3>
                <p className="text-gray-700 uppercase">{userName}</p>
                <p className="text-gray-500">{employeeId}</p>
                <p className="text-gray-500">{_id}</p>
                <p className="text-gray-500">2001-11-16</p>
                <p className="text-gray-500">Sri Lankan</p>
              </div>
            </div>

            <div className="w-2/3 text-sm">
              <form className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700">Employee Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full border rounded-md p-2 mt-1 cursor-default"
                    readOnly
                  />
                </div>
                <div className="mt-auto">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full border rounded-md p-2 mt-1"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Employee Id</label>
                  <input
                    type="text"
                    value={employeeId}
                    className="w-full border rounded-md p-2 mt-1 bg-gray-100"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-gray-700">NIC</label>
                  <input
                    type="text"
                    value="20014567993"
                    className="w-full border rounded-md p-2 mt-1"
         
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Nationality</label>
                  <select className="w-full border rounded-md p-2 mt-1">
                    <option>Sri Lankan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700">Marital Status</label>
                  <select className="w-full border rounded-md p-2 mt-1">
                    <option>Single</option>
                    <option>Married</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    value="2001-11-16"
                    className="w-full border rounded-md p-2 mt-1 "
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Gender</label>
                  <div className="mt-1">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        className="form-radio"
                        checked
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="form-radio"
                      />
                      <span className="ml-2">Female</span>
                    </label>
                  </div>
                </div>
              </form>

              {/* Attachments and Save Buttons */}
              <div className="flex justify-between mt-6">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md">
                  ADD
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
                  SAVE
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                onClick={logout}>
                  logout
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
