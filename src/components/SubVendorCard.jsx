import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import {
  removeSubVendor,
  getSubVendorItems,
  getAssignableItems,
  removeSubVendorItem,
} from "../store/actions/subvendor";
import { useDispatch, useSelector } from "react-redux";
import SubvendorAssignItemsDrawer from "./SubvendorAssignItemsDrawer"; // Import the new drawer component

function SubVendorCard(subVendor) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to manage drawer visibility
  const [isAssignDrawerOpen, setIsAssignDrawerOpen] = useState(false); // State for Assign Items Drawer
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const dispatch = useDispatch();
  const { subVendorItems, assignableItems } = useSelector(
    (state) => state.subVendor
  );

  const handleRemove = async () => {
    await dispatch(removeSubVendor(subVendor?.subVendor?._id));
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleAssignDrawer = async () => {
    setIsAssignDrawerOpen(!isAssignDrawerOpen);
    await dispatch(getAssignableItems());
  };

  const handleRemoveItem = async (subvendorId, itemId) => {
    try {
      await dispatch(removeSubVendorItem(subvendorId, itemId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // Function to filter subVendorItems based on the search query
  const filteredItems = subVendorItems?.filter(item =>
    item?.items?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function func(img) {
    let image = img?.substr(12);
    const retImage =
      "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image;
    return retImage;
  }

  return (
    <div className="w-[13vw] h-[34vh] bg-white rounded-lg shadow flex flex-col p-2 mt-4 relative">
      <FiX
        className="absolute right-3 cursor-pointer"
        size={18}
        onClick={handleRemove}
      />
      <div className="flex justify-center">
        <img src="/assets/hotel.png" alt="" className="h-20 w-fit mt-2" />
      </div>
      <div className="flex flex-col ml-2 justify-start">
        <p>{subVendor?.subVendor?.fullName}</p>
        <p className="text-sm text-gray-400">
          {subVendor?.subVendor?.subVendorCode}
        </p>
        <p className="text-sm text-gray-400">{subVendor?.subVendor?.phone}</p>
      </div>
      <button
        className="w-full bg-[#619524] mt-2 rounded-full text-white"
        onClick={() => {
          dispatch(getSubVendorItems(subVendor?.subVendor?._id));
          toggleDrawer();
        }}
      >
        View Items
      </button>

      {/* Items Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[30vw] bg-[#fbf5ec] shadow-lg p-4 z-50 transition-transform transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">SubVendor Items</h2>
          <FiX className="cursor-pointer" size={24} onClick={toggleDrawer} />
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search items..."
          className="border rounded p-1 mb-4 bg-white outline-none text-black text-xs w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex flex-col h-[calc(100vh-160px)] overflow-y-auto hide-scrollbar">
          {filteredItems.length === 0 ? (
            <p className="text-center text-gray-500">No items found</p> // Message for no items found
          ) : (
            filteredItems.map((item, index) => (
              <div
                className="flex flex-row p-1 justify-start items-start"
                key={`${index}`}
              >
                <img
                  src={func(item?.items?.image?.img)}
                  alt=""
                  className="h-10 w-10 mr-3"
                />
                <div className="flex flex-col flex-grow items-start py-2">
                  <p className="font-semibold">{item?.items?.name}</p>
                </div>
                <FiX
                  className="cursor-pointer ml-2"
                  size={18}
                  onClick={() => handleRemoveItem(item?._id, item?.items?._id)}
                />
              </div>
            ))
          )}
        </div>

        <button
          className="w-full h-8 bg-[#619524] mt-4 rounded-full text-white"
          onClick={toggleAssignDrawer} // Open the Assign Items drawer
        >
          Assign New Items
        </button>
      </div>

      {/* Background overlay to close the drawer by clicking outside */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* Assign Items Drawer */}
      <SubvendorAssignItemsDrawer
        isOpen={isAssignDrawerOpen}
        onClose={toggleAssignDrawer}
        assignableItems={assignableItems}
        vendorId={subVendor?.subVendor?._id}
      />

      {/* Background overlay for Assign Items drawer */}
      {isAssignDrawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-0 z-40"
          onClick={toggleAssignDrawer}
        ></div>
      )}
    </div>
  );
}

export default SubVendorCard;
