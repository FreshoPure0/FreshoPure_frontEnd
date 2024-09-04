import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import { getAllCategories, fetchItems } from "../store/actions/product";

function HeroSection() {
  // const [categories, setCategories] = useState();
  const [selectedCategories, setSelectedCategories] = useState();
  const { allCategories } = useSelector((state) => state.products);
  const { hotelItems } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  // console.log(allCategories?.[0]._id,"cat");
  // console.log(selectedCategories);
  // console.log(hotelItems);

  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(getAllCategories());
    };
    fetchCategories();
    
  }, []);
  
  useEffect(() => {
    // Set the first category as the default selected category after fetching categories
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

  return (
    <section className="flex flex-col ml-6">
      <div className="flex flex-row justify-between mt-10 mb-4">
        <h2 className="text-3xl font-bold mb-0">Top Categories</h2>
        <SearchBar />
      </div>
      <div className="flex flex-row overflow-x-auto overflow-y-hidden hide-scrollbar flex-nowrap mt-4">
        {allCategories?.map((cat, index) => (
          <div
            key={index}
            className="relative w-24 h-12 mr-2 flex-shrink-0 group rounded-lg overflow-hidden"
            tabIndex={0} // Ensure the div can be focused
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
      <div className="mt-3 py-2 w-full lg:h-[58vh] md:h-[69vh] bg-[#EFE5D8] rounded-lg flex justify-evenly flex-wrap overflow-y-auto hide-scrollbar">
      {hotelItems?.map((hotel, index) =>
          hotel.items.map((item, itemIndex) => (
            <ProductCard key={`${index}-${itemIndex}`} item={item} />
          ))
        )}
      </div>
    </section>
  );
}

export default HeroSection;
