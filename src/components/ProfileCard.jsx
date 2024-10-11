// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import decrypt from "../../utils/decryptService";

function ProfileCard({ image, title, text, link, isFirst }) {
  const code = decrypt(text);

  return (
    <Link to={link}>
      {/* Wrap the card in a Link component */}
      <div
        style={{ width: "232px", height: "300px" }} // Fixed width and height for the card
        className="border rounded-lg shadow-lg p-4 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 bg-white"
      >
        <div
          className={`w-full mb-4 ${
            isFirst ? "bg-[#B190B6]" : "bg-transparent"
          }`} // Apply background color only to the image wrapper
        >
          <img
            src={image}
            alt={title}
            className={`w-full object-cover ${
              isFirst
                ? "h-[200px]"
                : "max-h-[120px] max-w-[120px] object-fill scale-90 mx-auto my-10" // Set fixed height for images
            }  `}
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {code ? code : <br />}
        </p>
      </div>
    </Link>
  );
}

export default ProfileCard;
