import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar";
import { FiArrowLeft } from "react-icons/fi";
import OrderContainer from "../../components/OrderContainer";
import { allOrdersForVendors } from "../../store/actions/vendor";
const PAGE_SIZE = 7;

function MyOrderSection() {
  const dispatch = useDispatch();
  const [activeStatus, setActiveStatus] = useState("Order Placed");
  const [offset, setOffset] = useState(0);
  const { allOrders } = useSelector((state) => state.vendor);


  // Handle status change
  const handleStatusChange = (status) => {
    setActiveStatus(status);
    setOffset(0); // Reset offset whenever status changes
  };

  useEffect(() => {
    const fetchOrders = async () => {
      await dispatch(
        allOrdersForVendors({
          offset: 0,  // Reset offset whenever a new status is selected
          status: activeStatus,
          date: new Date() - 1,
        })
      );
      setOffset(offset + PAGE_SIZE);
    };
    fetchOrders();
  }, [activeStatus]); // Re-fetch orders when status changes

  const loadMoreOrders = () => {
     dispatch(
      allOrdersForVendors({
        offset: offset,
        status: activeStatus,
        date: new Date() - 1,
      })
    );
    setOffset(offset + PAGE_SIZE);
  };

  // Calculate the position of the slider based on the active status
  const getSliderPosition = () => {
    switch (activeStatus) {
      case "Order Placed":
        return "6%";
      case "In Process":
        return "100%";
      case "Delivered":
        return "200%";
      default:
        return "0%";
    }
  };

  return (
    <section>
      <div className="flex flex-col ml-6">
        <div className="flex flex-row justify-between mt-10 mb-4">
          <h2 className="text-3xl font-bold mb-4">My Orders</h2>
          <SearchBar />
        </div>

        <div className="py-3 h-[67vh] relative bg-[#EFE5D8] rounded-lg p-1 flex flex-col items-center overflow-y-scroll hide-scrollbar">
          <FiArrowLeft
            className="bg-white rounded-md absolute left-0 shadow p-1 h-7 w-7 ml-4 mt-1 mb-2 flex flex-shrink-0"
            size={20}
          />
          {/* Buttons */}
          <div className="container px-6 py-2 mx-auto">
            <div className="relative flex items-center bg-white rounded-xl justify-center w-full max-w-md mx-auto">
              {/* Slider background */}
              <div
                className="absolute top-0 left-0 bottom-0 my-1 -mx-1 bg-[#619524] transition-transform duration-300 ease-in-out rounded-xl"
                style={{
                  width: "33.33%", // Each button is one-third of the width
                  transform: `translateX(${getSliderPosition()})`,
                }}
              />

              <div className="flex items-center w-full border border-[#896439] dark:border-[#896439] rounded-xl relative z-10">
                <button
                  onClick={() => handleStatusChange("Order Placed")}
                  className={`flex-1 px-4 py-3 text-sm font-semibold capitalize md:py-3 rounded-xl transition-colors duration-300 relative z-20 ${
                    activeStatus === "Order Placed" ? "text-white" : "text-[#896439]"
                  }`}
                >
                  Order Placed
                </button>

                <button
                  onClick={() => handleStatusChange("In Process")}
                  className={`flex-1 px-4 py-3 text-sm font-semibold capitalize rounded-xl transition-colors duration-300 relative z-20 ${
                    activeStatus === "In Process" ? "text-white" : "text-[#896439]"
                  }`}
                >
                  In Process
                </button>

                <button
                  onClick={() => handleStatusChange("Delivered")}
                  className={`flex-1 px-4 py-3 text-sm font-semibold capitalize rounded-xl transition-colors duration-300 relative z-20 ${
                    activeStatus === "Delivered" ? "text-white" : "text-[#896439]"
                  }`}
                >
                  Delivered
                </button>
              </div>
            </div>
          </div>

          {/* Sliding content */}
          <div className="relative w-full mt-4 overflow-hidden">
            <div
              className="flex  transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${
                  activeStatus === "Order Placed"
                    ? "0%"
                    : activeStatus === "In Process"
                    ? "-100%"
                    : activeStatus === "Delivered"
                    ? "-200%"
                    : null
                })`,
              }}
            >
              {/* Placed Orders Content */}
              <div className="w-full  flex-shrink-0 ">
                <OrderContainer orders={allOrders} activeStatus="Order Placed" />
              </div>
              {/* In Process Orders Content */}
              <div className="w-full flex-shrink-0">
                <OrderContainer orders={allOrders} activeStatus="In Process" />
              </div>
              {/* Delivered Orders Content */}
              <div className="w-full flex-shrink-0">
                <OrderContainer orders={allOrders} activeStatus="Delivered" />
              </div>
            </div>
          </div>
          <button className="w-fit mt-3 border border-[#619524] rounded-full px-4 py-1 bg-[#619524] active:bg-[#7cba35] active:border-[#7cba35] text-white "
          onClick={loadMoreOrders}
          >
              Load More...
            </button>
        </div>
      </div>


    </section>
  );
}


export default MyOrderSection;
