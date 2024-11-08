/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";
// import SearchBar from "../../components/SearchBar";
import ProductCard from "../../components/ProductCard";
import { getAllCategories, fetchItems } from "../../store/actions/product";

function HeroSection() {
  const [selectedCategories, setSelectedCategories] = useState();
  const [searchTerm, setSearchTerm] = useState(""); // Add search term state
  const { allCategories } = useSelector((state) => state.products);
  const { hotelItems } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(getAllCategories());
    };
    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    if (allCategories?.length > 0) {
      setSelectedCategories(allCategories[0]._id);
    }
  }, [allCategories]);

  useEffect(() => {
    const fetchItem = async () => {
      if (selectedCategories) {
        await dispatch(fetchItems(selectedCategories));
      }
    };
    fetchItem();
  }, [selectedCategories, dispatch]);

  function func(img) {
    let image = img?.substr(15);
    return (
      "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image
    );
  }

  // Filter logic for search
  const filteredItems = hotelItems?.flatMap((hotel) =>
    hotel.items.filter((item) =>
      item.itemDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <section className="flex flex-col mx-6 w-[78vw]">
      <div className="flex flex-row justify-between mt-10 mb-4">
        <h2 className="text-3xl font-bold mb-0">Top Categories</h2>
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
      <div className="flex flex-row px-4   overflow-x-auto overflow-y-hidden hide-scrollbar flex-nowrap mt-4">
        {allCategories?.map((cat, index) => (
          <div
            key={index}
            className="relative w-24 h-12 mr-2 flex-shrink-0 group rounded-lg overflow-hidden"
            tabIndex={0}
            onClick={() => setSelectedCategories(cat?._id)}
          >
            <div className="relative w-full h-12 flex items-center justify-center">
              <img
                src={func(cat?.img)}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 flex align-middle items-center justify-center px-2">
                <span className="text-white text-sm">{cat?.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Display filtered items */}
      <div className="mt-3 py-2 w-full min-h-[60.5vh] h-[60.5vh] bg-[#EFE5D8] rounded-lg flex items-center justify-evenly flex-wrap overflow-y-auto hide-scrollbar">
        {filteredItems?.length > 0 ? (
          filteredItems.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))
        ) : (
          <p>No items available.</p>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
