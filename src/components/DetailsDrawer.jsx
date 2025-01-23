// import React, { useState, useEffect } from "react";
// import { FiX, FiCheck } from "react-icons/fi";
// import { OrderStatusToDelivered } from "../store/actions/vendor";
// import { useDispatch } from "react-redux";
// import { UpdateFixedItemPrice, UpdateFixedOrderItemPrice } from "../store/actions/vendor";

// function DetailsDrawer({ isDetailsDrawerOpen, setIsDetailsDrawerOpen, order }) {
//   const dispatch = useDispatch();
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [idItem, setIdItem] = useState(null);
//   const [updatedOrderItems, setUpdatedOrderItems] = useState(order?.orderedItems || []);
//   const [totalPrice, setTotalPrice] = useState(order?.totalPrice || 0);
//   const [updatedPrice, setupdatedPrice] = useState();
//   // console.log(selectedStatus, "status");
//   // Effect to update the status when the order prop is available
//   useEffect(() => {
//     if (order?.orderStatusDetails?.status) {
//       setSelectedStatus(order.orderStatusDetails.status);
//     }

//   }, [order]);
//   useEffect(() => {
//     const newTotalPrice = updatedOrderItems.reduce((total, item) => {
//       const itemTotal =
//         (item.quantity.kg || 0) * item.price +
//         ((item.quantity.gram || 0) / 1000) * item.price +
//         (item.quantity.piece || 0) * item.price +
//         (item.quantity.packet || 0) * item.price +
//         (item.quantity.litre || 0) * item.price;
//       return total + itemTotal;
//     }, 0);

//     setTotalPrice(newTotalPrice.toFixed(2));
//   }, [updatedOrderItems]);
//   // console.log(order?.hotelId, "HOTEL ID");

//   useEffect(() => {
//     if (selectedStatus === "Delivered") {
//       try {
//         let data = {
//           orderNumber: order?.orderNumber,
//           status: selectedStatus,
//         };
//         dispatch(OrderStatusToDelivered(data));
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }, [selectedStatus, dispatch, order?.orderNumber]);

//   const UpdateItemPrice = async () => {
//     if (!idItem || !updatedPrice) return; // Ensure item ID and price are valid

//     try {
//       await dispatch(
//         UpdateFixedOrderItemPrice({
//           itemId: idItem,
//           hotelId: order?.hotelId,
//           newPrice: updatedPrice,
//           orderId : order?._id,

//         })
//       );
//       // Update local state for item price
//       setUpdatedOrderItems((prevItems) =>
//         prevItems.map((item) =>
//           item.itemId === idItem ? { ...item, price: parseFloat(updatedPrice) } : item
//         )
//       );
//       console.log("Price updated successfully");
//       // console.log(order?.hotelId, "HOTEL ID");
//       // console.log(order?._id)

//     } catch (err) {
//       console.error("Error updating price", err);
//     }
//   };

//   // Handle change for dropdown selection
//   const handleStatusChange = (e) => {
//     setSelectedStatus(e.target.value);
//   };

//   const handlePriceChange = (itemId, price) => {
//     setIdItem(itemId);  // Store the selected item ID
//     setupdatedPrice(price);  // Store the updated price
//     console.log(itemId, price);
//   };

//   function func(img) {
//     let image = img?.substr(12);
//     return (
//       "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image
//     );
//   }

//   return (
//     <div
//       className={`fixed top-0 h-full w-[30vw] bg-[#fbf5ec] shadow-lg p-4 z-50 transition-all duration-300 ease-in-out ${
//         isDetailsDrawerOpen ? "right-0" : "right-[-100%]"
//       }`}
//     >
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Order Details</h2>
//         <FiX
//           className="cursor-pointer"
//           size={24}
//           onClick={() => setIsDetailsDrawerOpen(false)}
//         />
//       </div>
//       {order ? (
//         <div>
//           <div className="bg-white rounded p-2 shadow mb-2">
//             <p>
//               <strong>Order Number:</strong> #{order.orderNumber}
//             </p>
//             <p>
//               <strong>Order Price:</strong> ₹ {totalPrice}
//             </p>
//             <p>
//               <strong>Ordered On:</strong>{" "}
//               {new Date(order.createdAt).toLocaleString()}
//             </p>
//             <div>
//               <strong className="text-black">Status: </strong>
//               <select
//                 value={selectedStatus}
//                 onChange={handleStatusChange}
//                 className={`${
//                   selectedStatus === "Order Placed"
//                     ? "text-yellow-500"
//                     : selectedStatus === "Cancelled"
//                     ? "text-red-600"
//                     : selectedStatus === "Delivered"
//                     ? "text-green-600"
//                     : "text-gray-600"
//                 } border-none `}
//               >
//                 <option value={selectedStatus}>{selectedStatus}</option>
//                 {selectedStatus !== "Delivered" && (
//                   <option value="Delivered" className="text-green-600">
//                     Delivered
//                   </option>
//                 )}
//                 {selectedStatus !== "Cancelled" && (
//                   <option value="Cancelled" className="text-red-600">
//                     Cancelled
//                   </option>
//                 )}
//               </select>
//             </div>
//           </div>

//           <div className="bg-white rounded p-2 shadow mb-2">
//             <p>
//               <strong>Delivery Address: </strong>
//               {order?.address?.addressLine1} {order?.address?.addressLine2},{" "}
//               {order?.address?.city}, {order?.address?.state},{" "}
//               {order?.address?.pinCode}
//             </p>
//           </div>

//           <div className="bg-white rounded p-2 shadow mb-2">
//             <p>
//               <strong>Note: </strong>
//               {order?.notes}
//             </p>
//           </div>

//           <div className="bg-white rounded p-2 shadow mb-2 h-[45vh] overflow-y-auto hide-scrollbar">
//             <h3>
//               <strong>Ordered Items:</strong>
//             </h3>

//             <div className="flex flex-col space-y-4 mt-2">
//               {order.orderedItems.map((item, index) => (
//                 <div key={index} className="flex items-center">
//                   <img
//                     src={func(item?.image?.img)}
//                     alt="item"
//                     className="h-10 w-10 mr-4"
//                   />
//                   <div className="flex-grow">
//                     <p>
//                       <strong>{item?.itemDetails?.name}</strong>
//                     </p>
//                     <p className="text-sm text-gray-500 w-fit relative">
//                       <strong>Price:</strong> ₹
//                       <div className="relative inline-block">
//                         <input
//                           type="number"
//                           defaultValue={parseFloat(item?.price).toFixed(2)}
//                           onChange={(e) => handlePriceChange(item?.itemId, e.target.value)}
//                           className="ml-2 p-1 border rounded w-24 text-gray-700 pr-8"
//                         />
//                         <FiCheck
//   className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 cursor-pointer"
//   onClick={UpdateItemPrice}
// />

//                       </div>
//                     </p>
//                     <div className="flex">
//                       <p className="text-sm text-gray-500 mr-1">
//                         <strong>Quantity:</strong>{" "}
//                         {item?.itemDetails?.unit === "kg"
//                           ? item?.quantity?.kg
//                           : item?.itemDetails?.unit === "packet"
//                           ? item?.quantity?.packet
//                           : item?.itemDetails?.unit === "piece"
//                           ? item?.quantity?.piece
//                           : item?.itemDetails?.unit === "litre"
//                           ? item?.quantity?.litre
//                           : null}{" "}
//                         {item?.itemDetails?.unit}
//                       </p>
//                       {item?.itemDetails?.unit === "kg" && (
//                         <p className="text-sm text-gray-500">
//                           {item?.quantity?.gram} grams
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>No order selected.</p>
//       )}
//     </div>
//   );
// }

// export default DetailsDrawer;

import React, { useState, useEffect } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { UpdateFixedOrderItemPrice } from "../store/actions/vendor";

function DetailsDrawer({ isDetailsDrawerOpen, setIsDetailsDrawerOpen, order }) {
  const dispatch = useDispatch();
  const [updatedOrderItems, setUpdatedOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [idItem, setIdItem] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState(null);

  // Effect to initialize state when drawer opens or order changes
  useEffect(() => {
    if (order) {
      setUpdatedOrderItems(order?.orderedItems || []);
      setTotalPrice(order?.totalPrice || 0);
    }
    setIdItem(null);
    setUpdatedPrice(null);
  }, [order]);

  // Recalculate the total price whenever items update
  useEffect(() => {
    const newTotalPrice = updatedOrderItems.reduce((total, item) => {
      const itemTotal =
        (item.quantity.kg || 0) * item.price +
        ((item.quantity.gram || 0) / 1000) * item.price +
        (item.quantity.piece || 0) * item.price +
        (item.quantity.packet || 0) * item.price +
        (item.quantity.litre || 0) * item.price;
      return total + itemTotal;
    }, 0);

    setTotalPrice(newTotalPrice.toFixed(2));
  }, [updatedOrderItems]);

  const UpdateItemPrice = async () => {
    if (!idItem || !updatedPrice) return;

    try {
      await dispatch(
        UpdateFixedOrderItemPrice({
          itemId: idItem,
          hotelId: order?.hotelId,
          newPrice: updatedPrice,
          orderId: order?._id,
        })
      );

      // Update local state for item price
      setUpdatedOrderItems((prevItems) =>
        prevItems.map((item) =>
          item.itemId === idItem
            ? { ...item, price: parseFloat(updatedPrice) }
            : item
        )
      );
      await window.location.reload()
      console.log("Price updated successfully");
    } catch (err) {
      console.error("Error updating price", err);
    }
  };

  function func(img) {
    let image = img?.substr(12);
    return (
      "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image
    );
  }

  const handlePriceChange = (itemId, price) => {
    setIdItem(itemId);
    setUpdatedPrice(price);
  };

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
              <strong>Total Price:</strong> ₹ {totalPrice}
            </p>
            <p>
              <strong>Ordered On:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded p-2 shadow mb-2 h-[45vh] overflow-y-auto hide-scrollbar">
            <h3>
              <strong>Ordered Items:</strong>
            </h3>

            <div className="flex flex-col space-y-4 mt-2">
              {updatedOrderItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <img
                    src={func(item.image?.img)}
                    alt="item"
                    className="h-10 w-10 mr-4"
                  />
                  <div className="flex-grow">
                    <p>
                      <strong>{item?.itemDetails?.name}</strong>
                    </p>
                    <p className="text-sm text-gray-500 w-fit relative">
                      <strong>Price:</strong> ₹
                      <div className="relative inline-block">
                        <input
                          type="number"
                          value={
                            idItem === item.itemId && updatedPrice
                              ? updatedPrice
                              : parseFloat(item?.price).toFixed(2)
                          }
                          onChange={(e) =>
                            handlePriceChange(item?.itemId, e.target.value)
                          }
                          className="ml-2 p-1 border rounded w-24 text-gray-700 pr-8"
                        />
                        <FiCheck
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 cursor-pointer"
                          onClick={UpdateItemPrice}
                        />
                      </div>
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
