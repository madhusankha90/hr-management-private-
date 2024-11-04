import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const TimeAtWorkCard = () => {
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex flex-col bg-white px-5 py-8 rounded-md shadow-md max-w-sm relative">
      <div className="absolute top-2 left-2 text-sm text-gray-500">TIME AT WORK</div>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-5xl font-semibold text-black">{formattedTime}</div>
        <button className="bg-yellow-400 text-white font-semibold py-2 px-20 rounded-md mt-4 hover:bg-yellow-500"
        onClick={()=>navigate('/admin-dashboard/punchin')}
        >
          PUNCH IN
        </button>
      </div>
    </div>
  );
};

export default TimeAtWorkCard;
