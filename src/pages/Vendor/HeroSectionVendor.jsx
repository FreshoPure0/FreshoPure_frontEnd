import React, { useState, useEffect, useCallback } from "react";
import { FiArrowLeft, FiPrinter, FiSearch } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { compiledOrders } from "../../store/actions/vendor";
import SearchBar from "../../components/SearchBar";
import CompiledItemCard from "../../components/CompiledItemCard";
import { downloadCompilOrderHotelDetailsFromAPI } from "../../../utils/downloadCompilOrderHotelDetailsFromAPI";

function HeroSectionVendor() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { compiledOrder } = useSelector((state) => state.vendor);

  useEffect(() => {
    const compiledOrderr = async () => {
      await dispatch(compiledOrders());
    };
    compiledOrderr();
  }, []);
  //   console.log(compiledOrder, "orders");

  const downloadPrint = async () => {
    // setIsLoading(true);
    downloadCompilOrderHotelDetailsFromAPI();
    // .then(() => {
    //   setIsLoading(false);
    // });
  };

  return (
    <section className="flex flex-col mx-6 w-[78vw]">
      <div className="flex flex-row justify-between mt-10 mb-4">
        <h2 className="text-3xl font-bold mb-0">Compiled Orders</h2>
        <div className="w-2/5 h-10 flex items-center border rounded-xl overflow-hidden px-2 bg-white">
          <FiSearch className="text-gray-600" size={20} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm} // Bind search term state to input
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            className="p-2 text-base outline-none border-none bg-transparent"
          />
        </div>
      </div>
      <div className="py-2 w-full mt-4 h-[69vh] relative bg-[#EFE5D8] rounded-lg flex flex-col overflow-y-auto hide-scrollbar">
        <div className="flex justify-end">
          {/* <FiArrowLeft
            className="bg-white rounded-md shadow p-1 h-7 w-7 ml-6 mt-1 mb-2 flex flex-shrink-0"
            size={20}
          /> */}
          <FiPrinter
            className="bg-white rounded-md shadow p-1 h-7 w-7 mr-6 mt-1 mb-2 flex flex-shrink-0"
            size={20}
            onClick={downloadPrint}
          />
        </div>
        <div className="flex items-center p-1 flex-col">
          {compiledOrder?.items?.map((item, index) => (
            <CompiledItemCard item={item} key={`${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSectionVendor;
