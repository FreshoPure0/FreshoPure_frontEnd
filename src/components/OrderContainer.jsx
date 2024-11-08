import React, { useState, useEffect, useRef } from "react";
import HotelOrderDetailsDrawer from "./HotelOrderDetailsDrawer"; // Import the Drawer component

const ORDERS_PER_PAGE = 7; // Number of orders to load at once
const STATUS_COLORS = {
  "Order Placed": "text-yellow-500",
  Cancelled: "text-red-600",
  Delivered: "text-green-600",
  default: "text-gray-600",
};

function OrderContainer({ orders = [], activeStatus }) {
  const [displayedOrders, setDisplayedOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollRef = useRef(null);

  useEffect(() => {
    filterAndLoadOrders();
  }, [orders, activeStatus]);

  const filterAndLoadOrders = () => {
    const filteredOrders = orders.filter(
      (order) => order?.orderStatusDetails?.status === activeStatus
    );
    const nextOrders = filteredOrders.slice(0, currentPage * ORDERS_PER_PAGE);
    setDisplayedOrders(nextOrders);

    if (nextOrders.length < filteredOrders.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const getDateAndTime = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const year = createdAtDate.getFullYear();
    const month = String(createdAtDate.getMonth() + 1).padStart(2, "0");
    const day = String(createdAtDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

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
    <div className="md:overflow-x-auto">
      <div
        className="flex flex-col h-[300px] overflow-y-auto mb-20 hide-scrollbar"
        ref={scrollRef}
      >
        {/* Table header */}
        <div className="flex flex-row border border-[#00000033] text-sm min-w-[600px]">
          {[
            "Order Number",
            "Order Date",
            "Order Time",
            "Price",
            "Status",
            "Items",
            "Action",
          ].map((header, index) => (
            <div className="flex flex-col w-1/6 sm:w-1/4" key={index}>
              <p className="border-r border-white bg-[#896439] text-center text-white p-1 h-12 flex items-center justify-center">
                {header}
              </p>
            </div>
          ))}
        </div>

        {/* Displaying the current page orders */}
        {displayedOrders.map((order, index) => {
          const {
            orderNumber,
            createdAt,
            totalPrice,
            orderedItems,
            orderStatusDetails,
          } = order;
          const { date, time } = getDateAndTime(createdAt);
          const statusClass =
            STATUS_COLORS[orderStatusDetails?.status] || STATUS_COLORS.default;

          return (
            <div
              className="flex flex-col sm:flex-row border border-[#00000033] min-w-[600px]" // Minimum width to ensure horizontal scrolling
              key={index}
            >
              <div className="flex flex-col w-full sm:w-1/6 bg-[#FFF7EC]">
                <p className="text-center border-r border-b border-[#00000033] py-2 text-xs h-12 flex items-center justify-center">
                  {orderNumber.split("-").map((part, i) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < orderNumber.split("-").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
              <div className="flex flex-col w-full sm:w-1/6 bg-[#FFF7EC]">
                <p className="text-center border-r border-b border-[#00000033] py-2 text-xs h-12 flex items-center justify-center">
                  {date}
                </p>
              </div>
              <div className="flex flex-col w-full sm:w-1/6 bg-[#FFF7EC]">
                <p className="text-center border-r border-b border-[#00000033] py-2 text-xs h-12 flex items-center justify-center">
                  {time}
                </p>
              </div>
              <div className="flex flex-col w-full sm:w-1/6 bg-[#FFF7EC]">
                <p className="text-center border-b border-r border-[#00000033] py-2 text-xs h-12 flex items-center justify-center">
                  ₹ {parseFloat(totalPrice).toFixed(2)} /-
                </p>
              </div>
              <div className="flex flex-col w-full sm:w-1/6 bg-[#FFF7EC]">
                <p
                  className={`text-center border-b border-r border-[#00000033] py-2 text-xs h-12 flex items-center justify-center ${statusClass}`}
                >
                  {orderStatusDetails?.status}
                </p>
              </div>
              <div className="flex p-2 flex-col w-full sm:w-1/6 items-center justify-center border-r border-b border-[#00000033] bg-[#FFF7EC]">
                <button
                  className="w-full border border-[#619524] rounded-full p-1 hover:bg-[#619524] hover:text-white text-[#619524] text-xs shadow-md transition-transform duration-200 transform hover:scale-105 focus:scale-95"
                  onClick={() => {
                    setOrderStatus(orderStatusDetails?.status);
                    handleViewDetails(order); // Trigger view details logic
                  }}
                >
                  View ({orderedItems.length})
                </button>
              </div>

              <div className="flex p-2 flex-col w-full sm:w-1/6 items-center justify-center border-b border-[#00000033] bg-[#FFF7EC]">
                <button className="w-full border border-[#619524] rounded-full p-1 hover:bg-[#619524] hover:text-white text-[#619524] text-xs transition duration-200">
                  Receipt
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Drawer Component */}
      <HotelOrderDetailsDrawer
        isOpen={isDetailsDrawerOpen}
        onClose={() => setIsDetailsDrawerOpen(false)}
        selectedOrder={selectedOrder}
        activeStatus={orderStatus} // Pass activeStatus
      />
    </div>
  );
}

export default OrderContainer;
