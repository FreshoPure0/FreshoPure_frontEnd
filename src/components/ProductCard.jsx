import React from "react";
import { FiHeart } from "react-icons/fi";

function ProductCard() {
  return (
    <>
      <div className="h-48 w-fit bg-white rounded-md shadow m-2 ml-4">
        <FiHeart
          className="text-gray-600 flex float-right mr-2 mt-2 z-40"
          size={20}
          onClick={() => console.log("Wish")}
        />
        <img src="./assets/Milk.png" alt="" className="h-16 mt-9 mx-auto" />
        <p className="px-2 mt-2">Milk</p>
        <p className="px-2 font-light text-xs mb-2 text-[#619524]">
          ₹ 52/Litre
        </p>
        <button
          className="w-36 bg-[#619524] mx-2 rounded-full text-white "
          onClick={() => console.log("Add")}
        >
          Add
        </button>
      </div>
    </>
  );
}

export default ProductCard;
