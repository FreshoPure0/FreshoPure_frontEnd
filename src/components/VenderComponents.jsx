/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/auth";

const VenderComponents = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate("/"); // Navigate to the login page
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen fixed top-0 left-0 bg-[#EFE5D8] overflow-hidden">
      <img
        src="/assets/logo_1.jpg"
        alt="logo"
        className="w-20 rounded-2xl transition-all duration-300 ease-in-out"
      />
      <h1 className="text-4xl mt-5 font-bold text-gray-700 mb-4">
        Coming Soon
      </h1>
      <p className="text-lg text-gray-600 mb-8">Stay tuned for updates!</p>

      <Link
        to="/"
        className="flex items-center justify-center mt-2 px-6 py-3  bg-[#FDFCFB] text-white font-semibold rounded-lg shadow-lg hover:bg-gradient-to-r from-orange-200 to-orange-100"
        onClick={() => {
          handleLogout();
        }}
      >
        <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">
          Logout
        </p>
      </Link>
    </div>
  );
};

export default VenderComponents;
