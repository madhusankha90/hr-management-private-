import axios from "axios";
import React, { useState } from "react";

const AddUser = () => {
  const [userName, setUserName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("password do not match");
      setSaving(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/signup",
        {
          userName,
          employeeId,
          userRole,
          status,
          password,
        }
      );
      if (response.status === 201) {
        setUserName("");
        setEmployeeId("");
        setUserRole("");
        setStatus("");
        setPassword("");
        setConfirmPassword("");
        setSuccessMessage(response.data.message);
      } else {
        setError(error.response?.data?.message || "An error occurred");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setTimeout(() => {
        setSaving(false);
      }, 700);
    }
  };

  return (
    <div className="container mx-auto font-primary overflow-auto shadow-md">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-sm font-semibold mb-6">Add Users</h2>

        {error && (
          <p className="text-red-500 mb-4 text-xs font-semibold">{error}</p>
        )}
        {successMessage && (
          <p className="text-green-500 mb-4 text-xs font-semibold">
            {successMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="employeeId"
                className="block text-xs font-medium text-gray-700"
              >
                Employee ID
              </label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                placeholder="Enter employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="userRole"
                className="block text-xs font-medium text-gray-700"
              >
                User Role
              </label>
              <select
                id="userRole"
                name="userRole"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              >
                <option value="">-- Select --</option>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-xs font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              >
                <option value="">-- Select --</option>
                <option value="Enable">Enable</option>
                <option value="Disable">Disable</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="w-[4rem] lg:w-[9rem] py-2 bg-green-500 rounded-xl hover:bg-green-600 transition-all text-xs font-bold
              text-white"
            >
              {saving ? "Saving" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
