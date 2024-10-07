// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

function ProfileCard({ image, title, text, link }) {
  return (
    <Link to={link}>
      {" "}
      {/* Wrap the card in a Link component */}
      <div
        style={{ width: "232px" }} // Overall card width
        className="bg-white border rounded-lg shadow-lg p-4 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
      >
        <div className="bg-[#B190B6] w-full mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-[200px] object-cover" // Ensures the image fills the fixed height
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{text}</p>
      </div>
    </Link>
  );
}

export default ProfileCard;
