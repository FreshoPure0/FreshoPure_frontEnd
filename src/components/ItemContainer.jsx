import React, { useEffect, useState } from 'react';
import QuantityModal from "../components/QuantityModal";
import Modal from 'react-modal'; // If you haven't installed this, run `npm install react-modal`
import { useSelector, useDispatch } from "react-redux";
import { getAllAddress } from "../store/actions/address";
import { removeFromCart } from "../store/actions/cart";


Modal.setAppElement('#root'); // Set the root element for accessibility

function ItemContainer(item) {
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [weightKg, setWeightKg] = useState(item?.item.cartItems.quantity.kg)
    const [weightG, setWeightG] = useState(item?.item.cartItems.quantity.gram)
    const [weight, setWeight] = useState(item?.item.cartItems.quantity.litre || item?.item.cartItems.quantity.piece || item?.item.cartItems.quantity.packet)
    const { selectedAddress } = useSelector((state) => state.address);
    console.log(selectedAddress)

    const [addressLine1, setAddressLine1] = useState();
    const [addressLine2, setAddressLine2] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [pincode, setPincode] = useState();

    console.log(item,"cont")

    const openModal = async() => {
        setModalIsOpen(true);
        setAddressLine1(selectedAddress?.addressLine1);
        setAddressLine2(selectedAddress?.addressLine2);
        setCity(selectedAddress?.city);
        setState(selectedAddress?.state);
        setPincode(selectedAddress?.pinCode);
    };

    useEffect(()=>{
        const fetchAddress = async () => {
            await dispatch(getAllAddress());
          };
          fetchAddress();
    },[])

    const handleRemoveCart = async() => {
        await dispatch(removeFromCart(item?.item.cartItems.itemId))
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setOrderPlaced(false); // Reset to address details after closing
    };

    const handlePlaceOrder = () => {
        
        setOrderPlaced(true);
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
                        <img
                            src={func(item?.item.itemDetails.image.img)}
                            alt="Item Image"
                            className="flex-3 mx-20 mt-5 h-16 w-fit justify-center items-center"
                        />
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
                            {item?.item.cartItems.quantity.kg ? (
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
                        {/* <button
                            className=" flex-3 w-36 bg-[#619524] rounded-full text-white items-center justify-center mx-12 my-4"
                            onClick={openModal}
                        >
                            Proceed
                        </button> */}
                        {/* <button
                            className=" flex-3 w-36 bg-[#619524] rounded-full text-white items-center justify-center mx-12"
                            onClick={() => {
                                console.log("Remove button clicked");
                                handleRemoveCart()   
                            }}
                            >
                            Remove
                        </button> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Component */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Order Modal"
                className="bg-[#fbf5ec] p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                {orderPlaced ? (
                    <div className="text-center">
                        <img src="./assets/order_placed.png" alt="Order Placed" className="mx-auto mt-2 h-24 mb-2" />
                        <h2 className="text-2xl font-bold">Order placed!</h2>
                        <p className="my-4">Your order has been successfully placed. You can track your order or continue shopping.</p>
                        <button className="bg-[#619524] text-white rounded-full px-4 py-2 m-2">Track order</button>
                        <button className="border border-[#896439] text-[#896439] rounded-full px-4 py-2 m-2" onClick={closeModal}>Continue shopping</button>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Confirm your order</h2>
                        <table className="w-full text-left border-collapse mb-4">
                            <thead>
                                <tr>
                                    <th className="border-b border-[#896439] p-2 ">Address Line 1</th>
                                    <th className="border-b border-[#896439] p-2">Address Line 2</th>
                                    <th className="border-b border-[#896439] p-2">City</th>
                                    <th className="border-b border-[#896439] p-2">State</th>
                                    <th className="border-b border-[#896439] p-2">Pincode</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-b border-[#896439] p-2">
                                        <input
                                            type="text"
                                            value={addressLine1}
                                            onChange={(e) => setAddressLine1(e.target.value)}
                                            className="w-full px-2 py-1 bg-[#fbf5ec]"
                                        />
                                    </td>
                                    <td className="border-b border-[#896439] p-2">
                                        <input
                                            type="text"
                                            value={addressLine2}
                                            onChange={(e) => setAddressLine2(e.target.value)}
                                            className="w-full px-2 py-1 bg-[#fbf5ec]"
                                        />
                                    </td>
                                    <td className="border-b border-[#896439] p-2">
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className="w-full px-2 py-1 bg-[#fbf5ec] "
                                        />
                                    </td>
                                    <td className="border-b border-[#896439] p-2">
                                        <input
                                            type="text"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            className="w-full px-2 py-1 bg-[#fbf5ec] "
                                        />
                                    </td>
                                    <td className="border-b border-[#896439] p-2">
                                        <input
                                            type="text"
                                            value={pincode}
                                            onChange={(e) => setPincode(e.target.value)}
                                            className="w-full px-2 py-1 bg-[#fbf5ec] "
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="bg-[#619524] text-white rounded-full px-4 py-2" onClick={handlePlaceOrder}>
                            Place order
                        </button>
                    </div>
                )}
            </Modal>
        </>
    );
}

export default ItemContainer;
