import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiX } from "react-icons/fi";
import { getVendorItems } from "../../store/actions/vendor";
import { useDispatch, useSelector } from "react-redux";

function ProfileStock({ onBack }) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [activeSection, setActiveSection] = useState("addStock");
  const { allVendorItems } = useSelector((state) => state.vendor);

  useEffect(() => {
    dispatch(getVendorItems(0));
  }, []);

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

  return (
    <section className="bg-[#EFE5D8] h-[70vh] flex flex-col items-center  rounded-lg p-1 overflow-y-auto hide-scrollbar">
      <div className="flex items-start w-full relative cursor-pointer mb-10">
        <FiArrowLeft
          className="bg-white absolute top-3 left-1 rounded-md shadow p-1 h-7 w-7 ml-4 mt-1 mb-2 flex flex-shrink-0"
          onClick={onBack}
          size={20}
        />
      </div>
      {allVendorItems.map((item, index) => (
        <div
          className="bg-white h-fit flex-col w-[70vw] flex justify-evenly rounded-lg shadow-md mt-4"
          onClick={() => {
            setModal(true);
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
                <p className="text-xs">
                  {item?.totalQuantity?.kg} <span>Kg</span>
                </p>
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
              <div className="flex flex-col items-center  border-gray-300 ">
                <h4 className="text-gray-500 text-xs ">WASTE</h4>
                <p className="text-xs">10 Litres</p>
              </div>
            </div>
          </div>
        </div>
      ))}

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
          <div className="flex justify-center mt-6 font-bold text-xl mb-10">
            {activeSection === "addStock" ? "ADD NEW STOCK" : "ADD WASTE"}
          </div>

          {/* Stock Section */}
          {activeSection === "addStock" && (
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-col w-[40vw] mb-4">
                <label
                  className="text-left mb-1 text-sm font-medium"
                  htmlFor="Quantity"
                >
                  Purchase Price Per Unit
                </label>
                <input
                  name="Quantity"
                  type="number"
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
                <input
                  name="Quantity"
                  type="number"
                  placeholder="Enter purchase quantity of item"
                  className="border border-gray-300 rounded-lg p-2 text-sm w-[40vw] focus:outline-none focus:ring focus:ring-orange-300 mt-1"
                />
              </div>
              <button
                className="bg-green-500 text-white rounded-lg py-2 px-4 text-sm font-semibold hover:bg-green-600 w-[40vw]"
                onClick={() => alert("Stock Added!")}
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
                <input
                  name="WasteQuantity"
                  type="number"
                  placeholder="Enter waste quantity of item"
                  className="border border-gray-300 rounded-lg p-2 text-sm w-[40vw] focus:outline-none focus:ring focus:ring-orange-300 mt-1"
                />
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
                  placeholder="Enter reason for waste of item"
                  className="border border-gray-300 rounded-lg p-2 text-sm w-[40vw] focus:outline-none focus:ring focus:ring-orange-300 mt-1"
                />
              </div>
              <button
                className="bg-green-500 text-white rounded-lg py-2 px-4 text-sm font-semibold hover:bg-green-600 w-[40vw]"
                onClick={() => alert("Waste Recorded!")}
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
