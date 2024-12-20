import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WorkExperience = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [comment, setComment] = useState('');
  

  return (
    <div>
      <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
        <div className="bg-white p-6 lg:p-5 w-full font-body">
          <h2 className="text-base lg:text-sm font-semibold mb-6">
            Work Experience
          </h2>
          <from className="flex flex-col ">
            <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="company"
                  className="block text-xs font-semibold text-gray-700"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  placeholder="Company"
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="jobtitle"
                  className="block text-xs font-semibold text-gray-700"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobtitle"
                  placeholder="Job Title"
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="from"
                  className="block text-gray-700 text-xs font-semibold"
                >
                  From Date
                </label>
                <input
                  id="from"
                  type="date"
                  // value={
                  //   personalData.dob
                  //     ? new Date(personalData.dob).toISOString().slice(0, 10)
                  //     : ""
                  // }
                  // onChange={handleChange}
                  className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
                />
              </div>
              <div>
                <label
                  htmlFor="to"
                  className="block text-gray-700 text-xs font-semibold"
                >
                  To Date
                </label>
                <input
                  id="to"
                  type="date"
                  // value={
                  //   personalData.dob
                  //     ? new Date(personalData.dob).toISOString().slice(0, 10)
                  //     : ""
                  // }
                  // onChange={handleChange}
                  className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
                />
              </div>
              <div>
                <label
                  htmlFor="comment"
                  className="block text-xs font-semibold text-gray-700"
                >
                  Comment
                </label>
                <textarea
                  type="text"
                  id="comment"
                  placeholder="Comment"
                  className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end text-sm lg:text-xs mt-6 gap-4">
            <button
                onClick={()=> navigate('/admin/my-info/qualification/')}
                className="w-[4rem] lg:w-[9rem] bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-xl font-bold"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-[4rem] lg:w-[9rem] bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-bold"
              >
                Save
              </button>
            </div>
          </from>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
