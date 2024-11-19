import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";

const EmergencyDetails = () => {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleEmergency();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    setSuccess("");
    

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/create-emergency",
        {
          name,
          relationship,
          mobile,
        }, {
            headers: { 'employee-id': localStorage.getItem('employeeId') }
        }
      );
      setSuccess(response.data.message);
      setName("");
      setRelationship("");
      setMobile("");
      handleEmergency();
      
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setTimeout(() => {
        setSaving(false);
      }, 700);
    }
  };

  const handleEmergency = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:5000/api/user/get-emergency",{
            headers: { 'employee-id': localStorage.getItem('employeeId') }
          }
      );
      const user = response.data.emergencyData;
    setUsers(Array.isArray(user) ? user : user ? [user] : []);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
        <div className="bg-white p-6 lg:p-5 w-full font-primary">
          <h2 className="text-base lg:text-sm font-semibold mb-6">
            Emergency Contact Details
          </h2>

          { saving ? (
            <p className="text-green-500 mb-4 text-xs font-semibold">
              Saving Emergency Details...
            </p>
          ) : (
            <>
          {error && <p className="text-red-500 mb-4 text-xs font-semibold">{error}</p>}
          {success && <p className="text-green-500 mb-4 text-xs font-semibold">{success}</p>}
          </>
          )}

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Relationship
                </label>
                <input
                  type="text"
                  placeholder="Relationship"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Mobile
                </label>
                <input
                  type="text"
                  placeholder="Enter Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div className="text-sm lg:text-xs mt-6">
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-full">
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white mt-5 p-6 lg:p-5 w-full font-primary mx-auto rounded-xl shadow-md min-h-[10rem] lg:min-h-[18rem]">
        <h2 className="text-base lg:text-sm font-semibold mb-4">
          Records Found
        </h2>
        <div>
          <table className="min-w-full table-auto font-secondary">
            <thead>
              <tr>
                <th className="px-4 py-2 border text-xs">Name</th>
                <th className="px-4 py-2 border text-xs">Relationship</th>
                <th className="px-4 py-2 border text-xs">Mobile</th>
                <th className="px-4 py-2 border text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-8">
                    <CircularProgress />
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user, main) => (
                  <tr key={main}>
                    <td className="px-4 py-3 border text-xs">{user.name}</td>
                    <td className="px-4 py-3 border text-xs">
                      {user.relationship}
                    </td>
                    <td className="px-4 py-3 border text-xs">{user.mobile}</td>
                    <td className="border text-xs space-x-2 text-center">
                      <button
                        className="px-1 py-1 bg-blue-500 text-white hover:bg-blue-600 transition duration-200
                      rounded-2xl"
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="px-1 py-1 bg-red-500 text-white hover:bg-red-600 transition duration-200
                      rounded-2xl"
                      >
                        <DeleteIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-sm">
                    No Emergency Records Found
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

export default EmergencyDetails;
