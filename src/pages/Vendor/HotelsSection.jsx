import React, { useEffect, useState } from "react";
// import SearchBar from "../../components/SearchBar";
import HotelListCard from "../../components/HotelListCard";
import { linkedHotels } from "../../store/actions/vendor";
import { useSelector, useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";

function HotelsSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { linkedHotelsData } = useSelector((state) => state.vendor);

  useEffect(() => {
    const linkHotel = async () => {
      await dispatch(linkedHotels());
    };
    linkHotel();
    console.log("hi");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(linkedHotelsData, "hotels")

  return (
    <>
      <section className="flex flex-col ml-6 w-[78vw]">
        <div className="flex flex-row justify-between mt-10 h-fit mb-4">
          <h2 className="text-3xl font-bold mb-0">My Hotels</h2>
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
        <div className="py-2 w-full mt-4 h-[69vh] relative bg-[#EFE5D8] rounded-lg flex flex-wrap justify-evenly overflow-y-auto hide-scrollbar">
          {linkedHotelsData?.map((hotel, index) => (
            <HotelListCard key={`${index}`} hotel={hotel} />
          ))}
        </div>
      </section>
    </>
  );
}
// flex flex-wrap justify-evenly
export default HotelsSection;
