import React, {useState, useEffect} from "react";
import { FiX } from "react-icons/fi";
import { OrderStatusToDelivered } from "../store/actions/vendor";
import { useDispatch } from "react-redux";


function VendorOrderDetailsDrawer({ isOpen, onClose, selectedOrder, activeStatus }) {
//   console.log(selectedOrder, "order");
  const [selectedStatus, setSelectedStatus] = useState("");
  const dispatch = useDispatch()
//   console.log(selectedStatus,"status")
  // Effect to update the status when the order prop is available
  useEffect(() => {
    if (selectedOrder?.orderStatusDetails?.status) {
      setSelectedStatus(selectedOrder.orderStatusDetails.status);
    }
  }, [selectedOrder]);

  
  // Handle change for dropdown selection
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  console.log('Active Status:', activeStatus);

  const getDrawerPosition = () => {
    if (!isOpen) return "translateY(100%)"; // Hidden when closed

    // Adjust the position based on the active status
    switch (activeStatus) {
      case "Order Placed":
        return "translateY(0)"; // Open normally
      case "In Process":
        return "translateX(100%) translateY(0)"; // Open normally, but adjust if you want some animation
      case "Delivered":
        return "translateX(200%) translateY(0)"; // Open normally, similar logic
      default:
        return "translateY(100%)"; // Fallback if no valid status
    }
  };

  useEffect(() => {
    try {
      let data = {
        orderNumber: selectedOrder?.orderNumber,
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

  function func(img) {
    let image = img?.substr(12);
    return (
      "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image
    );
  }

  return (
    <div       
    className={`fixed inset-x-0 bottom-0 z-50 transition-transform bg-[#fbf5ec] shadow-lg h-[390px] border-t border-[#fbf5ec]`}
    style={{
      transform: getDrawerPosition(),
      transition: 'transform 0.3s ease-in-out', // Smooth transition
    }}
    >
      <div className="p-4 pb-0 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Order Details</h2>
        <FiX className="cursor-pointer" size={24} onClick={onClose} />
      </div>

      <div className="p-4 overflow-y-auto">
        {" "}
        {/* Ensure scrolling */}
        {selectedOrder ? (
          <div className="flex">
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
                <strong>Status: </strong>
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
                  } border-none py-0`}
                >
                  <option value={selectedStatus} className="text-xs">{selectedStatus}</option>
                  {selectedStatus !== "Delivered" && (
                    <option value="Delivered" className="text-green-600 text-xs">
                      Delivered
                    </option>
                  )}
                  {selectedStatus !== "Cancelled" && (
                    <option value="Cancelled" className="text-red-600 text-xs">
                      Cancelled
                    </option>
                  )}
                </select>{" "}
              </div>
              <p>
              <strong>Delivery Address: </strong>
              {selectedOrder?.address?.addressLine1} {selectedOrder?.address?.addressLine2},{" "}
              {selectedOrder?.address?.city}, {selectedOrder?.address?.state},{" "}
              {selectedOrder?.address?.pinCode}
            </p>
            <p>
              <strong>Note: </strong>
              {selectedOrder?.notes}
            </p>
            </div>

            <div className="bg-white w-[50%] h-[200px] rounded p-2 shadow mb-2 overflow-y-auto hide-scrollbar">
              {" "}
              {/* Limit height and scroll */}
              <h3>
                <strong>Ordered Items:</strong>
              </h3>
              <div className="flex flex-col space-y-4 mt-2">
                {selectedOrder.orderedItems.map((item, index) => (
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
          <p>No order details available.</p>
        )}
      </div>
      </div>
  );
}

export default VendorOrderDetailsDrawer;
