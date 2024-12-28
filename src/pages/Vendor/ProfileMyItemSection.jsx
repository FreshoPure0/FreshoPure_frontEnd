import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowLeft, FiX } from "react-icons/fi";
import VendorItemContainer from "../../components/VendorItemContainer";
import { addVendorItem, getVendorItems } from "../../store/actions/vendor";
import MyItemAssignDrawer from "../../components/MyItemAssignDrawer";

const PAGE_SIZE = 30;

function MyItemSection({ onBack }) {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // First Drawer State
  const [isAssignDrawerOpen, setIsAssignDrawerOpen] = useState(false); // Second Drawer State
  const { allVendorItems, itemsForVendor } = useSelector(
    (state) => state.vendor
  );

  useEffect(() => {
    setOffset(0);
    dispatch(getVendorItems(offset)).then(() => {
      setOffset(offset + PAGE_SIZE);
    });
  }, [dispatch]);

  const loadMore = () => {
    // if (
    //   allVendorItems.length >= PAGE_SIZE &&
    //   offset !== 0 &&
    //   allVendorItems.length % PAGE_SIZE === 0
    // ) {
      dispatch(getVendorItems(offset));
      setOffset(offset + PAGE_SIZE);
    // }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen); // Toggle First Drawer
  };

  const openAssignDrawer = () => {
    setIsAssignDrawerOpen(true); // Open Second Drawer
  };

  const closeAssignDrawer = () => {
    setIsAssignDrawerOpen(false); // Close Second Drawer
  };

  function func(img) {
    let image = img?.substr(12);
    const retImage =
      "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image;
    return retImage;
  }

  // Filter unassigned items
  const unassignedItems = itemsForVendor.filter(
    (item) =>
      !allVendorItems.some((vendorItem) => vendorItem.itemId === item._id)
  );

  return (
    <section>
      <div className="mt-5 -ml-2 p-4 w-full lg:h-[69vh] bg-[#EFE5D8] rounded-lg flex items-center justify-evenly flex-wrap overflow-y-auto hide-scrollbar">
        <div className="py-3 h-[67vh] relative p-1 flex flex-col items-center overflow-y-scroll hide-scrollbar">
          <FiArrowLeft
            onClick={onBack}
            className="bg-white rounded-md absolute left-0 shadow p-1 h-7 w-7 ml-4 mt-1 mb-2 flex flex-shrink-0"
            size={20}
          />
          <div className="flex mt-10 flex-wrap justify-evenly overflow-y-scroll hide-scrollbar">
            <VendorItemContainer Items={allVendorItems} />
          </div>
          <div className="w-full flex justify-center">
            <button
              className="w-fit mt-3 border border-[#619524] rounded-full mx-2 px-4 py-1 bg-[#619524] active:bg-[#7cba35] active:border-[#7cba35] text-white"
              onClick={loadMore}
            >
              Load More...
            </button>
            <button
              className="w-fit mt-3 border border-[#619524] rounded-full mx-2 px-4 py-1 bg-[#619524] active:bg-[#7cba35] active:border-[#7cba35] text-white"
              onClick={toggleDrawer} // Open First Drawer
            >
              View Items
            </button>
          </div>
        </div>
      </div>

      {/* First Drawer */}
      {isDrawerOpen && (
        <div className="fixed top-0 right-0 h-full w-[30vw] bg-[#fbf5ec] shadow-lg p-4 z-50 transition-transform transform translate-x-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Vendor Items</h2>
            <FiX
              className="cursor-pointer"
              size={24}
              onClick={toggleDrawer} // Close First Drawer
            />
          </div>
          <div className="flex flex-col h-[calc(100vh-160px)] overflow-y-auto hide-scrollbar">
            {allVendorItems.length === 0 ? (
              <p className="text-center text-gray-500">No items available</p>
            ) : (
              allVendorItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row p-2 justify-start items-center"
                >
                  <img
                    src={func(item?.images?.img)}
                    alt={item?.itemDetails?.name}
                    className="h-10 w-10 mr-3"
                  />
                  <div className="flex flex-col flex-grow">
                    <p className="font-semibold">{item.itemDetails.name}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            className="w-full h-8 bg-[#619524] mt-4 rounded-full text-white"
            onClick={openAssignDrawer} // Open Second Drawer
          >
            Assign New Items
          </button>
        </div>
      )}

      {/* Second Drawer */}
      <MyItemAssignDrawer
        isOpen={isAssignDrawerOpen}
        onClose={closeAssignDrawer} // Only closes the second drawer
        assignableItems={unassignedItems}
        onAssign={(selectedItemIds) => {
          selectedItemIds.forEach((itemId) => {
            dispatch(addVendorItem({ itemId }));
          });
          closeAssignDrawer(); // Close second drawer after assignment
        }}
      />
    </section>
  );
}

export default MyItemSection;