import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotelItemList, getHotelOrderList } from "../store/actions/vendor";
import ItemDrawer from "./ItemDrawer";
import OrderDrawer from "./OrderDrawer";

function HotelListCard({ hotel }) {
  const [isItemsDrawerOpen, setIsItemsDrawerOpen] = useState(false);
  const [isOrdersDrawerOpen, setIsOrdersDrawerOpen] = useState(false);
  const [loadingItem, setLoadingItem] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const dispatch = useDispatch();
  const { hotelItems, hotelOrders } = useSelector((state) => state.vendor);

  const truncatedName = hotel?.hotelDetails?.fullName
    ? hotel.hotelDetails.fullName.length > 12
      ? `${hotel.hotelDetails.fullName.slice(0, 12)}...`
      : hotel.hotelDetails.fullName
    : "";

  const truncatedOrganization = hotel?.hotelDetails?.organization
    ? hotel.hotelDetails.organization.length > 16
      ? `${hotel.hotelDetails.organization.slice(0, 16)}...`
      : hotel.hotelDetails.organization
    : "";

  const HotelItemList = async () => {
    setLoadingItem(true);
    await dispatch(getHotelItemList(hotel?.hotelId));
    setIsItemsDrawerOpen(true);
    setLoadingItem(false);
  };

  const HotelOrderList = async () => {
    setLoadingOrder(true);
    await dispatch(getHotelOrderList({ HotelId: hotel?.hotelId }));
    setIsOrdersDrawerOpen(true);
    setLoadingOrder(false);
  };

  const handleOverlayClick = () => {
    setIsItemsDrawerOpen(false);
    setIsOrdersDrawerOpen(false);
  };

  return (
    <div className="bg-white min-h-[36vh] min-w-[14vw] rounded-lg shadow relative p-2 m-2">
      <div className="flex justify-center">
        <img src="/assets/hotel.png" alt="" className="h-20 w-fit mt-2 mb-1" />
      </div>
      <div className="flex flex-col ml-2 justify-start">
        <p>{truncatedName}</p>
        <p className="text-sm text-gray-400">{truncatedOrganization}</p>
      </div>

      <button
        className="w-full border border-[#619524] mt-2 rounded-full text-[#619524] min-w-[100px]"
        onClick={HotelOrderList}
        disabled={loadingOrder}
      >
        {loadingOrder ? "Loading..." : "View Orders"}
      </button>

      <button
        className="w-full bg-[#619524] mt-2 rounded-full text-white min-w-[100px]"
        onClick={HotelItemList}
        disabled={loadingItem}
      >
        {loadingItem ? "Loading..." : "View Items"}
      </button>

      {isItemsDrawerOpen || isOrdersDrawerOpen ? (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={handleOverlayClick}
        />
      ) : null}

      <ItemDrawer
        isOpen={isItemsDrawerOpen}
        onClose={() => setIsItemsDrawerOpen(false)}
        hotelItems={hotelItems}
      />
      <OrderDrawer
        isOrdersDrawerOpen={isOrdersDrawerOpen}
        setIsOrdersDrawerOpen={setIsOrdersDrawerOpen}
        orders={hotelOrders}
      />
    </div>
  );
}

export default HotelListCard;
