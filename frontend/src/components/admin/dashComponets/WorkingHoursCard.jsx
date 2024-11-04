import React from 'react';

const WorkingHoursCard = () => {
  const data = [
    { month: "Jan", hours: 20 },
    { month: "Feb", hours: 13 },
    { month: "Mar", hours: 19 },
    { month: "Apr", hours: 23 },
    { month: "May", hours: 29 },
    { month: "Jun", hours: 42 },
    { month: "Jul", hours: 33 },
    { month: "Aug", hours: 29 },
    { month: "Sep", hours: 37 },
    { month: "Oct", hours: 46, highlight: true },
    { month: "Nov", hours: 40 },
    { month: "Dec", hours: 42 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-700">WORKING HOURS</h2>
        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
          <option>This Year</option>
          <option>Last Year</option>
        </select>
      </div>
      <div className="flex justify-between items-end space-x-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`text-sm font-bold mb-2 ${
                item.highlight ? "text-green-500" : "text-yellow-500"
              }`}
            >
              {item.hours}
            </div>
            <div
              className={`w-6 rounded-t-md ${
                item.highlight ? "bg-green-500" : "bg-yellow-400"
              }`}
              style={{ height: `${item.hours * 2}px` }} // Adjust height proportional to hours
            ></div>
            <div className="text-sm text-gray-500 mt-2">{item.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkingHoursCard;
