import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { fetchWishlistItems } from "../../store/actions/wishlist";
import WishlistCard from "../../components/WishlistCard";

function WishlistSection() {
  const dispatch = useDispatch();
  const { wishlistData } = useSelector((state) => state.wishlist);
  const [searchTerm, setSearchTerm] = useState(""); // Added search term state
  console.log(wishlistData);
  useEffect(() => {
    const allWishlistItems = async () => {
      await dispatch(fetchWishlistItems());
    };
    allWishlistItems();
  }, [dispatch]);

  // Filter logic for search
  const filteredWishlist = wishlistData?.filter((item) =>
    item.items.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col ml-6 w-[78vw]">
      <div className="flex flex-row justify-between mt-10 mb-4">
        <h2 className="text-3xl font-bold mb-0">Wishlist</h2>
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
      <div className="flex flex-row overflow-x-auto h-[67vh] w-full items-center justify-evenly bg-[#EFE5D8] rounded-lg overflow-y-scroll hide-scrollbar flex-wrap mt-4">
        {filteredWishlist?.length > 0 ? (
          filteredWishlist?.map((item, index) => (
            <WishlistCard key={index} item={item} />
          ))
        ) : (
          <p>No Items in Wishlist.</p> // Show a message if no items match
        )}
      </div>
    </section>
  );
}

export default WishlistSection;
