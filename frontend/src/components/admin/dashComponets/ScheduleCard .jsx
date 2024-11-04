import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ScheduleCard = () => {
  const [punchNotes, setPunchNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPunchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/get-punch');
        const sortedPunches = response.data.getpunches.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
        setPunchNotes(sortedPunches.slice(0, 5));
      } catch (error) {
        setError('Failed to load punches.');
        console.error(error);
      }
    };
    fetchPunchNotes();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-md">
      <h3 className="text-gray-500 text-sm font-semibold">UPCOMING SCHEDULE</h3>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mt-4 space-y-4">
        {punchNotes.map((item, index) => (
          <li key={index} className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-lg w-12 h-12 flex flex-col justify-center items-center">
              <span className="text-lg font-bold text-blue-600">{new Date(item.date).getDate()}</span>
              <span className="text-sm text-gray-500">{new Date(item.date).toLocaleString('default', { month: 'short' })}</span>
            </div>
            <div className="ml-4 flex-1">
              <h4 className="text-gray-800 font-semibold">{item.punchNote}</h4>
            </div>
            <div className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
              {item.time}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleCard;
