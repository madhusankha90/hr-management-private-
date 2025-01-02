import axios from "axios";
import React, { useEffect, useState } from "react";

const ContactDetails = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [contactData, setContactData] = useState({
    streetOne: "",
    streetTwo: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    homeTele: "",
    mobile: "",
    workTele: "",
    workEmail: "",
    otherEmail: "",
  });

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/user/get-contact`,
          {
            headers: { "employee-id": localStorage.getItem("employeeId") },
          }
        );
        if (response.data.getContact) {
          setContactData(response.data.getContact);
          setIsUpdating(true);
        }
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching personal details"
        );
      }
    };

    fetchContactDetails();
  }, []);

  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isUpdating
        ? `${baseUrl}/api/user/update-contact`
        : `${baseUrl}/api/user/create-contact`;
      const method = isUpdating ? "put" : "post";

      const response = await axios[method](url, contactData, {
        headers: { "employee-id": localStorage.getItem("employeeId") },
      });
      setSuccess(response.data.message);
      resetForm();
      setIsUpdating(false);
    } catch (error) {
      setError(
        error.response?.data?.message || "Error Submiting Contact Details"
      );
    }
  };

  const resetForm = () => {
    setContactData({
      streetOne: "",
      streetTwo: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      homeTele: "",
      mobile: "",
      workTele: "",
      workEmail: "",
      otherEmail: "",
    });
    setError("");
  };

  const countries = ["Sri Lanka", "America", "New Zealand", "Taiwan", "Japan"];

  return (
    <div className="flex mx-auto rounded-xl overflow-auto shadow-md">
      <div className="bg-white p-6 lg:p-5 w-full font-body">
        <h2 className="text-base lg:text-sm font-semibold mb-6">
          Contact Details
        </h2>
        {error && (
          <p className="text-red-500 mb-4 text-xs font-semibold">{error}</p>
        )}
        {success && (
          <p className="text-green-500 mb-4 text-xs font-semibold">{success}</p>
        )}

        <h3 className="text-sm font-semibold mb-2 text-gray-400">Addrress</h3>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="streetOne"
               className="block text-xs font-semibold text-gray-700">
                Street 1
              </label>
              <input
                type="text"
                id="streetOne"
                name="streetOne"
                placeholder="Street Name"
                value={contactData.streetOne}
                onChange={handleChange}
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="streetTwo"
               className="block text-xs font-semibold text-gray-700">
                Street 2
              </label>
              <input
                type="text"
                id="streetTwo"
                name="streetTwo"
                placeholder="Street Name"
                value={contactData.streetTwo}
                onChange={handleChange}
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="city"
               className="block text-xs font-semibold text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter City Name"
                value={contactData.city}
                onChange={handleChange}
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="state"
               className="block text-xs font-semibold text-gray-700">
                State / Province
              </label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="Enter Province"
                value={contactData.state}
                onChange={handleChange}
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="zip"
               className="block text-xs font-semibold text-gray-700">
                Zip / Postal Code
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                placeholder="Enter Zip / Postal Code"
                value={contactData.zip}
                onChange={handleChange}
                className="mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="country"
              className="block text-gray-700 text-xs font-semibold">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={contactData.country}
                onChange={handleChange}
                className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
              >
                <option value="">-- Select --</option>
                {countries.map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>

          <h3 className="text-sm font-semibold mt-6 mb-2 text-gray-400">
            Telephone
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="homeTele"
              className="block text-xs font-semibold text-gray-700">
                Home
              </label>
              <input
                type="text"
                id="homeTele"
                name="homeTele"
                placeholder="Enter Home Tele"
                value={contactData.homeTele}
                onChange={handleChange}
                className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="mobile"
              className="block text-xs font-semibold text-gray-700">
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                placeholder="Enter Mobile"
                value={contactData.mobile}
                onChange={handleChange}
                className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Work
              </label>
              <input
                type="text"
                id="workTele"
                name="workTele"
                placeholder="Enter Work Tele"
                value={contactData.workTele}
                onChange={handleChange}
                className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
              />
            </div>
          </div>

          <h3 className="text-sm font-semibold mt-6 mb-2 text-gray-400">
            Email
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div>
              <label htmlFor="workEmail"
              className="block text-xs font-semibold text-gray-700">
                Work Email
              </label>
              <input
                type="text"
                id="workEmail"
                name="workEmail"
                placeholder="Work Email"
                value={contactData.workEmail}
                onChange={handleChange}
                className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Other Email
              </label>
              <input
                type="text"
                id="otherEmail"
                name="otherEmail"
                placeholder="Other Email"
                value={contactData.otherEmail}
                onChange={handleChange}
                className="w-full border focus:border-yellow-500 rounded-xl p-4 lg:p-3 mt-1 text-xs block focus:outline-none border-gray-300"
              />
            </div>
          </div>

          <div className="flex justify-between items-center my-6 text-sm lg:text-xs mt-6">
            <button className="w-[4rem] lg:w-[9rem] bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl font-bold">
              Add
            </button>
            <button
              type="submit"
              className="w-[4rem] lg:w-[9rem] bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-bold"
            >
              {isUpdating ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactDetails;
