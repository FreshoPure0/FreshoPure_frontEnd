import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import SearchBar from "../../components/SearchBar";
import ItemContainer from "../../components/ItemContainer";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems, clearCart } from "../../store/actions/cart";
import { placeorder } from "../../store/actions/order";
import { getAllAddress } from "../../store/actions/address";
import Modal from "react-modal"; // If you haven't installed this, run `npm install react-modal`

Modal.setAppElement("#root"); // Set the root element for accessibility

function CartSection() {
  const dispatch = useDispatch();
  const [isEmpty, setIsEmpty] = useState(true);
  const { items } = useSelector((state) => state.cart);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { selectedAddress } = useSelector((state) => state.address);
  console.log(selectedAddress);

  const [addressLine1, setAddressLine1] = useState();
  const [addressLine2, setAddressLine2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [pincode, setPincode] = useState();

  const openModal = async () => {
    setModalIsOpen(true);
    setAddressLine1(selectedAddress?.addressLine1);
    setAddressLine2(selectedAddress?.addressLine2);
    setCity(selectedAddress?.city);
    setState(selectedAddress?.state);
    setPincode(selectedAddress?.pinCode);
  };

  const handleOrderPlace = async () => {
    if (isOrderPlaced) return; // Prevent multiple submissions

    setIsOrderPlaced(true);
    try {
      if (selectedAddress !== null) {
        await dispatch(placeorder());

      } else {
          console.log("Address")
      }
    } catch (err) {
      // setError(err.message);
      console.error(err)
    } finally {
      setIsOrderPlaced(false);
      setOrderPlaced(true);
      await dispatch(clearCart())

    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      await dispatch(getAllAddress());
    };
    fetchAddress();
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
    setOrderPlaced(false); // Reset to address details after closing
  };

  const handlePlaceOrder = () => {
  };

  // console.log(items,"cart")

  useEffect(() => {
    const fetchCartItem = async () => {
      await dispatch(fetchCartItems());
    };
    fetchCartItem();
  }, []);

  return (
    <>
      <section className="flex flex-col ml-6 ">
        <div className="flex flex-row justify-between mt-10 h-fit mb-4">
          <h2 className="text-3xl font-bold mb-0">Cart Details</h2>
          <SearchBar />
        </div>
        {items.length > 0 ? (
          <div className="py-2 h-[73vh] relative bg-[#EFE5D8] rounded-lg flex flex-col overflow-y-auto hide-scrollbar">
            <FiArrowLeft
              className="bg-white rounded-md shadow p-1 h-7 w-7 ml-4 mt-1 mb-2 flex flex-shrink-0"
              size={20}
            />
            {items?.map((item, index) => (
              <ItemContainer key={`${index}`} item={item} />
            ))}
            <div className="absolute bottom-0 flex justify-center w-full">
              <button
                className=" flex-3 w-36 bg-[#619524] py-1 rounded-full text-white items-center justify-center mx-12 my-4"
                onClick={openModal}
              >
                Proceed
              </button>
            </div>
          </div>
        ) : (
          <div className="py-2 w-full h-full bg-[#EFE5D8] rounded-lg flex flex-col items-center justify-center text-center">
            <img
              src="/assets/cart.png"
              alt=""
              className="h-32 w-auto mb-3 mt-28"
            />
            <p className="font-bold ">Cart empty</p>
            <p className="mt-1">Let's change that by adding some </p>
            <p className="mb-24">items to the cart, shall we...</p>
          </div>
        )}
      </section>

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
            <img
              src="./assets/order_placed.png"
              alt="Order Placed"
              className="mx-auto mt-2 h-24 mb-2"
            />
            <h2 className="text-2xl font-bold">Order placed!</h2>
            <p className="my-4">
              Your order has been successfully placed. You can track your order
              or continue shopping.
            </p>
            <button className="bg-[#619524] text-white rounded-full px-4 py-2 m-2">
              Track order
            </button>
            <button
              className="border border-[#896439] text-[#896439] rounded-full px-4 py-2 m-2"
              onClick={closeModal}
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Delivering to</h2>
            <table className="w-full text-left border-collapse mb-4">
              <thead>
                <tr>
                  <th className="border-b border-[#896439] p-2">
                    Address Line 1
                  </th>
                  <th className="border-b border-[#896439] p-2">
                    Address Line 2
                  </th>
                  <th className="border-b border-[#896439] p-2">City</th>
                  <th className="border-b border-[#896439] p-2">State</th>
                  <th className="border-b border-[#896439] p-2">Pincode</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-[#896439] p-2">
                    <span>{addressLine1}</span>{" "}
                    {/* Displaying Address Line 1 */}
                  </td>
                  <td className="border-b border-[#896439] p-2">
                    <span>{addressLine2}</span>{" "}
                    {/* Displaying Address Line 2 */}
                  </td>
                  <td className="border-b border-[#896439] p-2">
                    <span>{city}</span> {/* Displaying City */}
                  </td>
                  <td className="border-b border-[#896439] p-2">
                    <span>{state}</span> {/* Displaying State */}
                  </td>
                  <td className="border-b border-[#896439] p-2">
                    <span>{pincode}</span> {/* Displaying Pincode */}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="bg-[#619524] text-white rounded-full px-4 py-2"
              onClick={handleOrderPlace}
            >
              Place order
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}

export default CartSection;
