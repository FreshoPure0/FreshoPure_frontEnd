import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiX } from "react-icons/fi";
import { getVendorItems, updateVendorStock, updateVendorWaste } from "../../store/actions/vendor";
import { useDispatch, useSelector } from "react-redux";

function ProfileStock({ onBack }) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [activeSection, setActiveSection] = useState("addStock");
  const { allVendorItems } = useSelector((state) => state.vendor);
  const [price, setPrice] = useState(0);
  const [wasteReason,setWasteReason] = useState('')
  const [weight, setWeight] = useState({
    kg: "",
    gram: "",
    piece: "",
    packet: "",
    litre: "",
  });
  const [waste,setWaste] = useState({
    kg: "",
    gram: "",
    piece: "",
    packet: "",
    litre: "",
  });


  // Pagination state
const [offset, setOffset] = useState(0);
const PAGE_SIZE = 50; // Adjust this value as needed

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

useEffect(() => {
dispatch(getVendorItems(offset));
}, [offset]);

const loadMoreItems = () => {
setOffset(prevOffset => prevOffset + PAGE_SIZE);
};

console.log(price)
console.log(wasteReason)

useEffect(() => {
  setFilteredItems(
    allVendorItems.filter((item) =>
      item.itemDetails.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
}, [searchQuery, allVendorItems]);

  console.log(allVendorItems, "Stock Data");

  function func(img) {
    let image = img?.substr(12);
    return (
      "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image
    );
  }
  const calculatePricePerUnit = (item) => {
    const { totalPrice, totalQuantity } = item;

    // List of units in the desired priority order
    const units = ["kg", "litre", "gram", "packet", "piece"];

    // Iterate through the units to find the first non-zero quantity
    for (const unit of units) {
      if (totalQuantity[unit] > 0) {
        const quantity = totalQuantity[unit];

        // Calculate price per unit
        const pricePerUnit = totalPrice / quantity;

        return { unit, pricePerUnit: pricePerUnit.toFixed(2) };
      }
    }

    // Return a fallback message if no valid unit is found
    return { unit: null, pricePerUnit: "N/A" };
  };


  const quantity = {
    kg: Number(weight.kg) || 0,
    gram: Number(weight.gram) || 0,
    piece: Number(weight.piece) || 0,
    packet: Number(weight.packet) || 0,
    litre: Number(weight.litre) || 0,
  };
  
  console.log(quantity, "ToUpdate");
  console.log(itemData?.item?.itemId, "id");
  
  const wasteQuantity = {
    kg: Number(waste.kg) || 0,
    gram: Number(waste.gram) || 0,
    piece: Number(waste.piece) || 0,
    packet: Number(waste.packet) || 0,
    litre: Number(waste.litre) || 0,
  };
  
  console.log(wasteQuantity, "To Waste");

  const addItemStock = async () => {

    try {
      await dispatch(updateVendorStock(price, quantity, false, itemData?.item?.itemId));
      await window.location.reload()

    } catch (err) {
      console.error(err)
    }

    setModal(false);
  };

  const addItemWaste = async () => {

    try {
      await dispatch(updateVendorWaste(wasteReason, wasteQuantity, itemData?.item?.itemId));
      await window.location.reload()

    } catch (err) {
      console.error(err)
    }

    setModal(false);
    };

    
  // const handleInputChange = (text) => {
  //   if (text >= 0 && text <= 1000) {
  //     setWeight(text);
  //   } else {
  //     console.log("Stock");

  //   }
  // };

  // const handleWasteInputChange = (text) => {
  //   if (text >= 0 && text <= 1000) {
  //     setWaste(text);
  //   } else {
  //     console.log("Waste");
      
  //   }
  // };


  const calculateTotalWaste = (waste) => {
    const totalWaste = { kg: 0, gram: 0, litre: 0, packet: 0, piece: 0 };

    // Sum up waste quantities for each unit
    waste.forEach((entry) => {
      for (const unit in entry.quantity) {
        if (entry.quantity[unit] > 0) {
          totalWaste[unit] += entry.quantity[unit];
        }
      }
    });

    // Convert grams to kilograms if grams exceed 1000
    if (totalWaste.gram >= 1000) {
      totalWaste.kg += Math.floor(totalWaste.gram / 1000);
      totalWaste.gram %= 1000; // Remainder in grams
    }

    // Create an array of non-zero waste units
    const summarizedWaste = Object.entries(totalWaste)
      .filter(([unit, quantity]) => quantity > 0)
      .map(([unit, quantity]) => `${quantity} ${unit}`);

    return summarizedWaste.length > 0 ? summarizedWaste : null;
  };

  return (
    <section className="bg-[#EFE5D8] h-[70vh] flex flex-col items-center  rounded-lg p-1 overflow-y-auto hide-scrollbar">
      <div className="flex items-start w-full relative cursor-pointer mb-16">
        <FiArrowLeft
          className="bg-white absolute top-3 left-1 rounded-md shadow p-1 h-7 w-7 ml-4 mt-1 mb-2 flex flex-shrink-0"
          onClick={onBack}
          size={20}
        />
      </div>
      <div className="w-full px-4 mb-4">
        <input
          type="text"
          placeholder="Search items by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring focus:ring-orange-300"
        />
      </div>
      {filteredItems.map((item, index) => (
        <div
          className="bg-white h-fit flex-col w-[70vw] flex justify-evenly rounded-lg shadow-md mt-4"
          onClick={() => {
            setModal(true);
            setItemData({ item });
          }}
          key={index}
        >
          <div className="flex space-x-1 justify-center text-white bg-[#896439] rounded-t-lg p-3">
            <h3 className="font-semibold  text-xs">
              {" "}
              {item?.itemDetails?.name}
            </h3>
          </div>
          <div className="flex justify-between p-3">
            <div className="flex justify-center w-1/4">
              <img
                src={func(item?.images?.img)}
                alt="img"
                className="h-14 w-fit"
              />
            </div>

            <div className="flex items-center justify-evenly w-3/4">
              <div className="flex flex-col items-center  border-gray-300 ">
                <h4 className="text-gray-500 text-xs ">STOCK</h4>
                {item?.itemDetails?.unit === "kg" ? (
                  <div className="flex space-x-1">
                    <p className="text-xs">
                      {item?.totalQuantity?.kg} <span>Kg</span>
                    </p>
                    <p className="text-xs">
                      {item?.totalQuantity?.gram} <span>grams</span>
                    </p>
                  </div>
                ) : item?.itemDetails?.unit === "litre" ? (
                  <p className="text-xs">
                    {item?.totalQuantity?.litre} <span>Litre</span>
                  </p>
                ) : item?.itemDetails?.unit === "piece" ? (
                  <p className="text-xs">
                    {item?.totalQuantity?.piece} <span>Piece</span>
                  </p>
                ) : (
                  <p className="text-xs">
                    {item?.totalQuantity?.packet} <span>Packet</span>
                  </p>
                )}
              </div>

              <div className="flex flex-col items-center  border-gray-300 ">
                <h4 className="text-gray-500 text-xs ">PRICE</h4>
                <p className="text-xs">
                  {(() => {
                    const { unit, pricePerUnit } = calculatePricePerUnit(item);
                    return unit ? `${pricePerUnit}/${unit}` : `N/A`;
                  })()}
                </p>
              </div>
              <div className="flex flex-col items-center border-gray-300">
                <h4 className="text-gray-500 text-xs">WASTE</h4>
                <div className="flex space-x-1">
                {item?.waste?.length > 0 ? (
                  (() => {
                    const summarizedWaste = calculateTotalWaste(item.waste);

                    return summarizedWaste ? (
                      summarizedWaste.map((wasteItem, index) => (
                        <p key={index} className="text-xs">
                          {wasteItem}
                        </p>
                      ))
                    ) : (
                      <p className="text-xs">No wastage yet</p>
                    );
                  })()
                ) : (
                  <p className="text-xs">No wastage yet</p>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

<button
className="bg-[#619524] text-white rounded-lg py-2 px-4 mt-4"
onClick={loadMoreItems}
>
Load More
</button>

      {/* Modal */}
      {modal ? (
        <div className="absolute bg-gradient-to-r from-orange-200 to-orange-100 h-[68vh] lg:w-[50vw] flex flex-col justify-center w-[80vw] rounded-lg shadow-md">
          <div
            className="bg-white absolute p-1 h-fit w-fit rounded-md top-1 right-1 cursor-pointer"
            onClick={() => {
              setModal(false);
            }}
          >
            <FiX size={20} />
          </div>
          {/* Section Switches */}
          <div className="flex justify-center mt-4 space-x-5">
            <button
              className={`${
                activeSection === "addStock"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-600"
              } rounded-lg py-2 lg:px-4 px-1 font-semibold shadow-md`}
              onClick={() => setActiveSection("addStock")}
            >
              Add New Stock
            </button>
            <button
              className={`${
                activeSection === "addWaste"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-600"
              } rounded-lg py-2 lg:px-4 px-1 font-semibold shadow-md`}
              onClick={() => setActiveSection("addWaste")}
            >
              Add Waste
            </button>
          </div>

          {/* Section Title */}
          <div className="flex justify-center mt-6 mx-10 font-bold text-xl mb-10">
            {activeSection === "addStock"
              ? `${itemData?.item?.itemDetails?.name}`
              : `${itemData?.item?.itemDetails?.name}`}
          </div>

          {/* Stock Section */}
          {activeSection === "addStock" && (
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-col w-[40vw] mb-4">
                <label
                  className="text-left mb-1 text-sm font-medium"
                  htmlFor="Price"
                >
                  Purchase Price Per Unit
                </label>
                <input
                  name="Price"
                  type="number"
                  value={price}
                  onChange={(e)=>{setPrice(e.target.value)}}
                  placeholder="Enter purchase amount of item per unit"
                  className="border border-gray-300 rounded-lg p-2 text-sm w-[40vw] focus:outline-none focus:ring focus:ring-orange-300 mt-1"
                />
              </div>
              <div className="flex flex-col w-[40vw] mb-4">
                <label
                  className="text-left mb-1 text-sm font-medium"
                  htmlFor="Quantity"
                >
                  Purchase Quantity
                </label>
                {itemData?.item?.itemDetails?.unit === "kg" ? (
                  <div className="flex space-x-6 w-[40vw] mb-4">
                    <input
                      name="Quantity"
                      type="number"
                      value={weight.kg}
                      onChange={(e)=>{setWeight({ ...weight, kg: e.target.value })}}
                      placeholder="Enter purchase quantity of item in Kg"
                      className="border border-gray-300 rounded-lg p-2 text-sm w-[20vw] focus:outline-none focus:ring focus:ring-orange-300 mt-1"
                    />
                    <input
                      name="Quantity"
                      type="number"
                      value={weight.gram}
                      onChange={(e)=>{setWeight({ ...weight, gram: e.target.value })}}
                      placeholder="Enter purchase quantity of item in grams"
                      className="border border-gray-300 rounded-lg p-2 text-sm w-[20vw] focus:outline-none focus:ring focus:ring-orange-300 mt-1"
                    />{" "}
                  </div>
                ) : itemData?.item?.itemDetails?.unit === "litre" ?(
                  <input
                    name="Quantity"
                    type="number"
                    value={weight.litre}
                      onChange={(e)=>{setWeight({ ...weight, litre: e.target.value })}}
                    placeholder="Enter purchase quantity of item"
                    className="border border-gray-300 rounded-lg p-2 text-sm w-[40vw] focus:outline-none focus:ring focus:ring-orange-300 mt-1"
                  />
                ) : itemData?.item?.itemDetails?.unit === "packet" ? (
                  <input
                    name="Quantity"
                    type="number"
                    value={weight.packet}
                      onChange={(e)=>{setWeight({ ...weight, packet: e.target.value })}}
                    placeholder="Enter purchase quantity of item"
                    className="border border-gray-300 rounded-lg p-2 text-sm w-[40vw] focus:outline-none focus:ring focus:ring-orange-300 mt-1"
                  />
                ) : (
                  <input
                    name="Quantity"
                    type="number"
                    value={weight.piece}
                      onChange={(e)=>{setWeight({ ...weight, piece: e.target.value })}}
                    placeholder="Enter purchase quantity of item"
                    className="border border-gray-300 rounded-lg p-2 text-sm w-[40vw] focus:outline-none focus:ring focus:ring-orange-300 mt-1"
                  />
                )}
              </div>
              <button
                className="bg-green-500 text-white rounded-lg py-2 px-4 text-sm font-semibold hover:bg-green-600 w-[40vw]"
                onClick={() => addItemStock()}
              >
                Add Stock
              </button>
            </div>
          )}

          {/* Waste Section */}
          {activeSection === "addWaste" && (
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-col w-[40vw] mb-4">
                <label
                  className="text-left mb-1 text-sm font-medium"
                  htmlFor="WasteQuantity"
                >
                  Waste Quantity
                </label>
                {itemData?.item?.itemDetails?.unit === "kg" ? (
                  <div className="flex space-x-6 w-[40vw] mb-4">
                    <input
                      name="Quantity"
                      type="number"
                      value={waste.kg}
                      onChange={(e)=>{setWaste({ ...waste, kg: e.target.value })}}
                      placeholder="Enter waste quantity in Kg"
                      className="border border-gray-300 rounded-lg p-2 text-sm w-[20vw] focus:outline-none focus:ring focus:ring-orange-300 mt-1"
                    />
                    <input
                      name="Quantity"
                      type="number"
                      value={waste.gram}
                      onChange={(e)=>{setWaste({ ...waste, gram: e.target.value })}}
                      placeholder="Enter waste quantity in Grams"
                      className="border border-gray-300 rounded-lg p-2 text-sm w-[20vw] focus:outline-none focus:ring focus:ring-orange-300 mt-1"
                    />
                  </div>
                ) : itemData?.item?.itemDetails?.unit === "litre" ?(
                  <input
                    name="Quantity"
                    type="number"
                    value={waste.litre}
                      onChange={(e)=>{setWaste({ ...waste, litre: e.target.value })}}
                    placeholder="Enter waste quantity of item"
                    className="border border-gray-300 rounded-lg p-2 text-sm w-[40vw] focus:outline-none focus:ring focus:ring-orange-300 mt-1"
                  />
                ) : itemData?.item?.itemDetails?.unit === "packet" ?(
                  <input
                    name="Quantity"
                    type="number"
                    value={waste.packet}
                      onChange={(e)=>{setWaste({ ...waste, packet: e.target.value })}}
                    placeholder="Enter waste quantity of item"
                    className="border border-gray-300 rounded-lg p-2 text-sm w-[40vw] focus:outline-none focus:ring focus:ring-orange-300 mt-1"
                  />
                ): (
                  <input
                    name="Quantity"
                    type="number"
                    value={waste.piece}
                      onChange={(e)=>{setWaste({ ...waste, piece: e.target.value })}}
                    placeholder="Enter waste quantity of item"
                    className="border border-gray-300 rounded-lg p-2 text-sm w-[40vw] focus:outline-none focus:ring focus:ring-orange-300 mt-1"
                  />
                )}
              </div>
              <div className="flex flex-col w-[40vw] mb-4">
                <label
                  className="text-left mb-1 text-sm font-medium"
                  htmlFor="WasteReason"
                >
                  Reason for Waste
                </label>
                <input
                  name="WasteReason"
                  type="text"
                  value={wasteReason}
                  onChange={(e) => setWasteReason(e.target.value)}
                  placeholder="Enter reason for waste of item"
                  className="border border-gray-300 rounded-lg p-2 text-sm w-[40vw] focus:outline-none focus:ring focus:ring-orange-300 mt-1"
                />
              </div>
              <button
                className="bg-green-500 text-white rounded-lg py-2 px-4 text-sm font-semibold hover:bg-green-600 w-[40vw]"
                onClick={() => addItemWaste()}
              >
                Add Waste
              </button>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}

export default ProfileStock;
