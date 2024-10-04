import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { OrderStatusToDelivered } from "../store/actions/vendor";
import { useDispatch } from "react-redux";


function DetailsDrawer({ isDetailsDrawerOpen, setIsDetailsDrawerOpen, order }) {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("");
  console.log(selectedStatus,"status")
  // Effect to update the status when the order prop is available
  useEffect(() => {
    if (order?.orderStatusDetails?.status) {
      setSelectedStatus(order.orderStatusDetails.status);
    }
  }, [order]);

  useEffect(() => {
    try {
      let data = {
        orderNumber: order?.orderNumber,
        status: selectedStatus,
      };
      dispatch(OrderStatusToDelivered(data));
      // const timer = setTimeout(() => {
      //   handleOrderDetail();
      // }, 1000);

      // return () => clearTimeout(timer);
    } catch (error) {
      console.log(error);
    }
  }, [selectedStatus]);

  // Handle change for dropdown selection
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  function func(img) {
    let image = img?.substr(12);
    return (
      "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image
    );
  }

  return (
    <div
      className={`fixed top-0 h-full w-[30vw] bg-[#fbf5ec] shadow-lg p-4 z-50 transition-all duration-300 ease-in-out ${
        isDetailsDrawerOpen ? "right-0" : "right-[-100%]"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Order Details</h2>
        <FiX
          className="cursor-pointer"
          size={24}
          onClick={() => setIsDetailsDrawerOpen(false)}
        />
      </div>
      {order ? (
        <div>
          <div className="bg-white rounded p-2 shadow mb-2">
            <p>
              <strong>Order Number:</strong> #{order.orderNumber}
            </p>
            <p>
              <strong>Order Price:</strong> ₹ {order.totalPrice}
            </p>
            <p>
              <strong>Ordered On:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <div>
              <strong className="text-black">Status: </strong>
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className={`${
                  selectedStatus === "Order Placed"
                    ? "text-yellow-500"
                    : selectedStatus === "Cancelled"
                    ? "text-red-600"
                    : selectedStatus === "Delivered"
                    ? "text-green-600"
                    : "text-gray-600"
                } border-none `}
              >
                <option value={selectedStatus}>{selectedStatus}</option>
                {selectedStatus !== "Delivered" && (
                  <option value="Delivered" className="text-green-600">Delivered</option>
                )}
                {selectedStatus !== "Cancelled" && (
                  <option value="Cancelled" className="text-red-600">Cancelled</option>
                )}
              </select>
            </div>
          </div>

          <div className="bg-white rounded p-2 shadow mb-2">
            <p>
              <strong>Delivery Address: </strong>
              {order?.address?.addressLine1} {order?.address?.addressLine2},{" "}
              {order?.address?.city}, {order?.address?.state},{" "}
              {order?.address?.pinCode}
            </p>
          </div>

          <div className="bg-white rounded p-2 shadow mb-2">
            <p>
              <strong>Note: </strong>
              {order?.notes}
            </p>
          </div>

          <div className="bg-white rounded p-2 shadow mb-2 h-[45vh] overflow-y-auto hide-scrollbar">
            <h3>
              <strong>Ordered Items:</strong>
            </h3>

            <div className="flex flex-col space-y-4 mt-2">
              {order.orderedItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <img
                    src={func(item?.image?.img)}
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
        <p>No order selected.</p>
      )}
    </div>
  );
}

export default DetailsDrawer;
