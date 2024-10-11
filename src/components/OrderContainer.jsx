import React, { useState, useEffect, useRef } from "react";
import VendorOrderDetailsDrawer from "./VendorOrderDetailsDrawer"; // Import the Drawer component

function OrderContainer({ orders = [], activeStatus }) {
  const [displayedOrders, setDisplayedOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // Store the selected order
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 7; // Number of orders to load at once
  const scrollRef = useRef(null);

  useEffect(() => {
    loadMoreOrders();
  }, [orders, activeStatus]);

  const loadMoreOrders = () => {
    const filteredOrders = orders.filter(
      (order) => order?.orderStatusDetails?.status === activeStatus
    );
    const nextOrders = filteredOrders.slice(0, currentPage * ordersPerPage);
    setDisplayedOrders(nextOrders);

    if (nextOrders.length < filteredOrders.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const getDateAndTime = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const year = createdAtDate.getFullYear();
    const month = createdAtDate.getMonth() + 1;
    const day = createdAtDate.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    return {
      date: formattedDate,
      time: createdAtDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsDrawerOpen(true); // Open the drawer
  };

  return (
    <div>
      <div
        className="flex flex-col mx-2 h-[300px] overflow-y-auto mb-20 hide-scrollbar"
        ref={scrollRef}
      >
        {/* Table header */}
        <div className="flex flex-row border border-[#00000033]">
          <div className="flex flex-col flex-1">
            <p className="border-r border-white bg-[#896439] text-center text-sm text-white p-1">
              Order Number
            </p>
          </div>
          <div className="flex flex-col flex-1">
            <p className="border-r border-white bg-[#896439] text-center text-sm text-white p-1">
              Order Date
            </p>
          </div>
          <div className="flex flex-col flex-1">
            <p className="border-r border-white bg-[#896439] text-center text-sm text-white p-1">
              Order Time
            </p>
          </div>
          <div className="flex flex-col flex-1">
            <p className="bg-[#896439] border-r border-white text-center text-sm text-white p-1">
              Price
            </p>
          </div>
          <div className="flex flex-col flex-1">
            <p className="bg-[#896439] border-r border-white text-center text-sm text-white p-1">
              Status
            </p>
          </div>
          <div className="flex flex-col flex-1">
            <p className="bg-[#896439] border-r border-white text-center text-sm text-white p-1">
              Items
            </p>
          </div>
          <div className="flex flex-col flex-1">
            <p className="bg-[#896439] text-center text-sm text-white p-1">
              Action
            </p>
          </div>
        </div>

        {/* Displaying the current page orders */}
        {displayedOrders.map((order, index) => (
          <div className="flex flex-row border border-[#00000033]" key={index}>
            <div className="flex flex-col flex-1 bg-[#FFF7EC]">
              <p className="text-center border-r border-b border-[#00000033] py-3 text-xs">
                {order?.orderNumber}
              </p>
            </div>
            <div className="flex flex-col flex-1 bg-[#FFF7EC]">
              <p className="text-center border-r border-b border-[#00000033] py-3 text-xs">
                {getDateAndTime(order?.createdAt).date}
              </p>
            </div>
            <div className="flex flex-col flex-1 bg-[#FFF7EC]">
              <p className="text-center border-r border-b border-[#00000033] py-3 text-xs">
                {getDateAndTime(order?.createdAt).time}
              </p>
            </div>
            <div className="flex flex-col flex-1 bg-[#FFF7EC]">
              <p className="text-center border-b border-r border-[#00000033] py-3 text-xs">
                ₹ {parseFloat(order?.totalPrice).toFixed(2)} /-
              </p>
            </div>
            <div className="flex flex-col flex-1 bg-[#FFF7EC]">
              <p
                className={`text-center border-b border-r border-[#00000033] py-3 text-xs ${
                  order?.orderStatusDetails?.status === "Order Placed"
                    ? "text-yellow-500"
                    : order?.orderStatusDetails?.status === "Cancelled"
                    ? "text-red-600"
                    : order?.orderStatusDetails?.status === "Delivered"
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {order?.orderStatusDetails?.status}
              </p>
            </div>
            <div className="flex flex-col flex-1 items-center justify-center border-r border-b border-[#00000033] bg-[#FFF7EC]">
              <button
                className="w-[12vh] border border-[#619524] rounded-full p-1 hover:bg-[#619524] hover:text-white text-[#619524] text-xs transition duration-200"
                onClick={() => {
                  setOrderStatus(order?.orderStatusDetails?.status)
                  handleViewDetails(order)}}
              >
                View ({order?.orderedItems.length})
              </button>
            </div>

            <div className="flex flex-col flex-1 items-center justify-center border-b border-[#00000033] bg-[#FFF7EC]">
              <button className="w-[12vh] border border-[#619524] rounded-full p-1 hover:bg-[#619524] hover:text-white text-[#619524] text-xs transition duration-200">
                Receipt
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer Component */}
      <VendorOrderDetailsDrawer
        isOpen={isDetailsDrawerOpen}
        onClose={() => setIsDetailsDrawerOpen(false)}
        selectedOrder={selectedOrder}
        activeStatus={orderStatus} // Pass activeStatus
      />
    </div>
  );
}

export default OrderContainer;
