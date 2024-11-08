/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiX, FiTrash } from "react-icons/fi"; // Import FiTrash for the delete icon
import { useSelector, useDispatch } from "react-redux";
import {
  getAllAddress,
  removeAddress,
  addNewAddress,
  updateSelectedAddress,
} from "../../store/actions/address";

const MyAddress = ({ onBack }) => {
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    pinCode: "",
    useLine1AsDelivery: false,
    useLine2AsDelivery: false,
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedPrimaryId, setSelectedPrimaryId] = useState(null);

  const dispatch = useDispatch();
  const { allAddress, selectedAddress } = useSelector((state) => state.address);

  useEffect(() => {
    const loadUserDetails = async () => {
      await dispatch(getAllAddress());
    };
    loadUserDetails();
  }, [dispatch]);

  useEffect(() => {
    if (allAddress.length > 0) {
      const primaryAddress = allAddress.find((address) => address.selected);
      if (primaryAddress) {
        setAddress({
          line1: primaryAddress.addressLine1 || "",
          line2: primaryAddress.addressLine2 || "",
          city: primaryAddress.city || "",
          state: primaryAddress.state || "",
          pinCode: primaryAddress.pinCode || "",
          useLine1AsDelivery: primaryAddress.useLine1AsDelivery || false,
          useLine2AsDelivery: primaryAddress.useLine2AsDelivery || false,
        });
      }
    }
  }, [allAddress]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress({
      ...address,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      addNewAddress(
        address.line1,
        address.line2,
        address.state,
        address.city,
        address.pinCode
      )
    );
    setAddress({
      line1: "",
      line2: "",
      city: "",
      state: "",
      pinCode: "",
      useLine1AsDelivery: false,
      useLine2AsDelivery: false,
    });
    setIsAddingNew(false); // Close the form after submitting
  };

  const handleRemoveAddress = (addressId) => {
    dispatch(removeAddress(addressId));
  };

  const handleSetPrimary = (addressId) => {
    setSelectedPrimaryId(addressId);

    dispatch(updateSelectedAddress(addressId)).then(() => {
      setSelectedPrimaryId(null);
    });
  };

  const toggleAddNewAddress = () => {
    setIsAddingNew(!isAddingNew);
  };

  return (
    <>
      <div className="flex flex-col mt-5 -ml-2 p-4 bg-[#EFE5D8] h-[69vh] rounded-lg overflow-hidden overflow-y-scroll no-scrollbar">
        <div className="flex flex-row items-center">
          <FiArrowLeft
            onClick={onBack}
            className="bg-white rounded-md shadow p-1 h-7 w-7 mx-4 mt-1 mb-2 flex flex-shrink-0"
            size={20}
          />
        </div>

        {/* Display selected address if it exists */}
        {selectedAddress && (
          <div className="mt-4 p-4 bg-white rounded-md shadow">
            <h2 className="text-lg font-semibold">Selected Address</h2>
            <div className="mt-2">
              <strong>Address:</strong> {selectedAddress.addressLine1},{" "}
              {selectedAddress.addressLine2}, {selectedAddress.city},{" "}
              {selectedAddress.state} - {selectedAddress.pinCode}
              {selectedAddress.isPrimary && (
                <span className="text-green-500"> (Primary)</span>
              )}
            </div>
          </div>
        )}

        {/* Display list of addresses */}
        <div className="mt-4 p-4 bg-white rounded-md shadow">
          <h2 className="text-lg font-semibold">All Addresses</h2>
          <ul className="mt-2">
            {allAddress.map((addr, index) => (
              <li
                key={index}
                className="border-b py-2 flex justify-between items-center"
              >
                <div>
                  <strong>Address {index + 1}:</strong> {addr.addressLine1},{" "}
                  {addr.addressLine2}, {addr.city}, {addr.state} -{" "}
                  {addr.pinCode}
                  {addr.isPrimary && (
                    <span className="text-green-500"> (Primary)</span>
                  )}
                </div>
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    checked={selectedPrimaryId === addr._id}
                    onChange={() => handleSetPrimary(addr._id)}
                    className="h-4 w-4 text-green-500 focus:ring-green-600"
                  />
                  <FiTrash
                    onClick={() => handleRemoveAddress(addr._id)}
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    size={20}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Button to add new address */}
        <button
          onClick={toggleAddNewAddress}
          className=" bg-[#619524] text-white font-bold py-2 px-4 mt-4 rounded transition-colors duration-300"
        >
          {isAddingNew ? "Cancel" : "Add New Address"}
        </button>
      </div>

      {/* Show input form to add a new address when 'Add New Address' is clicked */}
      {isAddingNew && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow-lg relative"
          >
            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => setIsAddingNew(false)} // Close the form
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <FiX size={20} />
            </button>
            <h2 className="text-lg  font-semibold mb-4">Add New Address</h2>
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
                <div className="flex justify-start items-center">
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
                <div className="flex justify-start items-center">
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
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Ex- Mumbai"
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
                  Pin Code
                </label>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  placeholder="Ex- 400001"
                  value={address.pinCode}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-green-200"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded transition-colors duration-300"
            >
              Save Address
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default MyAddress;
