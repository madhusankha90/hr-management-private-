import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DirectoryLayout from "../../layouts/DirectoryLayout";

const Directory = () => {
  return (
    <div className="flex flex-col mx-auto overflow-auto">
      
      <section className="bg-white p-6 lg:p-5 w-full font-body shadow-md rounded-xl my-auto">
        <h2 className="text-base lg:text-sm font-semibold mb-6">
          Company Directory
        </h2>
        <div className="flex flex-col lg:flex-row justify-between">
          <h2 className="text-xs font-semibold mb-4 font-body">
            (0) Records Found
          </h2>
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="text-xs lg:text-sm w-full lg:w-[50%] hover:lg:w-full pl-10 pr-4 py-2 border-2 border-green-500 focus:border-yellow-500 rounded-full focus:outline-none transition-all"
            />
            <SearchRoundedIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fontSize="small"
            />
          </div>
        </div>
      </section>

    
      <nav className="bg-white p-6 lg:p-5 w-full font-body shadow-md rounded-xl mx-auto mt-5">
        <div className="hidden md:flex space-x-4">
          {["All", "Management", "Tech", "Marketing"].map((link) => (
            <a
              key={link}
              href="/admin/directory/all-directory/"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-xs font-medium hover:bg-gray-200 transition-all"
              aria-label={link}
            >
              {link}
            </a>
          ))}
        </div>
        <DirectoryLayout/>
      </nav>
    </div>
  );
};

export default Directory;
