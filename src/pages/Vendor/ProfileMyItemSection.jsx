import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar";
import { FiArrowLeft, FiX } from "react-icons/fi";
import VendorItemContainer from "../../components/VendorItemContainer";
import { getVendorItems } from "../../store/actions/vendor";

const PAGE_SIZE = 7;
function MyItemSection() {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const { allVendorItems } = useSelector((state) => state.vendor);

  useEffect(() => {
    setOffset(0);
    dispatch(getVendorItems(offset)).then(() => {
      setOffset(offset + PAGE_SIZE);
    });
  }, []);
  // console.log(allVendorItems, "items")

  const loadMore = () => {
    if (
      allVendorItems.length >= PAGE_SIZE &&
      offset !== 0 &&
      allVendorItems.length % PAGE_SIZE === 0
    ) {
      dispatch(getVendorItems(offset));
      setOffset(offset + PAGE_SIZE);
    } else {
      return;
    }
  };

  return (
    <section>
      <div className="flex flex-col ml-6">
        <div className="flex flex-row justify-between mt-10 mb-4">
          <h2 className="text-3xl font-bold mb-4">My Items</h2>
          <SearchBar />
        </div>

        <div className="py-3 h-[67vh] bg-[#EFE5D8] rounded-lg p-3 flex flex-col ">
          <FiArrowLeft
            className="bg-white rounded-md  shadow p-1 h-7 w-7 ml-1 mt-1 mb-2 flex flex-shrink-0"
            size={20}
          />
          <div className="flex flex-wrap justify-evenly overflow-y-scroll hide-scrollbar ">
          <VendorItemContainer Items={allVendorItems}/>
          </div>
          <div className="w-full flex justify-center">
          <button className="w-fit mt-3 border border-[#619524] rounded-full px-4 py-1 bg-[#619524] active:bg-[#7cba35] active:border-[#7cba35] text-white "
          onClick={loadMore}  
          >
              Load More...
            </button>
            </div>
        </div>
      </div>
    </section>
  );
}

export default MyItemSection;
