import React from "react";

const Apply = () => {
  return (
    <div>
      <div
        className="flex flex-col lg:flex-row mx-auto rounded-xl overflow-auto shadow-md
        bg-white p-6 lg:p-5 w-full font-primary"
      >
        <div className="flex flex-col">
          <h2 className="text-base lg:text-sm font-semibold mb-6">
            Apply Leave
          </h2>

          <form className="flex flex-col">
            <div>
              <label
                htmlFor="leave"
                className="block text-xs font-medium text-gray-700"
              >
                Select Your Leave Type
              </label>
              <input
                type="text"
                id="leave"
                placeholder="Work From Home"
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              />
            </div>
          </form>
        </div>
        <div>
            <h2 className="text-base lg:text-sm font-semibold mb-6">
                Leave Balance
            </h2>
        </div>
      </div>
    </div>
  );
};

export default Apply;
