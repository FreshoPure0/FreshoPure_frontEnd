import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHotelAssignableItems,
  UpdateFixedItemPrice,
  deleteHotelItem,
} from "../store/actions/vendor";
import { FiCheck, FiX } from "react-icons/fi";
import AssignNewItemsDrawer from "./AssignNewItemsDrawer";

function ItemDrawer({ isOpen, onClose, hotelItems }) {
  const [loadingAssignItem, setLoadingAssignItem] = useState(false);
  const [isAssignNewItemsDrawerOpen, setIsAssignNewItemsDrawerOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [prices, setPrices] = useState({});
  const [hotel, setHotel] = useState();
  const { hotelAssignableItems } = useSelector((state) => state.vendor);
  const dispatch = useDispatch();
  // console.log(prices, "//")
  // Initialize prices state based on hotelItems
  useEffect(() => {
    const initialPrices = {};
    hotelItems.forEach((item) => {
      initialPrices[item?.items?._id] = {
        itemId: item?.items?._id,
        hotelId: item?.hotelId,
        newPrice: item?.todayCostPrice, // Initial price
      };
    });
    setPrices(initialPrices);
  }, [hotelItems]);

  // Filter items based on the search query
  const filteredItems = hotelItems?.filter((item) =>
    item?.items?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const UpdateItemPrice = async (itemId) => {
    const itemToUpdate = prices[itemId];
    // console.log(itemToUpdate,"money")
    if (!itemToUpdate) return;
    try {
      await dispatch(
        UpdateFixedItemPrice({
          itemId: itemToUpdate.itemId,
          hotelId: hotelItems?.[0].hotelId,
          newPrice: itemToUpdate.newPrice,
        })
      );
    } catch (err) {
      // Handle error (optional)
    }
  };

  // Handle the action to open assign new items drawer
  const handleAssignNewItems = async () => {
    setLoadingAssignItem(true);
    setHotel(hotelItems?.[0].hotelId);
    await dispatch(getHotelAssignableItems(hotelItems?.[0].hotelId));
    setIsAssignNewItemsDrawerOpen(true);
    setLoadingAssignItem(false);
  };

  // const handleRemoveItem = async () => {
  //   // setError(null);
  //   // setIsLoading(true);
  //   try {
  //     await dispatch(deleteHotelItem(hotelItems?.[0].hotelId, item.itemId));
  //   } catch (err) {
  //     // setError(err.message);
  //     console.error(err)
  //   }
  // };

  // A function to handle the image URL
  function func(img) {
    let image = img?.substr(12);
    return (
      "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image
    );
  }

  // Close both drawers
  const handleClose = () => {
    onClose(); // Close ItemDrawer
    setIsAssignNewItemsDrawerOpen(false); // Close AssignNewItemsDrawer
  };

  // Handle price change for individual items
  const handlePriceChange = (itemId, newPrice) => {
    const parsedPrice = parseFloat(newPrice); // Convert to number, default to 0 if NaN
    setPrices((prevPrices) => ({
      ...prevPrices,
      [itemId]: {
        ...prevPrices[itemId],
        newPrice: parsedPrice,
      },
    }));
  };

  return (
    <>
      <div
        className={`fixed top-0 h-full w-[30vw] bg-[#fbf5ec] shadow-lg p-4 z-50 transition-all duration-300 ease-in-out ${
          isOpen ? "right-0" : "right-[-100%]"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Hotel Items</h2>
          <FiX className="cursor-pointer" size={24} onClick={handleClose} />
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by item name..."
            className="border rounded p-1 mt-1 bg-white outline-none text-black text-xs w-full"
          />
        </div>

        {/* Hotel Items List */}
        <div className="h-[72vh] overflow-y-auto hide-scrollbar">
          {filteredItems?.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item?.items?._id}
                className="flex flex-col p-2 mb-2 bg-white rounded shadow-sm"
              >
                <div className="flex flex-row p-1 justify-start items-start">
                  {/* Image */}
                  <img
                    src={func(item?.items?.image?.img)}
                    alt=""
                    className="h-10 w-10 mr-3"
                  />

                  {/* Item Details */}
                  <div className="flex flex-col flex-grow items-start">
                    <p className="font-semibold">{item?.items?.name}</p>

                    {/* Price */}
                    <div className="flex flex-row items-center">
                      <p className="text-xs">Current Price:</p>
                      <input
                        type="number"
                        value={prices[item?.items?._id]?.newPrice}
                        onChange={(e) =>
                          handlePriceChange(item?.items?._id, e.target.value)
                        }
                        className="w-14 bg-white border border-[#619524] rounded outline-none text-center text-xs mx-2 p-1"
                      />
                    </div>

                    {/* Profit Percentage */}
                    <div className="flex flex-row my-1">
                      <p className="text-xs mr-1">Profit Percentage: </p>
                      <p
                        className={`text-xs ${
                          item?.todayPercentageProfit < 0
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        {item?.todayPercentageProfit}%
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex mt-4">
                    <FiCheck
                      className="cursor-pointer ml-2 text-green-600"
                      size={18}
                      onClick={() => UpdateItemPrice(item?.items?._id)} // Update item price
                    />
                    <FiX
                      className="cursor-pointer ml-4"
                      size={18}
                      onClick={() =>{
                        console.log(`Deleting item with itemId: ${item?.items?._id} from hotelId: ${item?.hotelId}`);
                        dispatch(
                          deleteHotelItem(
                            item?.hotelId,
                            item?.items?._id
                          )
                        )
                      }
                      }
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items available.</p>
          )}
        </div>

        {/* Assign New Items Button */}
        <button
          className="w-full h-8 bg-[#619524] mt-4 rounded-full text-white"
          onClick={handleAssignNewItems}
          disabled={loadingAssignItem}
        >
          {loadingAssignItem ? "Loading..." : "Assign New Item"}
        </button>
      </div>

      {isAssignNewItemsDrawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-0 z-40"
          onClick={() => setIsAssignNewItemsDrawerOpen(false)}
        />
      )}

      {/* Assign New Items Drawer */}
      <AssignNewItemsDrawer
        isOpen={isAssignNewItemsDrawerOpen}
        onClose={() => setIsAssignNewItemsDrawerOpen(false)}
        assignableItems={hotelAssignableItems}
        hotelId={hotel}
      />
    </>
  );
}

export default ItemDrawer;
