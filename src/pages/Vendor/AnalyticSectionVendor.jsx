/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getItemAnalytics } from "../../store/actions/vendor";
import { getAllCategories } from "../../store/actions/product";
import VenderChart from "./../../components/VenderChart";

const AnalyticSectionVendor = ({ onBack }) => {
  const dispatch = useDispatch();
  const { allCategories } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState({
    id: null,
    name: "Select a Category",
  });

  const { itemAnalytics } = useSelector((state) => state.vendor);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedTimeInterval, setSelectedTimeInterval] = useState("Week");
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  console.log(allCategories, "allCategories");
  console.log("itemAnalytics", itemAnalytics);
  console.log(selectedCategory, "sel");

  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(getAllCategories());
    };
    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getItemAnalytics(selectedTimeInterval.toLowerCase()));
  }, [dispatch, selectedTimeInterval]);

  const handleCategoryChange = (category) => {
    setSelectedCategory({ id: category._id, name: category.name });
    setIsCategoryOpen(false);
  };

  const handleDeselectCategory = () => {
    setSelectedCategory({ id: null, name: "Select a Category" });
    setIsCategoryOpen(false);
  };

  // Filter items based on selected category

  console.log("selectedCategory.id", selectedCategory.id);

  const filteredItems = selectedCategory.id
    ? itemAnalytics.filter((item) => {
        console.log(
          `Filtering: ${item.name}, Category ID: ${item.categoryId}, Selected Category ID: ${selectedCategory.id}`
        );
        return item.categoryId === selectedCategory.id;
      })
    : itemAnalytics;

  console.log(filteredItems, "filter");

  // Calculate total sales
  const totalSales = filteredItems?.reduce(
    (acc, item) => acc + (item?.orderedItems?.totalPrice || 0),
    0
  );

  function func(img) {
    let image = img?.substr(12);
    const retImage =
      "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image;

    return retImage;
  }

  return (
    <section>
      <div className="flex flex-col w-full mt-5 -ml-2 p-4 bg-[#EFE5D8] min-h-[69vh] lg:h-[69vh] rounded-lg overflow-hidden overflow-y-scroll no-scrollbar">
        <div className="flex flex-row">
          <FiArrowLeft
            onClick={onBack}
            className="bg-white rounded-md shadow p-1 h-7 w-7 mx-4 mt-1 mb-2 flex flex-shrink-0"
            size={20}
          />
          <div className="bg-[#FFF7EC] flex flex-1 flex-col p-2 px-4 mx-2 mb-4 rounded-md shadow justify-center items-center text-center">
            <p className="text-sm mb-2 text-[#896439]">Current / Total sales</p>
            <p className="text-[#619524] font-semibold">
              ₹ {totalSales.toFixed(2)}
            </p>
          </div>
          <div className="bg-[#FFF7EC] flex flex-1 flex-col px-4 p-2 mx-2 mb-4 rounded-md shadow justify-center items-center text-center relative">
            <p className="text-sm mb-2 text-[#896439]">Time Interval</p>
            <div className="flex flex-row items-center">
              <p
                className="text-[#619524] font-semibold px-2 cursor-pointer flex items-center"
                onClick={() => setIsTimeOpen(!isTimeOpen)}
              >
                {selectedTimeInterval}
                <FiChevronDown
                  className={`ml-2 transition-transform ${
                    isTimeOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </p>
              {isTimeOpen && (
                <div className="absolute top-full mt-1 bg-white border border-gray-300 shadow-lg rounded-lg z-50">
                  {[
                    { label: "Week", value: "week" },
                    { label: "Month", value: "month" },
                    { label: "Six Months", value: "sixMonths" },
                  ].map((interval, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedTimeInterval(interval.label);
                        console.log("Selected time interval", interval.label);
                        console.log("Selected time ", interval.value);

                        dispatch(getItemAnalytics(interval.value));
                        setIsTimeOpen(false);
                      }}
                    >
                      {interval.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="bg-[#FFF7EC] flex flex-1 flex-col px-4 p-2 mx-2 mb-4 rounded-md shadow justify-center items-center text-center relative">
            <p className="text-sm mb-2 text-[#896439]">Category</p>
            <div className="flex flex-row items-center">
              <p
                className="text-[#619524] font-semibold px-2 cursor-pointer flex items-center"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                {selectedCategory.name}
                <FiChevronDown
                  className={`ml-2 transition-transform ${
                    isCategoryOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </p>
              {isCategoryOpen && (
                <div className="absolute h-40 top-full mt-1 bg-white border border-gray-300 shadow-lg rounded-lg z-50 overflow-scroll hide-scrollbar">
                  {/* Add an option to deselect or view all items */}
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={handleDeselectCategory}
                  >
                    All Items
                  </div>
                  {allCategories.map((category, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category?.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <VenderChart
          selectedCategory={selectedCategory}
          filteredItems={filteredItems}
        />
        <div className="flex flex-col mx-2">
          <div className="flex flex-row border border-[#00000033]">
            <div className="flex flex-col flex-1">
              <p className="border-r border-white bg-[#896439] text-center text-sm text-white p-1">
                Item Image
              </p>
            </div>
            <div className="flex flex-col flex-1">
              <p className="border-r border-white bg-[#896439] text-center text-sm text-white p-1">
                Item Name
              </p>
            </div>
            <div className="flex flex-col flex-1">
              <p className="border-r border-white bg-[#896439] text-center text-sm text-white p-1">
                Total Quantity
              </p>
            </div>
            <div className="flex flex-col flex-1">
              <p className="bg-[#896439] text-center text-sm text-white p-1">
                Total Price
              </p>
            </div>
          </div>
          {filteredItems.map((item, index) => (
            <div
              className="flex flex-row border border-[#00000033]"
              key={index}
            >
              <div className="flex flex-col flex-1 bg-[#FFF7EC]">
                <div className="flex items-center justify-center border-r border-b border-[#00000033]">
                  <img
                    src={func(item?.image)}
                    alt=""
                    className="h-6 w-fit my-1"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1 bg-[#FFF7EC]">
                <p className="text-center border-r border-b border-[#00000033] py-1">
                  {item?.name}
                </p>
              </div>
              <div className="flex flex-col flex-1 bg-[#FFF7EC]">
                <p className="text-center border-r border-b border-[#00000033] py-1">
                  {item?.orderedItems?.totalQuantity?.kg ||
                  item?.orderedItems?.totalQuantity?.gram
                    ? item?.orderedItems?.totalQuantity?.kg +
                      " Kg  " +
                      item?.orderedItems?.totalQuantity?.gram +
                      " Grams"
                    : item?.orderedItems?.totalQuantity?.piece
                    ? item?.orderedItems?.totalQuantity?.piece + " Piece  "
                    : item?.orderedItems?.totalQuantity?.packet
                    ? item?.orderedItems?.totalQuantity?.packet + " Packet  "
                    : item?.orderedItems?.totalQuantity?.litre
                    ? item?.orderedItems?.totalQuantity?.litre + " Litre  "
                    : 0}
                </p>
              </div>
              <div className="flex flex-col flex-1 bg-[#FFF7EC]">
                <p className="text-center border-b border-[#00000033] py-1">
                  ₹{" "}
                  {(
                    Math.round(item?.orderedItems?.totalPrice * 100) / 100
                  ).toFixed(2)}
                  /-
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnalyticSectionVendor;