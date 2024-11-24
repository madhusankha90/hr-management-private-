import React from "react";

const MyLeave = () => {
  return (
    <div>
      <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
        <div className="bg-white p-6 lg:p-5 w-full font-primary">
          <h2 className="text-base lg:text-sm font-semibold mb-6">
            My Leave List
          </h2>
          <form className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="fromdate"
                  className="block text-xs font-medium text-gray-700"
                >
                  From Date
                </label>
                <input
                  type="date"
                  id="fromdate"
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="todate"
                  className="block text-xs font-medium text-gray-700"
                >
                  To Date
                </label>
                <input
                  type="date"
                  id="todate"
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="leaveType"
                  className="block text-xs font-medium text-gray-700"
                >
                  Leave Type
                </label>
                <select
                  type="date"
                  id="leaveType"
                  placeholder="Enter Name"
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                >
                  <option value="Select">-- Select --</option>
                  <option value="Select">-- Select --</option>
                  <option value="Select">-- Select --</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end text-sm lg:text-xs mt-6 gap-4">
              <button className="w-[9rem] bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-bold">
                Reset
              </button>
              <button className="w-[9rem] bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-bold">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white mt-5 p-6 lg:p-5 w-full mx-auto rounded-xl shadow-md min-h-[10rem] lg:min-h-[18rem] overflow-auto">
      <h2 className="text-base lg:text-sm font-semibold mb-4 font-primary">
          (12356) Records Found
        </h2>
        <div className="overflow-auto">
            <table className="min-w-full table-auto font-secondary">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-xs">Date</th>
                        <th className="px-4 py-2 text-xs">Emplyee Name</th>
                        <th className="px-4 py-2 text-xs">Leave Type</th>
                        <th className="px-4 py-2 text-xs">Leave Balance</th>
                        <th className="px-4 py-2 text-xs">No of Days</th>
                        <th className="px-4 py-2 text-xs">Comments</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>

            </table>

        </div>

      </div>
    </div>
  );
};

export default MyLeave;
