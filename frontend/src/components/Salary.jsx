import React from "react";

const Salary = () => {
  return (
    <div>
      <div className="mx-auto rounded-xl overflow-auto shadow-md">
        <div className="bg-white w-full p-6 lg:p-5 font-primary">
          <h2 className="text-base lg:text-sm font-semibold mb-6">
            Assigned Salary Components
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto font-secondary">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-xs">Salary Component</th>
                  <th className="px-4 py-2 text-xs">Amount</th>
                  <th className="px-4 py-2 text-xs">Currency</th>
                  <th className="px-4 py-2 text-xs">Pay Frequency</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-center text-xs bg-yellow-200">
                    No records found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salary;
