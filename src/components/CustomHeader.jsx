/* eslint-disable no-unused-vars */
import React from "react";

import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { useWindowSize } from "react-use";

// import tw from "twrnc"; // Using tailwind for styling

const CustomHeader = ({ text, isBack }) => {
  const navigate = useNavigate();
  const { height } = useWindowSize(); // useWindowSize for the screen height

  return (
    <div
      style={{ height: height * 0.1 }}
      className="flex items-center justify-center w-full bg-white"
    >
      <div className="p-4 bg-white flex justify-center items-center flex-row relative w-full">
        {isBack && (
          <button
            className="p-4 rounded-full absolute left-2"
            onClick={() => navigate(-1)}
          >
            <IoChevronBackOutline name="chevron-back" size={24} />
          </button>
        )}

        <span className="text-xl font-light">{text}</span>
      </div>
    </div>
  );
};

export default CustomHeader;
