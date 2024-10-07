import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import DetailsDrawer from "./DetailsDrawer"; // Make sure to import the DetailsDrawer component
import {downloadFromAPI} from "../../utils/downloadInvoice"

function OrderDrawer({ isOrdersDrawerOpen, setIsOrdersDrawerOpen, orders }) {
  const [selectedFilterDate, setSelectedFilterDate] = useState("");
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  console.log(orders, "orders")

  // Filter orders based on the selected date
  const filteredOrders = Array.isArray(orders?.hotelOrders)
    ? orders.hotelOrders.filter(order => {
        const orderDate = getDateAndTime(order?.createdAt).date;
        return selectedFilterDate ? orderDate === selectedFilterDate : true;
      })
    : [];


    const downloadTheInvoice = async (orderId, orderNumber) => {
      // setIsLoading(true);
      downloadFromAPI(orderId, orderNumber)
      // .then(() => {
      //   setIsLoading(false);
      // });
    };

  function getDateAndTime(createdAt) {
    const createdAtDate = new Date(createdAt);
    const year = createdAtDate.getFullYear();
    const month = createdAtDate.getMonth() + 1;
    const day = createdAtDate.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    return {
      date: formattedDate,
      time: createdAtDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  return (
    <div>
      {/* Opaque backdrop when the details drawer is open */}
      {isDetailsDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-0 z-40"
          onClick={() => setIsDetailsDrawerOpen(false)} // Close the drawer when clicking on the backdrop
        />
      )}
      
      <div
        className={`fixed top-0 h-full w-[30vw] bg-[#fbf5ec] shadow-lg p-4 z-50 transition-all duration-300 ease-in-out ${
          isOrdersDrawerOpen ? "right-0" : "right-[-100%]"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Hotel Orders</h2>
          <FiX
            className="cursor-pointer"
            size={24}
            onClick={() => setIsOrdersDrawerOpen(false)}
          />
        </div>
        <div className="flex justify-between">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Filter by Date:
            </label>
            <input
              type="date"
              value={selectedFilterDate}
              onChange={(e) => setSelectedFilterDate(e.target.value)}
              className="border rounded p-1 mt-1 bg-[#dbc7ae] outline-none text-white text-xs"
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <button
              className="p-1 border border-red-500 text-xs text-red-500 hover:bg-red-500 hover:text-white rounded transition duration-300"
              onClick={() => setSelectedFilterDate("")} // Clear filter
            >
              Clear Filter
            </button>
          </div>
        </div>
        <div className="max-h-[78vh] overflow-y-auto hide-scrollbar">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <div className="flex flex-col mb-6" key={index}>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <div className="flex flex-col mb-3">
                      <p className="text-xs text-gray-500">ORDER NUMBER</p>
                      <p className="text-xs">#{order?.orderNumber}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs text-gray-500">ORDER PRICE</p>
                      <p className="text-xs">₹ {order?.totalPrice}</p>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-col items-end mx-2">
                      <div className="flex flex-col items-end mb-3">
                        <p className="text-xs text-gray-500">ORDERED ON</p>
                        <p className="text-xs">
                          {getDateAndTime(order?.createdAt).date}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-xs text-gray-500">ITEMS</p>
                        <p className="text-xs">{order?.orderedItems.length}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex flex-col items-end mb-3">
                        <p className="text-xs text-gray-500">ORDER TIME</p>
                        <p className="text-xs">
                          {getDateAndTime(order?.createdAt).time}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-xs text-gray-500">STATUS</p>
                        <p
                          className={`text-xs ${
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
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <button
                    className="w-[48%] h-8 border border-[#619524] mt-3 rounded-full text-[#619524]"
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsDetailsDrawerOpen(true);
                    }}
                  >
                    View Details
                  </button>
                  <button
                    className="w-[48%] h-8 border border-[#619524] mt-3 rounded-full text-[#619524]"
                    onClick={() => {
                      downloadTheInvoice(order?._id, order?.orderNumber)
                    }}
                  >
                    Generate Invoice
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No orders available for the selected date.</p>
          )}
        </div>

        {/* Details Drawer */}
        <DetailsDrawer
          isDetailsDrawerOpen={isDetailsDrawerOpen}
          setIsDetailsDrawerOpen={setIsDetailsDrawerOpen}
          order={selectedOrder}
        />
      </div>
    </div>
  );
}

export default OrderDrawer;
