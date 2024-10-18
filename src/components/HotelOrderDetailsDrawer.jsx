/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { OrderStatusToDelivered } from "../store/actions/vendor";
import { useDispatch } from "react-redux";

function HotelOrderDetailsDrawer({ isOpen, onClose, selectedOrder }) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const dispatch = useDispatch();

  // Update status when order prop is available
  useEffect(() => {
    if (selectedOrder?.orderStatusDetails?.status) {
      setSelectedStatus(selectedOrder.orderStatusDetails.status);
    }
  }, [selectedOrder]);

  // Handle dropdown status change (if needed in future)
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  // Dispatch the status update to the backend (to mark as delivered)
  useEffect(() => {
    if (selectedStatus) {
      try {
        let data = {
          orderNumber: selectedOrder?.orderNumber,
          status: selectedStatus,
        };
        dispatch(OrderStatusToDelivered(data));
      } catch (error) {
        console.log(error);
      }
    }
  }, [selectedStatus, dispatch, selectedOrder]);

  // Helper function for formatting image URLs
  function formatImageUrl(img) {
    let image = img?.substr(12);
    return (
      "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image
    );
  }

  // Get the drawer's position depending on whether it's open
  const getDrawerPosition = () => {
    return isOpen ? "translateY(0)" : "translateY(100%)";
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 bg-[#fbf5ec] shadow-lg h-[390px] border-t border-[#fbf5ec] transition-transform`}
      style={{
        transform: getDrawerPosition(),
        transition: "transform 0.3s ease-in-out", // Smooth open/close animation
      }}
    >
      {/* Header with Close Button */}
      <div className="p-4 pb-0 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Order Details</h2>
        <FiX className="cursor-pointer" size={24} onClick={onClose} />
      </div>

      {/* Main Content */}
      <div className="p-4 overflow-y-auto">
        {selectedOrder ? (
          <div className="flex">
            {/* Order Details */}
            <div className="bg-white w-[50%] h-[200px] mx-2 rounded p-2 shadow mb-2 overflow-y-auto hide-scrollbar">
              <p>
                <strong>Order Number:</strong> #{selectedOrder.orderNumber}
              </p>
              <p>
                <strong>Order Price:</strong> ₹ {selectedOrder.totalPrice}
              </p>
              <p>
                <strong>Ordered On:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
              <div>
                <strong>Status:</strong>{" "}
                {selectedStatus === "Delivered" ||
                selectedStatus === "Cancelled" ||
                selectedStatus === "Order Placed"
                  ? selectedStatus
                  : " "}
              </div>

              <p>
                <strong>Delivery Address: </strong>
                {selectedOrder?.address?.addressLine1}{" "}
                {selectedOrder?.address?.addressLine2},{" "}
                {selectedOrder?.address?.city}, {selectedOrder?.address?.state},{" "}
                {selectedOrder?.address?.pinCode}
              </p>
              <p>
                <strong>Note: </strong>
                {selectedOrder?.notes}
              </p>
            </div>

            {/* Ordered Items */}
            <div className="bg-white w-[50%] h-[200px] rounded p-2 shadow mb-2 overflow-y-auto hide-scrollbar">
              <h3>
                <strong>Ordered Items:</strong>
              </h3>
              <div className="flex flex-col space-y-4 mt-2">
                {selectedOrder.orderedItems.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <img
                      src={formatImageUrl(item?.image?.img)}
                      alt="item"
                      className="h-10 w-10 mr-4"
                    />
                    <div className="flex-grow">
                      <p>
                        <strong>{item?.itemDetails?.name}</strong>
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Price:</strong> ₹ {item?.price}
                      </p>
                      <div className="flex">
                        <p className="text-sm text-gray-500 mr-1">
                          <strong>Quantity:</strong>{" "}
                          {item?.itemDetails?.unit === "kg"
                            ? item?.quantity?.kg
                            : item?.itemDetails?.unit === "packet"
                            ? item?.quantity?.packet
                            : item?.itemDetails?.unit === "piece"
                            ? item?.quantity?.piece
                            : item?.itemDetails?.unit === "litre"
                            ? item?.quantity?.litre
                            : null}{" "}
                          {item?.itemDetails?.unit}
                        </p>
                        {item?.itemDetails?.unit === "kg" && (
                          <p className="text-sm text-gray-500">
                            {item?.quantity?.gram} grams
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>No order details available.</p>
        )}
      </div>
    </div>
  );
}

export default HotelOrderDetailsDrawer;
