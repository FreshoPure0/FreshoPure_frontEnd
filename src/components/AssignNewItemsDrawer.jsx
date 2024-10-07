import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { getHotelAssignableItems, addHotelItem } from "../store/actions/vendor";


function AssignNewItemsDrawer({ isOpen, onClose, assignableItems, hotelId }) {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [loadingAssign, setLoadingAssign] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { hotelAssignableItems } = useSelector((state) => state.vendor);


  const handleItemSelection = (itemId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };
  // console.log(selectedItems, "id")
  // console.log(assignableItems, "items")
  const filteredAssignableItems = assignableItems.filter(item =>
    item?.itemDetails?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const SubmitAssignItem = async () => {
    setLoadingAssign(true); // Start loading
    try {
      await dispatch(addHotelItem(selectedItems, hotelId));
      await dispatch(getHotelAssignableItems(hotelId));
    } catch (err) {
      console.error("Error adding item:", err);
    }
    setLoadingAssign(false); // End loading
  };

  return (
    <div
      className={`fixed top-0 h-full w-[30vw] bg-[#fbf5ec] shadow-lg p-4 z-50 transition-all duration-300 ease-in-out ${
        isOpen ? "right-0" : "right-[-100%]"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Assign New Items</h2>
        <FiX className="cursor-pointer" size={24} onClick={onClose} />
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by item name..."
          className="border rounded p-1 mt-1 bg-white outline-none text-black text-xs w-full"
        />
      </div>

      <div className="h-[73vh] overflow-y-auto hide-scrollbar">
        <div className="mb-4">
          <div className="space-y-2">
            {filteredAssignableItems
              ?.filter((item) => item?.itemDetails) // Ensure itemDetails is not null
              .map((item) => {
                const itemId = item?.itemDetails?._id; // Ensure unique id for each item
                const isSelected = selectedItems.includes(itemId); // Check if this item is selected

                return (
                  <div key={itemId} className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      {item?.itemDetails?.name}
                    </p>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleItemSelection(itemId)}
                      className="mr-2 rounded-lg focus:ring-[#fbf5ec] text-[#619524]"
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <button
        className="w-full h-8 bg-[#619524] mt-4 rounded-full text-white"
        onClick={SubmitAssignItem}
        disabled={loadingAssign} // Disable button while loading
      >
        {loadingAssign ? "Assigning..." : "Add Items"} {/* Show Loading */}
      </button>
    </div>
  );
}

export default AssignNewItemsDrawer;
