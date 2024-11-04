import React from 'react';
import { useAuth } from './context/authContext';

const Header = ({title}) => {

  const { userName } = useAuth();

  return (
    <div className="h-[8vh] min-h-[3rem] w-full p-4 flex justify-between items-center font-primary" style={{ backgroundColor: '#00961C' }}>
      <div className="text-white font-semibold">{title}</div>
      <div className="flex items-center space-x-2">
      <div className="flex items-center">
          <img src="user-image.jpg" alt="User" className="h-5 w-5 rounded-full" />
          <div className="ml-4 bg-white rounded-xl py-1 px-3 text-black">
            <h4 className="text-xs font-semibold uppercase">{userName}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
