import React, { useEffect, useState } from 'react';
import QuantityModal from "../components/QuantityModal";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/actions/cart";

function ItemContainer(item) {
    const dispatch = useDispatch();
    const [weightKg, setWeightKg] = useState(item?.item.cartItems.quantity.kg)
    const [weightG, setWeightG] = useState(item?.item.cartItems.quantity.gram)
    const [weight, setWeight] = useState(item?.item.cartItems.quantity.litre || item?.item.cartItems.quantity.piece || item?.item.cartItems.quantity.packet)
console.log(item)

    const handleRemoveCart = async() => {
        await dispatch(removeFromCart(item?.item.cartItems.itemId))
    };

    function func(img) {
        let image = img?.substr(12);
        const retImage =
          "https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com" + image;
    
        return retImage;
      }
    return (
        <>
            <div className="flex bg-white h-32 m-2 mx-4 rounded-lg shadow">
                <div className=" flex-1 border rounded-l">
                    <div className="flex flex-col">
                        <p className="flex-1 text-white bg-[#896439] rounded-tl text-center">
                            Item image
                        </p>
                        <div className='flex h-24 p-4 justify-center items-center'>
                        <img
                            src={func(item?.item.itemDetails.image.img)}
                            alt="Item Image"
                            className=" h-16 "
                        />
                        </div>
                    </div>
                </div>
                <div className=" flex-1 border ">
                    <div className="flex flex-col">
                        <p className="flex-1 text-white bg-[#896439] text-center">Item name</p>
                        <p className=" flex-3 text-center justify-center my-9 font-bold">
                            {item?.item.itemDetails.name}
                        </p>
                    </div>
                </div>
                <div className=" flex-1 border ">
                    <div className="flex flex-col">
                        <p className="flex-1 text-white bg-[#896439] text-center">Quantity</p>
                        <div className="flex items-center justify-center flex-col my-8">
                            {item?.item.itemDetails.unit === "kg" ? (
                            <div className='flex'>
                            <div className='flex flex-col text-center mx-1'>
                            <input type='number' maxLength="3" className='w-24 bg-white border text-center border-gray-400 rounded outline-none px-2 focus:border-[#619524]' placeholder='Kg' value={weightKg}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value >= 0 && value <= 200) {
                                    setWeightKg(value);
                                }
                            }}/>
                            <label htmlFor="" className='text-sm'>In Kg</label>
                            </div>
                            <div className='flex flex-col text-center mx-1'>
                            <input type='number'
                            maxLength="3" 
                            className='w-24 bg-white border text-center border-gray-400 rounded outline-none px-2 focus:border-[#619524]' 
                            placeholder='Grams' 
                            value={item?.item.cartItems.quantity.gram}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value >= 0 && value <= 999) {
                                    setWeightG(value);
                                }
                            }}
                            />
                            <label htmlFor="" className='text-sm'>In G</label>
                            </div>
                            </div>
                            ) : item?.item.cartItems.quantity.litre ? (
                                <div className='flex flex-col text-center'>
                                <input type='number' maxLength="3" className=' bg-white border border-gray-400 text-center rounded outline-none px-2 focus:border-[#619524]' placeholder='Litre' 
                                value={weight}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value >= 0 && value <= 200) {
                                        setWeight(value);
                                    }
                                }}/>
                                <label htmlFor="" className='text-sm'>In Litres</label>
                                </div>
                            ) :item?.item.cartItems.quantity.piece ? (
                                <div className='flex flex-col text-center'>
                                <input type='number' maxLength="3" className=' bg-white border border-gray-400 text-center rounded outline-none px-2 focus:border-[#619524]' placeholder='Piece' value={weight}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value >= 0 && value <= 200) {
                                        setWeight(value);
                                    }
                                }}/>
                                <label htmlFor="" className='text-sm'>In Pieces</label>
                                </div>
                            ) :item?.item.cartItems.quantity.packet ? (
                                <div className='flex flex-col text-center'>
                                <input type='number' maxLength="3" className=' bg-white border border-gray-400 text-center rounded outline-none px-2 focus:border-[#619524]' placeholder='Packet' value={weight}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value >= 0 && value <= 200) {
                                        setWeight(value);
                                    }
                                }}/>
                                <label htmlFor="" className='text-sm'>In Packets</label>
                                </div>
                            ) : null}
                            {/* <p className="text-center text-xs font-light">in {item?.item.cartItems.unit}</p> */}
                        </div>
                    </div>
                </div>
                <div className=" flex-1 border ">
                    <div className="flex flex-col">
                        <p className="flex-1 text-white bg-[#896439] rounded-tr text-center">
                            Action
                        </p>
                        <div className="flex min-h-[16vh] flex-1 justify-center items-center align-middle">
                        <button
                            className=" flex-3 w-36 bg-[#619524] rounded-full text-white items-center justify-center mx-12 my-4"
                            onClick={handleRemoveCart}
                        >
                            Remove
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemContainer;
