import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCompiledItemQuantity } from "../store/actions/order";


function CompiledItemCard({ item }) {
  const dispatch = useDispatch();
  // Initializing states for each unit type (kg, gram, piece, packet, etc.)
  const [quantityToBeOrdered, setQuantityToBeOrdered] = useState({
    kg: item?.totalQuantity?.kg || 0,
    gram: item?.totalQuantity?.gram || 0,
    litre: item?.totalQuantity?.litre || 0,
    piece: item?.totalQuantity?.piece || 0,
    packet: item?.totalQuantity?.packet || 0,
  });
  console.log(item,"item")
  console.log(quantityToBeOrdered, "changed");

  function func(img) {
    let image = img?.substr(12);
    const retImage =
      "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image;

    return retImage;
  }

  // Handle input change for each unit dynamically, ensuring the value is a number
  function handleInputChange(e, unit) {
    const value = e.target.value; // Directly get the input value

    setQuantityToBeOrdered((prevQuantity) => ({
      ...prevQuantity,
      [unit]: value === "" ? "" : parseInt(value, 10), // Allow empty string, otherwise parse as number
    }));
  }

  const updateQuantity = async()=>{

    try {
    await dispatch(updateCompiledItemQuantity(item?.itemId,quantityToBeOrdered));
    } catch (err) {
      // setError(err.message);
      console.log(err)
    }
  }

  return (
    <div className="rounded shadow h-[24vh] w-[72vw] flex flex-col mb-2">
      <div className="flex justify-center items-center rounded-t py-1 h-[25%] bg-[#896439] text-white">
        {item?.itemDetails?.name} (SubVendor Code: {item?.subVendorCode})
      </div>
      <div className="flex rounded-b h-[75%] bg-white flex-row">
        <div className="flex flex-1 border-r border-gray-400 justify-center items-center">
          <img src={func(item?.itemImages?.img)} alt="" className="h-16" />
        </div>
        <div className="flex flex-1 flex-col border-r border-gray-400 justify-center items-center">
          <p className="text-gray-400 text-sm">In-Stock Quantity:</p>
          <div className="flex">
            <p className="text-sm mr-2">
              {item?.stockQuantity?.kg ||
                item?.stockQuantity?.litre ||
                item?.stockQuantity?.piece ||
                item?.stockQuantity?.packet ||
                0}
              <span>
                {item?.itemDetails?.unit === "kg"
                  ? " Kg"
                  : item?.itemDetails?.unit === "litre"
                  ? " Litre"
                  : item?.itemDetails?.unit === "packet"
                  ? " Packet"
                  : item?.itemDetails?.unit === "piece"
                  ? " Piece"
                  : null}
              </span>
            </p>
            {item?.itemDetails?.unit === "kg" && (
              <p className="text-sm">
                {item?.stockQuantity?.gram || 0}
                <span> Grams</span>
              </p>
            )}
          </div>
          <p className="text-gray-400 text-sm">Ordered Quantity:</p>
          <div className="flex">
            <p className="text-sm mr-2">
              {item?.hotels?.[0]?.quantity?.kg ||
                item?.hotels?.[0]?.quantity?.litre ||
                item?.hotels?.[0]?.quantity?.piece ||
                item?.hotels?.[0]?.quantity?.packet ||
                0}
              <span>
                {item?.itemDetails?.unit === "kg"
                  ? " Kg"
                  : item?.itemDetails?.unit === "litre"
                  ? " Litre"
                  : item?.itemDetails?.unit === "packet"
                  ? " Packet"
                  : item?.itemDetails?.unit === "piece"
                  ? " Piece"
                  : null}
              </span>
            </p>
            {item?.itemDetails?.unit === "kg" && (
              <p className="text-sm">
                {item?.hotels?.[0]?.quantity?.gram || 0}
                <span> Grams</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col border-r border-gray-400 justify-center items-center">
          <p className="text-gray-400 text-sm mb-2">Quantity To Be Ordered:</p>
          {/* Conditional rendering based on the unit type */}
          {item?.itemDetails?.unit === "kg" && (
            <div className="flex flex-row text-center ">
              <div className="flex flex-col items-center">
              <input
                type="number"
                value={
                  quantityToBeOrdered.kg === "" ? "" : quantityToBeOrdered.kg
                }
                onChange={(e) => handleInputChange(e, "kg")}
                className="bg-white border w-[80%] border-gray-400 text-center rounded outline-none mx- px-2 focus:border-[#619524]"
                placeholder="Kg"
              />
              <label htmlFor="" className="text-xs">
                In Kg
              </label>
              </div>
              <div className="flex flex-col items-center">
              <input
                type="number"
                value={
                  quantityToBeOrdered.gram === ""
                    ? ""
                    : quantityToBeOrdered.gram
                }
                onChange={(e) => handleInputChange(e, "gram")}
                className="bg-white border w-[80%] border-gray-400 text-center rounded outline-none px-2 focus:border-[#619524]"
                placeholder="Grams"
              />
              <label htmlFor="" className="text-xs">
                In Grams
              </label>
              </div>
            </div>
          )}
          {item?.itemDetails?.unit === "litre" && (
            <div className="flex flex-col text-center">
              <input
                type="number"
                value={
                  quantityToBeOrdered.litre === ""
                    ? ""
                    : quantityToBeOrdered.litre
                }
                onChange={(e) => handleInputChange(e, "litre")}
                className="bg-white border border-gray-400 text-center rounded outline-none px-2 focus:border-[#619524]"
                placeholder="Litre"
              />
              <label htmlFor="" className="text-xs">
                In Litre
              </label>
            </div>
          )}
          {item?.itemDetails?.unit === "piece" && (
            <div className="flex flex-col text-center">
              <input
                type="number"
                value={
                  quantityToBeOrdered.piece === ""
                    ? ""
                    : quantityToBeOrdered.piece
                }
                onChange={(e) => handleInputChange(e, "piece")}
                className="bg-white border border-gray-400 text-center rounded outline-none px-2 focus:border-[#619524]"
                placeholder="Piece"
              />
              <label htmlFor="" className="text-xs">
                In Piece
              </label>
            </div>
          )}
          {item?.itemDetails?.unit === "packet" && (
            <div className="flex flex-col text-center">
              <input
                type="number"
                value={
                  quantityToBeOrdered.packet === ""
                    ? ""
                    : quantityToBeOrdered.packet
                }
                onChange={(e) => handleInputChange(e, "packet")}
                className="bg-white border border-gray-400 text-center rounded outline-none px-2 focus:border-[#619524]"
                placeholder="Packet"
              />
              <label htmlFor="" className="text-xs">
                In Packet
              </label>
            </div>
          )}
        </div>
        <div className="flex flex-1 justify-center items-center">
          <button
            className="flex-3 w-36 bg-[#619524] rounded-full text-white items-center justify-center mx-12"
            onClick={updateQuantity}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompiledItemCard;
