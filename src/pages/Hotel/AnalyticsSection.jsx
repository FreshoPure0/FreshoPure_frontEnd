import React, { useEffect, useState, forwardRef } from "react";
import { FiArrowLeft, FiCalendar, FiChevronDown } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Charts from "../../components/chart";
import { useSelector, useDispatch } from "react-redux";
import { getHotelItemAnalytics } from "../../store/actions/hotel";
import { getAllCategories } from "../../store/actions/product";

function AnalyticsSection() {
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const { allCategories } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("Select a Category");
  const { itemAnalytics } = useSelector((state) => state.hotel);
  const [isOpen, setIsOpen] = useState(false);

  console.log(allCategories,"Cat")
  console.log(itemAnalytics,"Items")

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(getAllCategories());
    };
    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    const analy = async () => {
      await dispatch(getHotelItemAnalytics("week"));
    };
    analy();
  }, []);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  function func(img) {
    let image = img?.substr(12);
    const retImage =
      "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image;

    return retImage;
  }

  // Custom input component to display "Time Interval" when no date is selected
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="flex items-center cursor-pointer"
      onClick={onClick}
      ref={ref}
    >
      <p className="text-[#619524] font-semibold px-2">
        {value ? value : "Time Interval"}
      </p>
      <FiCalendar size={15} className="cursor-pointer" />
    </button>
  ));

  return (
    <section className="flex flex-col ml-6">
      <div className="flex flex-row justify-start mt-10 mb-4">
        <h2 className="text-3xl font-bold mb-0">Analytics</h2>
      </div>
      <div className="flex flex-col mt-4 p-4 bg-[#EFE5D8] h-[67vh] rounded-lg overflow-hidden overflow-y-scroll no-scrollbar">
        <div className="flex flex-row">
          <FiArrowLeft
            className="bg-white rounded-md shadow p-1 h-7 w-7 mx-4 mt-1 mb-2 flex flex-shrink-0"
            size={20}
          />
          <div className="bg-[#FFF7EC] flex flex-1 flex-col p-2 px-4 mx-2 mb-4 rounded-md shadow justify-center items-center text-center">
            <p className="text-sm mb-2 text-[#896439]">Current / Total sales</p>
            <p className="text-[#619524] font-semibold">₹ 12500</p>
          </div>
          <div className="bg-[#FFF7EC] flex flex-1 flex-col px-4 p-2 mx-2 mb-4 rounded-md shadow justify-center items-center text-center">
            <p className="text-sm mb-2 text-[#896439]">Date Range</p>
            <div className="flex flex-row items-center">
              <DatePicker
                selected={startDate}
                onChange={(update) => setDateRange(update)}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                customInput={
                  <CustomInput
                    value={
                      startDate && endDate
                        ? `${formatDate(startDate)} - ${formatDate(endDate)}`
                        : ""
                    }
                  />
                }
                dateFormat="dd MMM, yyyy"
                popperPlacement="bottom-end"
                popperClassName="shadow-lg rounded-lg"
                calendarClassName="bg-white border border-gray-300 rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="bg-[#FFF7EC] flex flex-1 flex-col px-4 p-2 mx-2 mb-4 rounded-md shadow justify-center items-center text-center relative">
            <p className="text-sm mb-2 text-[#896439]">Category</p>
            <div className="flex flex-row items-center">
              <p
                className="text-[#619524] font-semibold px-2 cursor-pointer flex items-center"
                onClick={() => setIsOpen(!isOpen)}
              >
                {selectedCategory}
                <FiChevronDown
                  className={`ml-2 transition-transform ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </p>
              {isOpen && (
                <div className="absolute top-full mt-1 bg-white border border-gray-300 shadow-lg rounded-lg z-50">
                  {allCategories.map((category, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleCategoryChange(category.name)}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <Charts />
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
          {itemAnalytics?.map((item, index) => (
            <div className="flex flex-row border border-[#00000033]" key={index}>
              <div className="flex flex-col flex-1 bg-[#FFF7EC]">
                <div className="flex items-center justify-center border-r border-b border-[#00000033]">
                  <img src={func(item?.image)} alt="" className="h-6 w-fit my-1" />
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
                  ₹ {(Math.round(item?.orderedItems?.totalPrice * 100) / 100).toFixed(2)}
                  /-
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AnalyticsSection;
