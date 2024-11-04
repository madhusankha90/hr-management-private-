import React from 'react';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

const QuickLaunchCard = () => {
  const items = [
    {
      label: "APPLY LEAVE",
      icon: <ExitToAppOutlinedIcon fontSize="large" className="text-white" />,
    },
    {
      label: "MY LEAVE",
      icon: <PersonRemoveAlt1OutlinedIcon fontSize="large" className="text-white" />,
    },
    {
      label: "START TIME",
      icon: <TimerOutlinedIcon fontSize="large" className="text-white" />,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="text-sm font-bold text-gray-500 mb-4">QUICK LAUNCH</div>
      <div className="flex justify-between">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-green-500 p-4 rounded-md mb-2">
              {item.icon}
            </div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLaunchCard;
