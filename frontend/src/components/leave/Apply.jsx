import React, { useState, useEffect } from "react";

const Apply = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const daysArray = [];
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
      daysArray.push(i);
    }

    setDaysInMonth(daysArray);
  }, [currentDate]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
      <div className="bg-white p-6 w-full font-primary">
        <h2 className="text-base lg:text-sm font-semibold mb-6">Apply Leave</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form className="col-span-2 space-y-6">
            <div>
              <label
                htmlFor="leaveType"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Select Your Leave Type
              </label>
              <select
                id="leaveType"
                className="w-full p-4 md:p-3 lg:p-3 text-xs border border-gray-300 rounded-xl focus:border-yellow-500 focus:outline-none"
                defaultValue="Work From Home"
              >
                <option value="Work From Home">Work From Home</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
              </select>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fromDate"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  From Date
                </label>
                <input
                  id="fromDate"
                  type="date"
                  className="w-full p-4 md:p-3 lg:p-3 text-xs border border-gray-300 rounded-xl focus:border-yellow-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="toDate"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  To Date
                </label>
                <input
                  id="toDate"
                  type="date"
                  className="w-full p-4 md:p-3 lg:p-3 text-xs border border-gray-300 rounded-xl focus:border-yellow-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="comments"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Comments
              </label>
              <textarea
                id="comments"
                rows="4"
                className="w-full p-4 md:p-3 lg:p-3 text-xs border border-gray-300 rounded-xl focus:border-yellow-500 focus:outline-none"
                placeholder="Type here..."
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-2 rounded-xl hover:bg-green-600 transition duration-200 text-sm lg:text-xs"
              >
                Apply
              </button>
            </div>
          </form>

          <div className="space-y-6">
            <div>
              <h2 className="text-base lg:text-sm font-semibold text-gray-500">
                Leave Balance
              </h2>
              <p className="text-xl font-bold text-yellow-500">85 Day(s)</p>
              <p className="text-xs text-gray-500">(Work From Home)</p>
            </div>
            <div className="bg-gray-200 rounded-3xl p-4 mx-auto">
              <div className="text-center">
                <h3 className="text-base lg:text-sm font-semibold text-gray-700">
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </h3>
              </div>
              <div className="grid grid-cols-7 lg:gap-1 mt-4">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, idx) => (
                    <div
                      key={idx}
                      className="text-xs md:text-xs lg:text-xs font-semibold text-gray-500 text-center"
                    >
                      {day}
                    </div>
                  )
                )}

                {daysInMonth.map((day, idx) => (
                  <div
                    key={idx}
                    className={`text-sm lg:text-xs text-center p-1 lg:p-2 rounded-lg ${
                      day === new Date().getDate() &&
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear()
                        ? "bg-yellow-500 text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {day || ""}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;
