// src/components/PersonalInfo.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";

function PersonalInfo() {
  const [formData, setFormData] = useState({
    fullName: "",
    organizationName: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    console.log(formData);
  };

  return (
    <>
      <div className="flex flex-col mt-4 p-4 bg-[#EFE5D8] h-[67vh] rounded-lg overflow-hidden overflow-y-scroll no-scrollbar">
        <div className="flex flex-row items-center">
          <FiArrowLeft
            className="bg-white rounded-md shadow p-1 h-7 w-7 mx-4 mt-1 mb-2 flex flex-shrink-0"
            size={20}
          />
        </div>

        <form onSubmit={handleSubmit} className="p-8 mt-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="relative">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <LuPencil
                className="absolute right-2 top-8 text-gray-500"
                size={20}
              />
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 sm:text-sm border-gray-300 rounded-md mt-1"
                placeholder="Enter your full name"
              />
            </div>

            {/* Organization Name */}
            <div className="relative">
              <label
                htmlFor="organizationName"
                className="block text-sm font-medium text-gray-700"
              >
                Organization Name
              </label>
              <LuPencil
                className="absolute right-2 top-8 text-gray-500"
                size={20}
              />
              <input
                type="text"
                name="organizationName"
                id="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 sm:text-sm border-gray-300 rounded-md mt-1"
                placeholder="Enter your organization name"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <LuPencil
                className="absolute right-2 top-8 text-gray-500"
                size={20}
              />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 sm:text-sm border-gray-300 rounded-md mt-1"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Number */}
            <div className="relative">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <LuPencil
                className="absolute right-2 top-8 text-gray-500"
                size={20}
              />
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 sm:text-sm border-gray-300 rounded-md mt-1"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PersonalInfo;
