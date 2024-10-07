import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { AddSubVendorItem } from "../store/actions/subvendor";

function SubvendorAssignItemsDrawer({ isOpen, onClose, assignableItems, vendorId }) {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [loadingAssign, setLoadingAssign] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(assignableItems);

  useEffect(() => {
    // Filter items based on search query
    if (searchQuery) {
      setFilteredItems(
        assignableItems.filter(item =>
          item?.itemDetails?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredItems(assignableItems);
    }
  }, [searchQuery, assignableItems]);

  const handleItemSelection = (itemId) => {
    setSelectedItems(prevSelected => {
      const itemExists = prevSelected.find(item => item.itemId === itemId);
      
      if (itemExists) {
        // Deselect if already selected
        return prevSelected.filter(item => item.itemId !== itemId);
      } else {
        // Add to selection
        return [...prevSelected, { itemId }];
      }
    });
  };

  const handleSubmitAssignItems = async () => {
    setLoadingAssign(true);
    try {
      // Simulate the item assignment process with a delay
      await dispatch(AddSubVendorItem(vendorId, selectedItems));
      console.log("Assigned items:", selectedItems); // Replace with actual API call
    } catch (error) {
      console.error("Error assigning items:", error);
    } finally {
      setLoadingAssign(false);
      setSelectedItems([]); // Reset selection after assigning
      onClose(); // Close the drawer after assignment
    }
  };

  console.log(selectedItems);

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

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by item name..."
        className="border rounded p-1 mt-1 mb-3 bg-white outline-none text-black text-xs w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="h-[73vh] overflow-y-auto hide-scrollbar">
        <div className="space-y-2">
          {filteredItems.length === 0 ? (
            <p className="text-center text-gray-500">No items to Assign</p> // Message for no items
          ) : (
            filteredItems.map((item) => {
              const itemId = item?.itemDetails?._id; // Ensure unique id for each item
              const isSelected = selectedItems.some(selected => selected.itemId === itemId); // Check if this item is selected

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
            })
          )}
        </div>
      </div>

      <button
        className="w-full h-8 bg-[#619524] mt-4 rounded-full text-white"
        onClick={handleSubmitAssignItems}
        disabled={loadingAssign || selectedItems.length === 0} // Disable if loading or no items selected
      >
        {loadingAssign ? "Assigning..." : "Add Items"} {/* Show Loading */}
      </button>
    </div>
  );
}

export default SubvendorAssignItemsDrawer;
