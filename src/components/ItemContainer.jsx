import React, { useState } from 'react';
import QuantityModal from "../components/QuantityModal";
import Modal from 'react-modal'; // If you haven't installed this, run `npm install react-modal`

Modal.setAppElement('#root'); // Set the root element for accessibility

function ItemContainer() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const [address, setAddress] = useState('254, Shri Nagar, Behind Sabhagruha, 3rd Lane');
    const [city, setCity] = useState('Nagpur');
    const [state, setState] = useState('Maharashtra');
    const [pincode, setPincode] = useState('440009');

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setOrderPlaced(false); // Reset to address details after closing
    };

    const handlePlaceOrder = () => {
        setOrderPlaced(true);
    };

    return (
        <>
            <div className="flex bg-white h-32 m-2 mx-4 rounded-lg shadow">
                <div className=" flex-1 border rounded-l">
                    <div className="flex flex-col">
                        <p className="flex-1 text-white bg-[#896439] rounded-tl text-center">
                            Item image
                        </p>
                        <img
                            src="./assets/Milk.png"
                            alt="hi"
                            className="flex-3 ml-14 mt-6 h-16 w-fit justify-center items-center"
                        />
                    </div>
                </div>
                <div className=" flex-1 border ">
                    <div className="flex flex-col">
                        <p className="flex-1 text-white bg-[#896439] text-center">Item name</p>
                        <p className=" flex-3 text-center justify-center my-9 font-bold">
                            Low fat milk
                        </p>
                    </div>
                </div>
                <div className=" flex-1 border ">
                    <div className="flex flex-col">
                        <p className="flex-1 text-white bg-[#896439] text-center">Quantity</p>
                        <div className="flex items-center justify-center flex-col my-8">
                            <QuantityModal />
                            <p className="text-center text-xs font-light">in litres</p>
                        </div>
                    </div>
                </div>
                <div className=" flex-1 border ">
                    <div className="flex flex-col">
                        <p className="flex-1 text-white bg-[#896439] text-center">Price</p>
                        <div className="flex-3 my-8">
                            <p className="text-center justify-center font-bold ">
                                ₹ 400/-
                            </p>
                            <p className="text-center justify-center text-xs font-light">
                                ₹ 80/litre
                            </p>
                        </div>
                    </div>
                </div>
                <div className=" flex-1 border ">
                    <div className="flex flex-col">
                        <p className="flex-1 text-white bg-[#896439] rounded-tr text-center">
                            Action
                        </p>
                        <button
                            className=" flex-3 w-36 bg-[#619524] rounded-full text-white items-center justify-center mx-6 my-9"
                            onClick={openModal}
                        >
                            Proceed
                        </button>
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
                                    <th className="border-b border-[#896439] p-2">Address</th>
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
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
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
