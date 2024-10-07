import React from 'react';
import { FiX } from "react-icons/fi";


function VendorItemContainer({Items}) {
    // console.log(Items, "ite")

    function func(img) {
        let image = img?.substr(12);
        const retImage =
          "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image;
    
        return retImage;
      }
    return (  
        <>
        {Items?.map((item, index)=>
        <div className="flex flex-col min-w-80 bg-white rounded shadow m-2 flex-shrink-0" key={index}>
        <div className="bg-[#896439] relative text-white rounded-t p-1 flex justify-center">
          <p>{item?.itemDetails?.name}</p>
          <FiX className="absolute right-3 top-2"/>
        </div>
        <div className=" flex flex-row rounded-b  text-center justify-center items-center">
          <div className="flex flex-1 py-3 justify-center items-center border-r border-gray-300">
            <img
              src={func(item?.images?.img)}
              alt=""
              className="flex-1 h-8 max-w-fit "
            />
          </div>
          <div className="flex-1 py-3 flex flex-col justify-center items-center border-r border-gray-300">
            <p className="text-xs text-gray-500">PRICE</p>
            <p className="text-xs">108.90/Kg</p>
          </div>
          <div className="flex-1 py-2 flex flex-col justify-center items-center ">
            <p className="text-xs text-gray-500">STOCK</p>
            <p className="text-xs">
  {`${item?.itemDetails?.unit === "kg" ? item?.totalQuantity?.kg : item?.itemDetails?.unit === "packet" ? item?.totalQuantity?.packet : item?.itemDetails?.unit === "piece" ? item?.totalQuantity?.piece : item?.itemDetails?.unit === "litre" ? item?.totalQuantity?.litre : null} ${item?.itemDetails?.unit}`}
  
  {item?.itemDetails?.unit === "kg" && ` ${item?.totalQuantity?.gram || 0} gram`}
</p>

          </div>
        </div>
      </div>
      )}
      </>
    );
}

export default VendorItemContainer;