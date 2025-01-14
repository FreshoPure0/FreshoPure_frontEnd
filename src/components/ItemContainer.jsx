import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FiCheck } from "react-icons/fi";
import { removeFromCart, addItemToCart } from "../store/actions/cart";

function ItemContainer(item) {
  const dispatch = useDispatch();

  const [weightKg, setWeightKg] = useState(
    item?.item.cartItems.quantity.kg || 0
  );
  const [weightG, setWeightG] = useState(
    item?.item.cartItems.quantity.gram || 0
  );
  const [weight, setWeight] = useState(
    item?.item.cartItems.quantity.litre ||
      item?.item.cartItems.quantity.piece ||
      item?.item.cartItems.quantity.packet ||
      0
  );

  const handleRemoveCart = async () => {
    await dispatch(removeFromCart(item?.item.cartItems.itemId));
  };

  const handleUpdateQuantity = async () => {
    const updatedQuantity = {
      kg: item?.item.itemDetails.unit === "kg" ? parseFloat(weightKg) || 0 : 0,
      gram: item?.item.itemDetails.unit === "kg" ? parseFloat(weightG) || 0 : 0,
      litre:
        item?.item.itemDetails.unit === "litre" ? parseFloat(weight) || 0 : 0,
      piece:
        item?.item.itemDetails.unit === "piece" ? parseFloat(weight) || 0 : 0,
      packet:
        item?.item.itemDetails.unit === "packet" ? parseFloat(weight) || 0 : 0,
    };

    await dispatch(
      addItemToCart({
        itemId: item?.item.cartItems.itemId,
        quantity: updatedQuantity,
        unit: item?.item.itemDetails.unit,
        vendorId: item?.item.itemDetails.vendorId,
      })
    );
    console.log("Updated cart with quantity:", updatedQuantity);
  };

  const truncatedName = item?.item.itemDetails.name
    ? item?.item.itemDetails.name.length > 12
      ? `${item?.item.itemDetails.name.slice(0, 12)}...`
      : item?.item.itemDetails.name
    : "";

  const func = (img) => {
    let image = img?.substr(12);
    return (
      "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 bg-white h-auto m-2 mx-4 rounded-lg shadow">
      {/* First Column: Item Image */}
      <div className="border rounded-tl">
        <div className="flex flex-col">
          <p className="flex-1 text-white bg-[#896439] text-center">
            Item Image
          </p>
          <div className="flex h-24 p-4 justify-center items-center">
            <img
              src={func(item?.item.itemDetails.image.img)}
              alt="Item Image"
              className="h-16 w-auto max-w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Second Column: Item Name */}
      <div className="border">
        <div className="flex flex-col">
          <p className="flex-1 text-white bg-[#896439] text-center">
            Item Name
          </p>
          <p className="flex-3 text-center justify-center mx-5 my-9 font-bold text-sm sm:text-base">
            {item?.item.itemDetails.name}
          </p>
        </div>
      </div>

      {/* Third Column: Quantity */}
      <div className="border relative">
        <div className="flex flex-col">
          <p className="flex-1 text-white bg-[#896439] text-center">Quantity</p>
          <div className="flex items-center justify-center flex-col my-8">
            {item?.item.itemDetails.unit === "kg" ? (
              <div className="flex flex-wrap justify-center md:flex-wrap md:justify-center relative">
                <div className="flex flex-col text-center mx-1 relative">
                  <input
                    type="number"
                    className="w-24 bg-white border text-center border-gray-400 rounded outline-none px-2 focus:border-[#619524] pr-8"
                    placeholder="Kg"
                    value={weightKg}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value >= 0 && value <= 999) {
                        setWeightKg(value);
                      }
                    }}
                  />
                  <label className="text-sm">In Kg</label>
                  <FiCheck
                    className="absolute right-2 top-1/3 transform -translate-y-1/2 text-green-600 cursor-pointer"
                    onClick={handleUpdateQuantity}
                  />
                </div>
                <div className="flex flex-col text-center mx-1 relative">
                  <input
                    type="number"
                    className="w-24 bg-white border text-center border-gray-400 rounded outline-none px-2 focus:border-[#619524] pr-8"
                    placeholder="Grams"
                    value={weightG}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value >= 0 && value <= 999) {
                        setWeightG(value);
                      }
                    }}
                  />
                  <label className="text-sm">In G</label>
                  <FiCheck
                    className="absolute right-2 top-1/3 transform -translate-y-1/2 text-green-600 cursor-pointer"
                    onClick={handleUpdateQuantity}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col text-center relative">
                <input
                  type="number"
                  className="w-24 bg-white border text-center border-gray-400 rounded outline-none px-2 focus:border-[#619524] pr-8"
                  placeholder={item?.item.itemDetails.unit}
                  value={weight}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value >= 0 && value <= 999) {
                      setWeight(value);
                    }
                  }}
                />
                <label className="text-sm">
                  In {item?.item.itemDetails.unit}
                </label>
                <FiCheck
                  className="absolute right-2 top-1/3 transform -translate-y-1/2 text-green-600 cursor-pointer"
                  onClick={handleUpdateQuantity}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fourth Column: Action */}
      <div className="border">
        <div className="flex flex-col">
          <p className="flex-1 text-white bg-[#896439] rounded-tr text-center">
            Action
          </p>
          <div className="flex min-h-[16vh] flex-1 justify-center items-center align-middle">
            <button
              className="flex-3 w-36 bg-[#619524] rounded-full py-1 text-white items-center justify-center mx-12 my-4"
              onClick={handleRemoveCart}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemContainer;
