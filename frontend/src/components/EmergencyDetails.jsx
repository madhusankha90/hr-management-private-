import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CircularProgress from "@mui/material/CircularProgress";

function truncateText(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

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
        },
        {
          headers: { "employee-id": localStorage.getItem("employeeId") },
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
      const response = await axios.get(
        "http://localhost:5000/api/user/get-emergency",
        {
          headers: { "employee-id": localStorage.getItem("employeeId") },
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
          {error && (
            <p className="text-red-500 mb-4 text-xs font-semibold">{error}</p>
          )}
          {success && (
            <p className="text-green-500 mb-4 text-xs font-semibold">
              {success}
            </p>
          )}

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="relationship"
                  className="block text-xs font-medium text-gray-700"
                >
                  Relationship
                </label>
                <input
                  type="text"
                  id="relationship"
                  placeholder="Relationship"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-xs font-medium text-gray-700"
                >
                  Mobile
                </label>
                <input
                  type="text"
                  id="mobile"
                  placeholder="Enter Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end text-sm lg:text-xs mt-6">
              <button className="w-[4rem] lg:w-[9rem] bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-bold">
                {saving ? "Saving" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white mt-5 p-6 lg:p-5 w-full font-primary mx-auto rounded-xl shadow-md min-h-[10rem] lg:min-h-[18rem] overflow-auto">
        <h2 className="text-base lg:text-sm font-semibold mb-4">
          ({users.length}) Records Found
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto font-secondary">
            <thead>
              <tr>
                <th className="px-4 py-2 text-xs">Name</th>
                <th className="px-4 py-2 text-xs">Relationship</th>
                <th className="px-4 py-2 text-xs">Mobile</th>
                <th className="px-4 py-2 text-xs">Action</th>
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
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                      {truncateText(user.name, 15)}
                    </td>
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                      {truncateText(user.relationship, 15)}
                    </td>
                    <td className="px-4 py-3 text-xs bg-yellow-200 text-center">
                      {truncateText(user.mobile, 15)}
                    </td>
                    <td
                      className="text-xs lg:space-x-2 space-y-2 text-center bg-yellow-200
                    sm:table-cell sm:justify-around"
                    >
                      <button
                        className="px-2 py-1 bg-green-500 text-white hover:bg-green-600 transition duration-200
                      rounded-lg text-xs sm:inline-block"
                      >
                        Edit
                      </button>
                      <button
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
                    colSpan="4"
                    className="text-center px-4 py-3 text-xs bg-yellow-200"
                  >
                    No records found
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
