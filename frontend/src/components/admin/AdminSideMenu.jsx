import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import w3inventor from '../../imges/w3inventor.png';

import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useAuth } from '../context/authContext';

const AdminSideMenu = ({ setActiveMenuItem }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { _id } = useAuth();

  const handleNavClick = (item, route, isSubItem = false) => {
    setActiveItem(item);
    if (isSubItem) {
      setActiveSubItem(item);
    } else {
      setActiveSubItem(null);
    }
    setActiveMenuItem(item);
    navigate(route);      
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex font-primary text-xs md:text-sm lg:text-sm">
      {/* Toggle button for mobile view */}
      <button 
        className="md:hidden p-4 focus:outline-none"
        onClick={toggleMenu}
      >
        <MenuIcon />
      </button>

      {/* Sidebar */}
      <div className={`fixed md:relative top-0 left-0 w-[70vw] md:w-[30vh] min-h-full bg-white border-r border-gray-200 transition-transform transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 flex justify-between items-center">
          <img src={w3inventor} alt="Company Logo" className="h-8" />
          {/* Close button for mobile view */}
          <button className="md:hidden" onClick={toggleMenu}>
            <MenuIcon />
          </button>
        </div>

        <ul className="space-y-2">
          <li
            className={`px-6 py-2 border border-black flex items-center cursor-pointer hover:bg-green-100 focus:bg-green-500 ${activeSubItem === 'Search' || activeSubItem === 'Add' ||
              activeSubItem === 'All' ? 'bg-green-300 text-white' : ''} `}
            onClick={toggleDropdown}
          >
            <AdminPanelSettingsOutlinedIcon/>
            <span className="ml-2">Admin</span>
            <span className="ml-auto">
              {dropdownOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </span>
          </li>

          {/* Dropdown items below Admin */}
          {dropdownOpen && (
            <ul className="ml-12 space-y-1/4 border border-black">
              <li
                className={`px-4 py-2 border border-black cursor-pointer hover:text-green-500 ${activeSubItem === 'Search' ? 'text-green-700' : ''}`}
                onClick={() => handleNavClick('Search', '/admin/user-management/search', true)}
              >
                 Search User
              </li>
              <li
                className={`px-4 py-2 border border-black cursor-pointer hover:text-green-500 ${activeSubItem === 'Add' ? ' text-green-700' : ''}`}
                onClick={() => handleNavClick('Add', '/admin/user-management/adduser', true)}
              >
                Add User
              </li>
              <li
                className={`px-4 py-2 border border-black cursor-pointer hover:text-green-500 ${activeSubItem === 'All' ? 'text-green-700' : ''}`}
                onClick={() => handleNavClick('All', '/admin/user-management/all', true)}
              >
                All Users
              </li>
            </ul>
          )}

          <li
            className={`px-6 py-2 border border-black flex items-center cursor-pointer hover:bg-green-50 ${activeItem === 'Dashboard' ? 'bg-green-100 text-green-700' : ''}`}
            onClick={() => handleNavClick('Dashboard', '/dashboard')}
          >
            <HomeOutlinedIcon className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6'/>
            <span className="ml-2">Dashboard</span>
          </li>

          <li
            className={`px-6 py-2 border border-black flex items-center cursor-pointer hover:bg-green-50 ${activeItem === 'Leave' ? 'bg-green-100 text-green-700' : ''}`}
            onClick={() => toggleDropdown('Leave')}
          >
            <ExitToAppOutlinedIcon />
            <span className="ml-2">Leave</span>
            {dropdownOpen.Leave && (
              <ul className="ml-8 mt-2 space-y-1">
                <li
                  className="px-4 py-1 cursor-pointer hover:bg-green-50"
                  onClick={() => handleNavClick('LeaveSub1', '/leave/request')}
                >
                  Request Leave
                </li>
                <li
                  className="px-4 py-1 cursor-pointer hover:bg-green-50"
                  onClick={() => handleNavClick('LeaveSub2', '/leave/history')}
                >
                  Leave History
                </li>
              </ul>
            )}
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
    </div>
  );
};

export default AdminSideMenu;
