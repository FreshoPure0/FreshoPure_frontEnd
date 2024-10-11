/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useMemo } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { getProfileData, updateUserProfile } from "./../../store/actions/auth";

function PersonalInfo({ onBack }) {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  console.log(users)
  // Memoize profileDetail to avoid re-calculation on every render
  const profileDetail =  users;

  console.log("profileDetail:", profileDetail);
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    phone: "",
    email: "",
  });

  const [editableFields, setEditableFields] = useState({
    fullName: false,
    organization: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        await dispatch(getProfileData());
      } catch (error) {
        console.log(error)
      }
      
    };
    loadUserDetails();
  }, [dispatch]);

  useEffect(() => {
    if (profileDetail) {
      setFormData({
        fullName: profileDetail?.imageDetails?.fullName || "",
        organization: profileDetail?.imageDetails?.organization || "",
        phone: profileDetail?.phone || "",
        email: profileDetail?.imageDetails?.email || "",
      });
    }
  }, [profileDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePencilClick = (field) => {
    setEditableFields((prevFields) => ({
      ...prevFields,
      [field]: !prevFields[field], // Toggle the editable state for the clicked field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
  
    // Optimistically update the profileDetail with formData for immediate UI feedback
    const updatedProfileData = {
      ...profileDetail, // previous profile details
      ...formData, // updated form data
    };
  
    // Dispatch the action to update the user profile in the backend
    try {
      await dispatch(updateUserProfile(updatedProfileData));
  
      // Optimistically update the UI with the updated profile data
      setFormData(updatedProfileData);
  
      // Optionally, you can re-fetch the profile if needed
      // await dispatch(getProfileData());
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  
    // Optionally reset editable fields after submission
    setEditableFields({
      fullName: false,
      organization: false,
      phone: false,
      email: false,
    });
  };
  

  return (
    <div className="flex flex-col mt-4 p-4 bg-[#EFE5D8] h-[67vh] rounded-lg overflow-hidden overflow-y-scroll no-scrollbar">
      <div className="flex flex-row items-center">
        <FiArrowLeft
          onClick={onBack}
          className="bg-white rounded-md shadow p-1 h-7 w-7 mx-4 mt-1 mb-2 flex flex-shrink-0 cursor-pointer"
          size={20}
        />
      </div>

      <form onSubmit={handleSubmit} className="p-8 mt-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 md:ml-60 gap-y-4 gap-x-0">
          {/* Full Name */}
          <div className="relative">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <LuPencil
              className="absolute left-60 top-8 text-gray-500 cursor-pointer"
              size={20}
              onClick={() => handlePencilClick("fullName")}
            />
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={!editableFields.fullName} // Disable input if not editable
              className={`focus:ring-indigo-500 focus:border-indigo-500 block w-3/5 pl-3 pr-10 sm:text-sm border-gray-300 rounded-md mt-1 ${
                !editableFields.fullName ? "bg-gray-100" : ""
              }`}
              placeholder="Enter your full name"
            />
          </div>

          {/* Organization Name */}
          <div className="relative">
            <label
              htmlFor="organization"
              className="block text-sm font-medium text-gray-700"
            >
              Organization Name
            </label>
            <LuPencil
              className="absolute left-60  top-8 text-gray-500 cursor-pointer"
              size={20}
              onClick={() => handlePencilClick("organization")}
            />
            <input
              type="text"
              name="organization"
              id="organization"
              value={formData.organization}
              onChange={handleChange}
              disabled={!editableFields.organization}
              className={`focus:ring-indigo-500 focus:border-indigo-500 block w-3/5 pl-3 pr-10 sm:text-sm border-gray-300 rounded-md mt-1 ${
                !editableFields.organization ? "bg-gray-100" : ""
              }`}
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
              className="absolute left-60  top-8 text-gray-500 cursor-pointer"
              size={20}
              onClick={() => handlePencilClick("email")}
            />
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editableFields.email}
              className={`focus:ring-indigo-500 focus:border-indigo-500 block w-3/5 pl-3 pr-10 sm:text-sm border-gray-300 rounded-md mt-1 ${
                !editableFields.email ? "bg-gray-100" : ""
              }`}
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number */}
          <div className="relative">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <LuPencil
              className="absolute left-60  top-8 text-gray-500 cursor-pointer"
              size={20}
              onClick={() => handlePencilClick("phone")}
            />
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!editableFields.phone}
              className={`focus:ring-indigo-500 focus:border-indigo-500 block w-3/5 pl-3 pr-10 sm:text-sm border-gray-300 rounded-md mt-1 ${
                !editableFields.phone ? "bg-gray-100" : ""
              }`}
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div className="flex justify-center mt-14">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;