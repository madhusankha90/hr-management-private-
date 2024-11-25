import React from "react";

const ContactDetails = () => {

    const countries = [ 'Sri Lanka', 'America', 'New Zealand', 'Taiwan', 'Japan']


  return (
    <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
      <div className="bg-white p-6 lg:p-5 w-full font-primary">
        <h2 className="text-base lg:text-sm font-semibold mb-6">
          Contact Details
        </h2>

        <h2 className="text-base font-medium mb-3">Addrress</h2>

        <form className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Street 1
              </label>
              <input
                type="text"
                placeholder="Street Name"
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Street 2
              </label>
              <input
                type="text"
                placeholder="Street Name"
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                placeholder="Enter City Name"
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                State / Province
              </label>
              <input
                type="text"
                placeholder="Enter Province"
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Zip / Postal Code
              </label>
              <input
                type="text"
                placeholder="Enter Zip / Postal Code"
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xs font-medium">
                Country
              </label>
              <select
                name="country"
                className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
              >
                <option value="">-- Select --</option>
                {countries.map((country) => (
                    <option key={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>

      
          <h3 className="text-base font-medium mt-6 mb-3">Telephone</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            <div>
            <label className="block text-xs font-medium text-gray-700">
                Home
              </label>
            <input
              type="text"
              placeholder="Enter Home Tele"
              className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
            />
            </div>
            <div>
            <label className="block text-xs font-medium text-gray-700">
                Mobile
              </label>
            <input
              type="text"
              placeholder="Enter Mobile"
              className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"

            />
            </div>
            <div>
            <label className="block text-xs font-medium text-gray-700">
                Work
              </label>
            <input
              type="text"
              placeholder="Enter Work Tele"
              className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"

            />
            </div>
          </div>

    
          <h3 className="text-base font-medium mt-6 mb-3">Email</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div>
            <label className="block text-xs font-medium text-gray-700">
                Work Email
              </label>
            <input
              type="text"
              placeholder="Work Email"
              className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"

            />
            </div>
            <div>
            <label className="block text-xs font-medium text-gray-700">
                Other Email
              </label>
            <input
              type="text"
              placeholder="Other Email"
              className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"

            />
            </div>
          </div>

          <div className="flex justify-between items-center my-6 text-sm lg:text-xs mt-6">
            <button className="w-[4rem] lg:w-[9rem] bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl">
              Add
            </button>
            <button type="submit" className="w-[4rem] lg:w-[9rem] bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactDetails;
