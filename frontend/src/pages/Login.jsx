import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import loginImage from '../imges/login.png';
import background from '../imges/background.png';
import { useAuth } from '../components/context/authContext';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        userName,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        login(user.employeeId, user.userName, user.id, token, user.userRole);

        if (user.userRole === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute w-[90%] max-w-[357px] left-1/2 transform -translate-x-1/2 top-[15%]">
        <h1 className="text-white text-3xl font-bold text-center uppercase mb-6">
          Welcome Back
        </h1>

        <div className="flex justify-center">
          <img src={loginImage} alt="Login" className="w-40 h-40 object-contain" />
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="w-full mb-4">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full h-12 px-4 py-2 text-white bg-transparent border border-white rounded-md placeholder-white uppercase focus:outline-none focus:border-yellow-400"
            />
          </div>
          <div className="w-full mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 py-2 text-white bg-transparent border border-white rounded-md placeholder-white uppercase focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div className="flex justify-between mb-4">
            <label className="text-white text-sm">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-white text-sm underline">
              Forgot password?
            </a>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="mt-6">
            <button className="w-full h-12 bg-white text-green-700 font-semibold uppercase rounded-md shadow-md hover:bg-green-100">
              Login
            </button>
          </div>
        </form>

        {/* Signup link */}
        <p className="mt-4 text-center text-white opacity-70">
          Don’t have an account? <a href="/signup" className="underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
