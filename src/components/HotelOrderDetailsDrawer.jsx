/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { OrderStatusToDelivered, changeOrderQuantity } from "../store/actions/vendor";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function HotelOrderDetailsDrawer({ isOpen, onClose, selectedOrder, activeStatus }) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [quantities, setQuantities] = useState({});
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedOrder?.orderStatusDetails?.status) {
      setSelectedStatus(selectedOrder.orderStatusDetails.status);
    }

    const initialQuantities = {};
    selectedOrder?.orderedItems?.forEach((item) => {
      initialQuantities[item?.itemDetails?._id] = {
        kg: item?.quantity?.kg || 0,
        gram: item?.quantity?.gram || 0,
        packet: item?.quantity?.packet || 0,
        piece: item?.quantity?.piece || 0,
        litre: item?.quantity?.litre || 0,
      };
    });
    setQuantities(initialQuantities);
  }, [selectedOrder]);

  const validate = () => {
    return Object.values(quantities).every((qty) => {
      return (
        qty.kg > 0 ||
        qty.gram > 0 ||
        qty.piece > 0 ||
        qty.packet > 0 ||
        qty.litre > 0
      );
    });
  };

  const handleUpdateQuantity = async (itemId) => {
    const quantity = { ...quantities[itemId] };
  
    // Replace empty fields with 0
    for (const key in quantity) {
      if (quantity[key] === "") {
        quantity[key] = 0;
      }
    }
  
    const data = {
      itemId,
      quantity,
      orderId: selectedOrder?._id,
    };
  
    setIsLoading(true);
    try {
      dispatch(changeOrderQuantity(data));
      setTimeout(() => {
        console.log("Quantity updated successfully");
        toast.success("Quantity Updated");
      }, 500);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleQuantityChange = (itemId, field, value) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value === "" ? "" : Number(value), // Allow empty or convert to number
      },
    }));
  };
  

  const formatImageUrl = (img) => {
    let image = img?.substr(12);
    return (
      "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image
    );
  };

  const getDrawerPosition = () => {
    if (!isOpen) return "translateY(100%)";
    switch (activeStatus) {
      case "Order Placed":
        return "translateX(0)";
      case "In Process":
        return "translateX(100%) ";
      case "Delivered":
        return "translateX(200%)";
      default:
        return "translateX(0)";
    }
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 bg-[#fbf5ec] shadow-lg h-[390px] border-t border-[#fbf5ec] transition-transform`}
      style={{
        transform: getDrawerPosition(),
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <div className="p-4 pb-0 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Order Details</h2>
        <FiX className="cursor-pointer" size={24} onClick={onClose} />
      </div>

      <div className="p-4 overflow-y-auto">
        {selectedOrder ? (
          <div className="flex">
            <div className="bg-white w-[50%] h-[200px] mx-2 rounded p-2 shadow mb-2 overflow-y-auto hide-scrollbar">
              <p>
                <strong>Order Number:</strong> #{selectedOrder.orderNumber}
              </p>
              <p>
                <strong>Order Price:</strong> ₹ {parseFloat(selectedOrder.totalPrice).toFixed(2)}
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
                {selectedOrder?.address?.addressLine1} {" "}
                {selectedOrder?.address?.addressLine2}, {" "}
                {selectedOrder?.address?.city}, {selectedOrder?.address?.state}, {" "}
                {selectedOrder?.address?.pinCode}
              </p>
              <p>
                <strong>Note: </strong>
                {selectedOrder?.notes}
              </p>
            </div>

            <div className="bg-white w-[50%] h-[200px] rounded p-2 shadow mb-2 overflow-y-auto hide-scrollbar">
              <h3>
                <strong>Ordered Items:</strong>
              </h3>
              <div className="flex flex-col space-y-4 mt-2 mb-4">
                {selectedOrder.orderedItems.map((item, index) => {
                  const unit = item?.itemDetails?.unit;
                  const itemId = item?.itemDetails?._id;
                  return (
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
                          <strong>Price:</strong> ₹ {parseFloat(item?.price).toFixed(2)}
                        </p>
                        <div className="flex items-center mt-2">
                          <label className="mr-2 text-sm">Quantity:</label>
                          {unit === "kg" && (
                            <>
                              <input
                                type="number"
                                className="border rounded w-16 px-2 py-1 text-sm mr-2"
                                value={quantities[itemId]?.kg || 0}
                                onChange={(e) =>
                                  handleQuantityChange(itemId, "kg", e.target.value)
                                }
                              />
                              <span className="mr-2">kg</span>
                              <input
                                type="number"
                                className="border rounded w-16 px-2 py-1 text-sm mr-2"
                                value={quantities[itemId]?.gram || 0}
                                onChange={(e) =>
                                  handleQuantityChange(itemId, "gram", e.target.value)
                                }
                              />
                              <span>g</span>
                            </>
                          )}
                          {unit !== "kg" && (
                            <>
                              <input
                                type="number"
                                className="border rounded w-16 px-2 py-1 text-sm mr-2"
                                value={
                                  quantities[itemId]?.[unit] || 0
                                }
                                onChange={(e) =>
                                  handleQuantityChange(itemId, unit, e.target.value)
                                }
                              />
                              <span>{unit}</span>
                            </>
                          )}
                          <button
                            className="ml-4 bg-[#619524] active:bg-[#61952490] text-white text-sm px-2 py-1 rounded"
                            onClick={() => handleUpdateQuantity(itemId)}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
