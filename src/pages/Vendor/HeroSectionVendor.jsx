import React, { useState, useEffect, useCallback } from "react";
import { FiArrowLeft, FiPrinter } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { compiledOrders } from "../../store/actions/vendor";
import SearchBar from "../../components/SearchBar";
import CompiledItemCard from "../../components/CompiledItemCard";
import {downloadCompilOrderHotelDetailsFromAPI} from "../../../utils/downloadCompilOrderHotelDetailsFromAPI"

function HeroSectionVendor() {
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
  downloadCompilOrderHotelDetailsFromAPI()
  // .then(() => {
  //   setIsLoading(false);
  // });
};

  return (
    <div className="flex flex-col ml-6">
      <div className="flex flex-row justify-between mt-10 mb-4">
        <h2 className="text-3xl font-bold mb-4">Compiled Orders</h2>
        <SearchBar />
      </div>
      <div className="py-2 h-[67vh] bg-[#EFE5D8] rounded-lg flex flex-col overflow-y-auto hide-scrollbar">
        <div className="flex justify-between">
        <FiArrowLeft
            className="bg-white rounded-md shadow p-1 h-7 w-7 ml-6 mt-1 mb-2 flex flex-shrink-0"
            size={20}
        />
        <FiPrinter 
         className="bg-white rounded-md shadow p-1 h-7 w-7 mr-6 mt-1 mb-2 flex flex-shrink-0"
         size={20}
         onClick={downloadPrint}
        />
        </div>
        <div className="flex items-center p-1 flex-col">
        {compiledOrder?.items?.map((item,index) =>
        <CompiledItemCard item={item} key={`${index}`}/>
        )}
        </div>
      </div>
    </div>
  );
}

export default HeroSectionVendor;
