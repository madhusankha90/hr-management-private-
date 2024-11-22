import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';

const UserManagement = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const usersPerPage = 10;

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/admin/get-users', {
        userName,
        employeeId,
        userRole,
        status
      });
      const user = response.data.user;
      setUsers(Array.isArray(user) ? user : user ? [user] : []);
      setCurrentPage(0); // Reset to first page on new search
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setTimeout( ()=> {
        setLoading(false);
      },500)
    }
  };

  const handleReset = () => {
    setUserName('');
    setEmployeeId('');
    setStatus('');
    setUserRole('');
    setUsers([]);
    setCurrentPage(0);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * usersPerPage < users.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  
  const displayedUsers = users.slice(
    currentPage * usersPerPage,
    currentPage * usersPerPage + usersPerPage
  );

  return (
    <div> 
      <div className="container mx-auto font-primary overflow-auto shadow-md">
        <div className="bg-white p-6 lg:p-5 rounded-xl shadow-md">
          <h2 className="text-sm font-semibold mb-6">System Users</h2>
          {error && <p className='text-red-500 mb-4 text-xs'>{error}</p>}

          <form className='flex flex-col' onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Employee ID</label>
                <input
                  type="text"
                  placeholder="Employee Id"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="text-xs mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">User Role</label>
                <select
                  className="text-xs mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Status</label>
                <select
                  className="text-xs mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Enable">Enable</option>
                  <option value="Disable">Disable</option>
                </select>
              </div>
            </div>

            <div className="text-sm md:text-xs lg:text-xs mt-4 flex space-x-5">
              <button type='submit' className="bg-green-500 text-white px-3 py-2 rounded-full hover:bg-green-600">
                Search
              </button>
              <button type='button' className="bg-white border border-green-500 px-3 py-2 rounded-full hover:bg-yellow-500 hover:text-white hover:border-yellow-500"
                onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white mt-5 p-6 lg:p-5 rounded-xl mx-auto min-h-[10rem] lg:min-h-[18rem]">
          <div className="mt-4 text-sm md:text-xs lg:text-xs">
            <button
              className="bg-green-500 text-white px-3 py-2 rounded-full hover:bg-green-600"
              onClick={() => navigate('/admin/user-management/adduser')}
            >
              + Add
            </button>
          </div>

          <h2 className=" text-base lg:text-sm font-semibold mb-4 mt-4">({users.length}) Records Found</h2>
          <div className=''>
          <table className="min-w-full table-auto font-secondary">
            <thead>
              <tr>
                <th className="px-4 py-2 text-xs">Username</th>
                <th className="px-4 py-2 text-xs">Employee ID</th>
                <th className="px-4 py-2 text-xs">User Role</th>
                <th className="px-4 py-2 text-xs">Status</th>
                <th className="px-4 py-2 text-xs">Actions</th>
              </tr>
            </thead>

            <tbody>
              { loading ? (
                <tr>
                  <td colSpan='5' className='text-center py-8'>
                    <CircularProgress/>
                  </td>
                </tr>
              ) : displayedUsers.length > 0 ? (
                displayedUsers.map((user, index) => (
                  <tr key={index}>
                    <td className='px-4 py-3 text-xs text-center bg-yellow-200'>{user.userName}</td>
                    <td className='px-4 py-3 text-xs text-center bg-yellow-200'>{user.employeeId}</td>
                    <td className='px-4 py-3 text-xs text-center bg-yellow-200'>{user.userRole}</td>
                    <td className='px-4 py-3 text-xs text-center bg-yellow-200'>{user.status}</td>
                    <td className='text-xs space-x-2 text-center bg-yellow-200'>
                      <button className='px-1 py-1 bg-blue-500 text-white hover:bg-blue-600 transition duration-200
                      rounded-2xl'>
                        <EditIcon/>
                        </button>
                      <button className='px-1 py-1 bg-red-500 text-white hover:bg-red-600 transition duration-200
                      rounded-2xl'>
                        <DeleteIcon className='w-5 h-5'/>
                        </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-xs px-4 py-3 bg-yellow-200">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>

          <div className="mt-4">
            {currentPage > 0 && (
              <button onClick={handlePrevPage} className="mr-2 px-4 py-2 bg-yellow-500 text-gray-700 rounded-full
              hover:bg-yellow-600 text-xs hover:text-white">
                Prev
              </button>
            )}
            {(currentPage + 1) * usersPerPage < users.length && (
              <button onClick={handleNextPage} className="px-4 py-2 bg-yellow-500 text-gray-700 rounded-full
              hover:bg-yellow-600 text-xs hover:text-white">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
