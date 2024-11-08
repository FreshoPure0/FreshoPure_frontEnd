/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getHotelInventory,
  updateHotelInventory,
} from "../../store/actions/hotel";
import { addToWishlist } from "../../store/actions/wishlist";
import CustomHeader from "../../components/CustomHeader";
import { FiArrowLeft, FiSearch } from "react-icons/fi";

const InventorySection = ({ onBack }) => {
  const dispatch = useDispatch();
  const { inventory } = useSelector((state) => state.hotel);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getInventory = async () => {
      dispatch(getHotelInventory());
    };
    getInventory();
  }, [dispatch]);

  const filteredInventory = inventory?.filter((item) =>
    item?.itemName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <div className="flex flex-col w-full mt-5 -ml-2 sm:flex-col  bg-[#EFE5D8] min-h-[69vh] lg:h-[69vh] rounded-lg overflow-hidden overflow-y-scroll no-scrollbar">
        <div className="flex flex-col bg-white overflow-hidden">
          <div className="flex flex-row items-center mb-4">
            <FiArrowLeft
              onClick={onBack}
              className="bg-white rounded-md shadow p-1 h-7 w-7 mx-2 md:mx-4 mt-4 mb-2 flex-shrink-0"
              size={20}
            />
          </div>

          {/* Search Bar */}
          <div className="px-2 md:px-4 mb-4">
            <input
              className="border border-gray-300 rounded-md p-2 w-auto"
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Inventory List */}
          <div className="overflow-y-auto max-h-[60vh]">
            {filteredInventory?.map((item, index) => (
              <InputData item={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const InputData = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(
    item?.totalQuantity.kg ||
      item?.totalQuantity.litre ||
      item?.totalQuantity.packet ||
      item?.totalQuantity.piece
  );
  const [quantityGm, setQuantityGm] = useState(item?.totalQuantity.gram);
  const [thresholdQuantity, setThresholdQuantity] = useState(
    item?.thresholdQuantity.kg ||
      item?.thresholdQuantity.litre ||
      item?.thresholdQuantity.packet ||
      item?.thresholdQuantity.piece ||
      "0"
  );
  const [thresholdQuantityGm, setThresholdQuantityGm] = useState(
    item?.thresholdQuantity.gram
  );

  function func(img) {
    let image = img?.substr(12);
    return (
      "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image
    );
  }

  const handleWishlist = async () => {
    dispatch(addToWishlist(item?.itemId));
  };

  const handleUpdate = () => {
    const data = {
      itemId: item?.itemId,
      totalQuantity: {
        kg: item?.totalQuantity.kg ? quantity : "0",
        gram: quantityGm || "0",
        piece: item?.totalQuantity.piece || "0",
        packet: item?.totalQuantity.packet || "0",
        litre: item?.totalQuantity.litre || "0",
      },
      thresholdQuantity: {
        kg: item?.thresholdQuantity.kg ? thresholdQuantity : "0",
        gram: thresholdQuantityGm || "0",
        piece: item?.thresholdQuantity.piece || "0",
        packet: item?.thresholdQuantity.packet || "0",
        litre: item?.thresholdQuantity.litre || "0",
      },
    };

    dispatch(updateHotelInventory(data));
  };

  return (
    <div className=" border-[#54B175]  overflow-x-hidden p-1 px-2 md:px-4">
      <div className="flex flex-row items-center w-full">
        <div className="flex-shrink-0">
          <img
            src={func(item?.image)}
            alt={item?.itemName}
            className="h-14 w-14 mx-2 object-contain"
          />
        </div>
        <div className="flex flex-col flex-1 ml-2">
          <h3 className="text-base md:text-lg font-semibold">
            {item?.itemName}
          </h3>

          <div className="flex flex-row mt-1 justify-end items-end">
            <span className="mx-1">Quantity:</span>
            <input
              className="w-10 md:w-12 border mx-1 p-1 text-center rounded-sm border-[#64748B]"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <span className="text-xs mr-1">
              {item?.totalQuantity.kg
                ? "Kg"
                : item?.totalQuantity.litre
                ? "Litre"
                : item?.totalQuantity.packet
                ? "Packet"
                : "Piece"}
            </span>

            {item?.totalQuantity.kg && (
              <div className="flex items-end ml-2">
                <input
                  className="w-10 md:w-12 border mx-1 text-center p-1 rounded-sm border-[#64748B]"
                  type="number"
                  value={quantityGm}
                  onChange={(e) => setQuantityGm(e.target.value)}
                />
                <span className="text-xs mr-1">Gram</span>
              </div>
            )}
          </div>

          <div className="flex flex-row mt-1 justify-end items-end">
            <span className="mx-1">Thr. Quantity:</span>
            <input
              className="w-10 md:w-12 border mx-1 p-1 text-center rounded-sm border-[#64748B]"
              type="number"
              value={thresholdQuantity}
              onChange={(e) => setThresholdQuantity(e.target.value)}
            />
            <span className="text-xs mr-1">
              {item?.totalQuantity.kg
                ? "Kg"
                : item?.totalQuantity.litre
                ? "Litre"
                : item?.totalQuantity.packet
                ? "Packet"
                : "Piece"}
            </span>

            {item?.totalQuantity.kg && (
              <div className="flex items-end ml-2">
                <input
                  className="w-10 md:w-12 border text-center mx-1 p-1 rounded-sm border-[#64748B]"
                  type="number"
                  value={thresholdQuantityGm}
                  onChange={(e) => setThresholdQuantityGm(e.target.value)}
                />
                <span className="text-xs mr-1">Gram</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row mt-2">
        <button
          onClick={handleUpdate}
          className="bg-[#54B175] flex-1 flex justify-center items-center m-1 rounded-md p-3"
        >
          <span className="text-white font-semibold text-sm">Update</span>
        </button>

        <button
          onClick={handleWishlist}
          className="bg-[#54B175] flex-1 flex justify-center items-center m-1 rounded-md p-3"
        >
          <span className="text-white font-semibold text-sm">
            Add to Wishlist
          </span>
        </button>
      </div>
    </div>
  );
};

export default InventorySection;
