import React, { useState } from "react";

const MyOrder = () => {
  const [orders, setOrders] = useState([
    {
      orderNumber: "#20240916-1543",
      orderDate: "2024-09-16",
      orderTime: "01:45 PM",
      price: "₹1800/-",
      quantity: "10",
      status: "Placed",
    },
    {
      orderNumber: "#20240916-1543",
      orderDate: "2024-09-16",
      orderTime: "01:45 PM",
      price: "₹1800/-",
      quantity: "10",
      status: "Placed",
    },
    {
      orderNumber: "#20240823-3558",
      orderDate: "2024-08-23",
      orderTime: "12:06 PM",
      price: "₹400/-",
      quantity: "5",
      status: "Placed",
    },
  ]);

  const handleStatusChange = (index) => {
    const newOrders = [...orders];
    newOrders[index].status =
      newOrders[index].status === "Placed" ? "Delivered" : "Placed";
    setOrders(newOrders);
  };

  return (
    <section className="flex flex-col ml-6">
      <div className="flex flex-col mt-4 p-4 bg-[#EFE5D8] h-[67vh] rounded-lg overflow-hidden overflow-y-scroll no-scrollbar">
        <div className="flex flex-row">
          <FiArrowLeft
            className="bg-white rounded-md shadow p-1 h-7 w-7 mx-4 mt-1 mb-2 flex flex-shrink-0"
            size={20}
          />
        </div>
      </div>
    </section>
  );
};

export default MyOrder;
