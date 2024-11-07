import React from 'react';
import { useAuth } from '../context/authContext';


const AdminHeader = ({title}) => {

  const { userName } = useAuth();

  return (
    <div className=" mx-auto w-full p-5 lg:p-5 flex justify-between items-center font-primary bg-gradient-to-r from-green-500 to-green-600">
      <div className="text-white font-semibold text-sm lg:text-base">{title}</div>
      <div className="flex items-center space-x-2">
      <div className="flex items-center">
          <img src="user-image.jpg" alt="User" className="h-6 w-6 lg:h-7 lg:w-7 rounded-full" />
          <div className="ml-4 bg-white rounded-xl py-1 px-3 text-black text-xs lg:text-xs">
            <h4>{userName}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
