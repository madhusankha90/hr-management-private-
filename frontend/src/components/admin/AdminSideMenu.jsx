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
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useAuth } from '../context/authContext';

const AdminSideMenu = ({ setActiveMenuItem }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [myInfoDropdownOpen, setMyInfoDropdownOpen] = useState(false);

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

  const toggleAdminDropdown = () => setAdminDropdownOpen(prev => !prev);
  const toggleMyInfoDropdown = () => setMyInfoDropdownOpen(prev => !prev);
  const toggleMenu = () => setMenuOpen(prev => !prev);
 

  return (
    <div className="flex font-primary text-xs md:text-sm lg:text-sm">

      <button 
        className="md:hidden p-4 focus:outline-none"
        onClick={toggleMenu}
      >
        <MenuIcon />
      </button>


      <div className={`fixed md:relative top-0 left-0 w-[70vw] md:w-[30vh] min-h-full bg-white border-r border-gray-200 transition-transform transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 flex justify-between items-center">
          <img src={w3inventor} alt="Company Logo" className="h-8" />
     
          <button className="md:hidden" onClick={toggleMenu}>
            <MenuIcon />
          </button>
        </div>

        <ul className="space-y-2">
          <li
            className={`px-6 py-2 flex items-center cursor-pointer hover:bg-green-700 focus:bg-green-500 ${adminDropdownOpen ? 'bg-green-600 text-white'
           : ''} `}
            onClick={toggleAdminDropdown}
          >
            <AdminPanelSettingsOutlinedIcon/>
            <span className="ml-2">Admin</span>
            <span className="ml-auto">
              {adminDropdownOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowRightIcon />}
            </span>
          </li>

          {adminDropdownOpen && (
            <ul className="ml-12 space-y-1/4">
              <li
                className={`px-4 py-2 cursor-pointer hover:text-green-500 ${activeSubItem === 'Search' ? 'text-green-700' : ''}`}
                onClick={() => handleNavClick('Search', '/admin/user-management/search', true)}
              >
                 Search User
              </li>
              <li
                className={`px-4 py-2 cursor-pointer hover:text-green-500 ${activeSubItem === 'Add' ? ' text-green-700' : ''}`}
                onClick={() => handleNavClick('Add', '/admin/user-management/adduser', true)}
              >
                Add User
              </li>
              <li
                className={`px-4 py-2 cursor-pointer hover:text-green-500 ${activeSubItem === 'All' ? 'text-green-700' : ''}`}
                onClick={() => handleNavClick('All', '/admin/user-management/all', true)}
              >
                All Users
              </li>
            </ul>
          )}

          <li
            className={`px-6 py-2 flex items-center cursor-pointer hover:bg-green-50 ${activeItem === 'Dashboard' ? 'bg-green-100 text-green-700' : ''}`}
            onClick={() => handleNavClick('Dashboard', '/dashboard')}
          >
            <HomeOutlinedIcon className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6'/>
            <span className="ml-2">Dashboard</span>
          </li>

          <li
            className={`px-6 py-2 flex items-center cursor-pointer hover:bg-green-50 ${activeItem === 'Leave' ? 'bg-green-100 text-green-700' : ''}`}
            onClick={() => toggleDropdown('Leave')}
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
            className={`px-6 py-2 flex items-center cursor-pointer hover:bg-green-50 ${myInfoDropdownOpen ? 'bg-green-300 text-white font-semibold' : ''}`}
            onClick={toggleMyInfoDropdown}
          >
            <Person2OutlinedIcon />
            <span className="ml-2">My Info</span>
            <span className="ml-auto">
              {myInfoDropdownOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowRightIcon />}
            </span>
          </li>
          {myInfoDropdownOpen && (
            <ul className="ml-12 space-y-1/4 transition-all duration-300 ease-in-out delay-800">
              <li
                className={`px-4 py-2 cursor-pointer hover:text-green-500 transition-all
                  duration-600 ease-in-out ${activeSubItem === 'Personal' ? 'text-green-700' : ''}`}
                onClick={() => handleNavClick('Personal', `/admin/my-info/personal/${_id}`, true)}
              >
                 Personal Details
              </li>
              <li
                className={`px-4 py-2 cursor-pointer hover:text-green-500 ${activeSubItem === 'Contact' ? ' text-green-700' : ''}`}
                onClick={() => handleNavClick('Contact', `/admin/user-management/${_id}`, true)}
              >
                Contact Details
              </li>
              <li
                className={`px-4 py-2  cursor-pointer hover:text-green-500 ${activeSubItem === 'Emergency' ? 'text-green-700' : ''}`}
                onClick={() => handleNavClick('Emergency', `/admin/user-management/${_id}`, true)}
              >
                Emergency Details
              </li>
              <li
                className={`px-4 py-2 cursor-pointer hover:text-green-500 ${activeSubItem === 'Job' ? 'text-green-700' : ''}`}
                onClick={() => handleNavClick('Job', `/admin/user-management/${_id}`, true)}
              >
                Job
              </li>
              <li
                className={`px-4 py-2 cursor-pointer hover:text-green-500 ${activeSubItem === 'Qualifications' ? 'text-green-700' : ''}`}
                onClick={() => handleNavClick('Qualifications', `/admin/user-management/${_id}`, true)}
              >
                Qualifications
              </li>
              <li
                className={`px-4 py-2 cursor-pointer hover:text-green-500 ${activeSubItem === 'Report' ? 'text-green-700' : ''}`}
                onClick={() => handleNavClick('Report', `/admin/user-management/${_id}`, true)}
              >
                Report To
              </li>
            </ul>
          )}

        </ul>
      </div>
    </div>
  );
};

export default AdminSideMenu;
