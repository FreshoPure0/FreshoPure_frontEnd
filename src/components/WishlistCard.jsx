import React, { useState, useEffect, useCallback, useRef } from "react";
import { FiHeart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { removefromWishlist } from "../store/actions/wishlist";
import { addItemToCart } from "../store/actions/cart";

function WishlistCard(item) {
  const dispatch = useDispatch();
  const { wishlistData } = useSelector((state) => state.wishlist);
  const [weightKg, setWeightKg] = useState("");
  const [weightG, setWeightG] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(item, "wish");

  const weightKgRef = useRef(weightKg);
  const weightGRef = useRef(weightG);
  const weightRef = useRef(weight);

  useEffect(() => {
    weightKgRef.current = weightKg;
  }, [weightKg]);

  useEffect(() => {
    weightGRef.current = weightG;
  }, [weightG]);

  useEffect(() => {
    weightRef.current = weight;
  }, [weight]);

  const getQuantity = async () => {
    let kg = 0,
      gram = 0,
      packet = 0,
      piece = 0,
      litre = 0;
    if (item?.item?.items?.unit === "kg") {
      kg = parseFloat(weightKgRef.current) || 0;
      gram = parseFloat(weightGRef.current) || 0;
    } else if (item?.item?.items?.unit === "packet") {
      packet = parseFloat(weightRef.current) || 0;
    } else if (item?.item?.items?.unit === "litre") {
      litre = parseFloat(weightRef.current) || 0;
    } else if (item?.item?.items?.unit === "piece") {
      piece = parseFloat(weightRef.current) || 0;
    }
    console.log("Quantity: ", { kg, gram, piece, packet, litre }); // Debugging statement
    return { kg, gram, piece, packet, litre };
  };

  const handleRemoveFromWishlist = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(removefromWishlist(item?.item?.items?._id));
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  const truncatedName = item?.item?.items?.name
  ? item?.item?.items?.name.length > 12
    ? `${item?.item?.items?.name.slice(0, 12)}...`
    : item?.item?.items?.name
  : "";

  const handleCart = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
        // Ensure latest state values are used
        const quantity = await getQuantity();
        console.log("Final Quantity: ", quantity); // Debugging statement
        dispatch(
          addItemToCart({
            itemId: item?.item?.items?._id,
            quantity: quantity,
            unit: item?.item?.items?.unit,
            vendorId: item?.item?.items?.price?.vendorId,
          })
        );
        console.log("Added to cart with quantity", quantity);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, item]);


  function func(img) {
    let image = img?.substr(12);
    const retImage =
      "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image;

    return retImage;
  }
  return (
    <>
      <div className="h-fit w-fit bg-white rounded-md shadow m-2 ml-4 p-2">
        <FiHeart
          className="text-red-600 fill-current pointer-cursor flex float-right mr-2 mt-2 z-40"
          size={20}
          onClick={()=>{handleRemoveFromWishlist()}}
        />
        <img
          src={func(item?.item?.items.image.img)}
          alt=""
          className="h-16 mt-9 mx-auto"
        />
        <p className="px-2 mt-2">{truncatedName}</p>
        <p className="px-2 font-light text-xs mb-2 text-[#619524]">
          {item?.item?.items?.unit === "kg"
            ? `${(item?.item?.items?.price?.todayCostPrice).toFixed(2)}/${
                item?.item?.items?.unit
              }`
            : `₹ ${item?.item?.items?.price?.todayCostPrice}/${item?.item?.items?.unit}`}
        </p>
        <div className="flex px-2 justify-start ">
          {item?.item?.items?.unit === "kg" ? (
            <div className="flex">
              <div className="flex flex-col text-center mx-1">
                <input
                  type="number"
                  maxLength="3"
                  className="w-16 text-sm bg-white border text-center border-gray-400 rounded outline-none px-2 focus:border-[#619524]"
                  placeholder="Kg"
                  value={weightKg}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value >= 0 && value <= 200) {
                      console.log("kG value: ", value);
                      setWeightKg(value);
                    }
                  }}
                />

                <label className="text-xs">In Kg</label>
              </div>
              <div className="flex flex-col text-center mx-1">
                <input
                  type="number"
                  maxLength="3"
                  className="w-16 text-sm bg-white border text-center border-gray-400 rounded outline-none px-2 focus:border-[#619524]"
                  placeholder="Grams"
                  value={weightG}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value >= 0 && value <= 999) {
                      console.log("G value: ", value); // Debugging statement
                      setWeightG(value);
                    }
                  }}
                />
                <label className="text-xs">In G</label>
              </div>
            </div>
          ) : item?.item?.items?.unit === "litre" ? (
            <div className="flex flex-col text-center">
              <input
                type="number"
                maxLength="3"
                className="w-16 text-sm bg-white border border-gray-400 text-center rounded outline-none px-2 focus:border-[#619524] appearance-none"
                placeholder="Litre"
                value={weight}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0 && value <= 200) {
                    setWeight(value);
                  }
                }}
              />
              <label className="text-xs">In Litres</label>
            </div>
          ) : item?.item?.items?.unit === "piece" ? (
            <div className="flex flex-col text-center">
              <input
                type="number"
                maxLength="3"
                className="w-16 text-sm bg-white border border-gray-400 text-center rounded outline-none px-2 focus:border-[#619524]"
                placeholder="Piece"
                value={weight}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0 && value <= 200) {
                    setWeight(value);
                  }
                }}
              />
              <label className="text-xs">In Pieces</label>
            </div>
          ) : item?.item?.items?.unit === "packet" ? (
            <div className="flex flex-col text-center">
              <input
                type="number"
                maxLength="3"
                className="w-16 text-sm bg-white border border-gray-400 text-center rounded outline-none px-2 focus:border-[#619524]"
                placeholder="Packet"
                value={weight}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0 && value <= 200) {
                    setWeight(value);
                  }
                }}
              />
              <label className="text-xs">In Packets</label>
            </div>
          ) : null}
        </div>
        <button
          className="w-36 bg-[#619524] mx-2 my-1 rounded-full text-white z-10"
          onClick={() => {
            console.log("Add button clicked");
            handleCart()
            handleRemoveFromWishlist()
          }}
        >
          Add to cart
        </button>
      </div>
    </>
  );
}

export default WishlistCard;
