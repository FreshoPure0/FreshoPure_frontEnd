/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { getProfileData, updateUserProfile } from "./../../store/actions/auth";

function PersonalInfo({ onBack }) {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  const profileDetail = users;
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
        console.log(error);
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
    const updatedProfileData = {
      ...profileDetail,
      ...formData,
    };

    try {
      await dispatch(updateUserProfile(updatedProfileData));
      setFormData(updatedProfileData);
    } catch (error) {
      console.log("Error updating profile:", error);
    }

    setEditableFields({
      fullName: false,
      organization: false,
      phone: false,
      email: false,
    });
  };

  return (
    <div className="flex flex-col w-full mt-5 -ml-2 p-4 bg-[#EFE5D8] min-h-[69vh] lg:h-[69vh] rounded-lg overflow-hidden overflow-y-scroll no-scrollbar">
      <div className="flex items-center">
        <FiArrowLeft
          onClick={onBack}
          className="bg-white rounded-md shadow p-1 h-7 w-7 mx-4 mt-1 mb-2 flex-shrink-0 cursor-pointer"
          size={20}
        />
      </div>

      <form onSubmit={handleSubmit} className="p-4 mt-6 w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          {["fullName", "organization", "email", "phone"].map((field) => (
            <div key={field} className="relative flex items-center">
              <div className="flex-1">
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field === "fullName"
                    ? "Full Name"
                    : field === "organization"
                    ? "Organization Name"
                    : field === "email"
                    ? "Email"
                    : "Phone Number"}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={!editableFields[field]}
                  className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 sm:text-sm border-gray-300 rounded-md mt-1 ${
                    !editableFields[field] ? "bg-gray-100" : ""
                  }`}
                  placeholder={`Enter your ${
                    field === "fullName"
                      ? "full name"
                      : field === "organization"
                      ? "organization name"
                      : field === "email"
                      ? "email"
                      : "phone number"
                  }`}
                />
              </div>
              <LuPencil
                className="absolute right-2 top-9 text-gray-500 cursor-pointer"
                size={20}
                onClick={() => handlePencilClick(field)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="py-2 px-6 border rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;
