import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWishlistItems } from "../../store/actions/wishlist";
import SearchBar from "../../components/SearchBar";
import WishlistCard from "../../components/WishlistCard";

function WishlistSection() {
  const dispatch = useDispatch();
  const { wishlistData } = useSelector((state) => state.wishlist);

  useEffect(()=>{
    const allWishlistItems = async ()=>{
      await dispatch(fetchWishlistItems());
    }
    allWishlistItems()
  },[])

  // console.log(wishlistData)

  return (
    <section className="flex flex-col ml-6">
      <div className="flex flex-row justify-between mt-10 mb-4">
        <h2 className="text-3xl font-bold mb-0">Wishlist</h2>
        <SearchBar/>
      </div>
      <div className="flex flex-row overflow-x-auto h-[67vh] bg-[#EFE5D8] rounded-lg overflow-y-hidden hide-scrollbar flex-nowrap mt-4">
        {wishlistData?.map((item,index)=>
        <WishlistCard index={index} item={item}/>
      )}
      </div>
    </section>
  );
}

export default WishlistSection;
