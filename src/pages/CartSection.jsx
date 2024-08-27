import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import SearchBar from "../components/SearchBar";
import ItemContainer from "../components/ItemContainer";

function CartSection() {
  const [isEmpty, setIsEmpty] = useState(false);

  const handleClick = (link) => {
    console.log(`Image clicked: ${link}`);
  };

  return (
    <section className="flex flex-col ml-6 ">
      <div className="flex flex-row justify-between mt-10 h-fit mb-4">
        <h2 className="text-3xl font-bold mb-0">Cart Details</h2>
        <SearchBar />
      </div>
      {isEmpty ? (
        <div className="py-2 w-full h-full bg-[#EFE5D8] rounded-lg flex flex-col items-center justify-center text-center">
          <img
            src="./assets/cart.png"
            alt=""
            className="h-32 w-auto mb-3 mt-28"
          />
          <p className="font-bold ">Cart empty</p>
          <p className="mt-1">Let's change that by adding some </p>
          <p className="mb-24">items to the cart, shall we...</p>
        </div>
      ) : (
        <div className="py-2 h-[73vh] bg-[#EFE5D8] rounded-lg flex flex-col overflow-y-auto hide-scrollbar">
          <FiArrowLeft
            className="bg-white rounded-md shadow p-1 h-7 w-7 ml-4 mt-1 mb-2 flex flex-shrink-0"
            size={20}
          />
            <ItemContainer/>
            <ItemContainer/>
            <ItemContainer/>
            <ItemContainer/>
            <ItemContainer/>
            <ItemContainer/>
            <ItemContainer/>
        </div>
      )}
    </section>
  );
}

export default CartSection;
