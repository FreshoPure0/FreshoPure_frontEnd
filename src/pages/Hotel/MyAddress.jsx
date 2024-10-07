// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";

const MyAddress = () => {
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    pinCode: "",
    useLine1AsDelivery: false,
    useLine2AsDelivery: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress({
      ...address,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleReset = () => {
    setAddress({
      line1: "",
      line2: "",
      city: "",
      state: "",
      pinCode: "",
      useLine1AsDelivery: false,
      useLine2AsDelivery: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you'd handle form submission (e.g., send data to an API)
    console.log("Address submitted:", address);
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

        <form onSubmit={handleSubmit} className=" p-8 ">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="line1"
                className="block text-sm font-medium text-gray-700"
              >
                Address line 1
              </label>
              <input
                type="text"
                id="line1"
                name="line1"
                value={address.line1}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-green-200"
              />
              <div className=" flex justify-start items-center ">
                <input
                  type="checkbox"
                  id="useLine1AsDelivery"
                  name="useLine1AsDelivery"
                  checked={address.useLine1AsDelivery}
                  onChange={handleChange}
                  className="mt-2"
                />
                <label
                  htmlFor="useLine1AsDelivery"
                  className="ml-2 mt-2 text-sm text-gray-700"
                >
                  Set this address as delivery location
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="line2"
                className="block text-sm font-medium text-gray-700"
              >
                Address line 2
              </label>
              <input
                type="text"
                id="line2"
                name="line2"
                value={address.line2}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-green-200"
              />
              <div className=" flex justify-start items-center ">
                <input
                  type="checkbox"
                  id="useLine2AsDelivery"
                  name="useLine2AsDelivery"
                  checked={address.useLine2AsDelivery}
                  onChange={handleChange}
                  className="mt-2"
                />
                <label
                  htmlFor="useLine2AsDelivery"
                  className="ml-2 mt-2 text-sm text-gray-700"
                >
                  Set this address as delivery location
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="Ex- Maharashtra"
                value={address.state}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-green-200"
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City name
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Ex- Nagpur"
                value={address.city}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-green-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label
                htmlFor="pinCode"
                className="block text-sm font-medium text-gray-700"
              >
                Pin code
              </label>
              <input
                type="number"
                id="pinCode"
                name="pinCode"
                value={address.pinCode}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-green-200"
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MyAddress;
