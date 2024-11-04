import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import w3inventor from '../../imges/w3inventor.png';

import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { useAuth } from '../context/authContext';

const AdminSideMenu = () => {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();

  const { _id } = useAuth();


  const handleNavClick = (item, route) => {
    setActiveItem(item);  // Set the active item
    navigate(route);      // Navigate to the route
  };

  return (
    <div className="w-[30vh] min-h-[100vh] min-w-[10rem] bg-white border-r border-gray-200 
    relative font-primary text-xs font-semibold border">

      <div className="p-6">
        <img src={w3inventor} alt="Company Logo" className="h-8 mb-6" />
      </div>

      <ul className="space-y-3">
      <li
          className={`px-6 py-2 flex items-center cursor-pointer hover:bg-green-50 ${activeItem === 'Usermanage' ? 'bg-green-100 text-green-700' : ''}`}
          onClick={() => handleNavClick('Usermanage', '/admin/user-management')}
        >
          <AdminPanelSettingsOutlinedIcon />
          <span className="ml-2">Admin</span>
        </li>
        <li
          className={`px-6 py-2 flex items-center cursor-pointer hover:bg-green-50 ${activeItem === 'Dashboard' ? 'bg-green-100 text-green-700' : ''}`}
          onClick={() => handleNavClick('Dashboard', '/dashboard')}
        >
          <HomeOutlinedIcon />
          <span className="ml-2">Dashboard</span>
        </li>
        <li
          className={`px-6 py-2 flex items-center cursor-pointer hover:bg-green-50 ${activeItem === 'Leave' ? 'bg-green-100 text-green-700' : ''}`}
          onClick={() => handleNavClick('Leave', '/leave')}
        >
          <ExitToAppOutlinedIcon />
          <span className="ml-2">Leave</span>
        </li>
        <li
          className={`px-6 py-2 flex items-center cursor-pointer hover:bg-green-50 ${activeItem === 'Time' ? 'bg-green-100 text-green-700' : ''}`}
          onClick={() => handleNavClick('Time', '/time')}
        >
          <AccessTimeOutlinedIcon />
          <span className="ml-2">Time</span>
        </li>
        <li
          className={`px-6 py-2 flex items-center cursor-pointer hover:bg-green-50 ${activeItem === 'Performance' ? 'bg-green-100 text-green-700' : ''}`}
          onClick={() => handleNavClick('Performance', '/performance')}
        >
          <MilitaryTechOutlinedIcon />
          <span className="ml-2">Performance</span>
        </li>
        <li
          className={`px-6 py-2 flex items-center cursor-pointer hover:bg-green-50 ${activeItem === 'Location' ? 'bg-green-100 text-green-700' : ''}`}
          onClick={() => handleNavClick('Location', '/location')}
        >
          <LocationOnOutlinedIcon />
          <span className="ml-2">Location</span>
        </li>
        <li
          className={`px-6 py-2 flex items-center cursor-pointer hover:bg-green-50 ${activeItem === 'Directory' ? 'bg-green-100 text-green-700' : ''}`}
          onClick={() => handleNavClick('Directory', '/directory')}
        >
          <ArticleOutlinedIcon />
          <span className="ml-2">Directory</span>
        </li>
        <li
          className={`px-6 py-2 flex items-center cursor-pointer hover:bg-green-50 ${activeItem === 'My Info' ? 'bg-green-100 text-green-700' : ''}`}
          onClick={() => handleNavClick('My Info', `/admin/my-info/personal/${_id}`)}
        >
          <Person2OutlinedIcon />
          <span className="ml-2">My Info</span>
        </li>
      </ul>

     
      
    </div>
  );
};

export default AdminSideMenu;
