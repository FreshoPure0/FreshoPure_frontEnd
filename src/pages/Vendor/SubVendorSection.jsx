import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import SubVendorCard from "../../components/SubVendorCard";
import { fetchSubVendors, addSubVendor } from "../../store/actions/subvendor";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";

Modal.setAppElement("#root");

function SubVendorSection() {
  const dispatch = useDispatch();
  const { allSubVendors } = useSelector((state) => state.subVendor);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  console.log(fullName)
  console.log(phone)

  const openModal = async() => {
    setModalIsOpen(true);
};
const closeModal = () => {
  setModalIsOpen(false);
  setFullName("")
  setPhone("")
};

const handleAddNewVendor = async() => {
  try {
    await dispatch(addSubVendor(fullName, phone));
  } catch (error) {
    console.log(error)
  }
}

  useEffect(() => {
    const getSubVendor = async () => {
      await dispatch(fetchSubVendors());
    };
    getSubVendor();
  }, []);
  // console.log(allSubVendors,"subVendors")
  return (
    <section>
      <div className="flex flex-col ml-6">
        <div className="flex flex-row justify-between mt-10 mb-4">
          <h2 className="text-3xl font-bold mb-4">Sub Vendors</h2>
          <SearchBar />
        </div>
        <div className="py-3 h-[67vh] bg-[#EFE5D8] rounded-lg flex flex-row overflow-y-auto hide-scrollbar justify-evenly relative">
          {allSubVendors?.map((subVendor, index) => (
            <SubVendorCard key={`${index}`} subVendor={subVendor} />
          ))}
          <button
            className="w-36 h-10 bg-[#619524] mt-2 rounded-full text-white  absolute bottom-4 right-4 shadow-md"
            onClick={openModal}
          >
            Add Subvendor
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Sub-Vendor Modal"
        className="bg-[#fbf5ec] p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-100"
      >
        <div>
          <h2 className="text-xl font-bold mb-4">Add New Sub-Vendor</h2>
          <table className="w-full text-left border-collapse mb-4">
            <thead>
              <tr>
                <th className="border-b border-[#896439] p-2 ">
                  Fullname
                </th>
                <th className="border-b border-[#896439] p-2">
                  Phone Number
                </th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-[#896439] p-2">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-2 py-1 border-none bg-[#fbf5ec]"
                  />
                </td>
                <td className="border-b border-[#896439] p-2">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-2 py-1 border-none bg-[#fbf5ec]"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className="bg-[#619524] text-white rounded-full px-4 py-2"
            onClick={()=> {
              handleAddNewVendor()
              closeModal()
            }}
          >
            Add Sub-Vendor
          </button>
        </div>
      </Modal>
    </section>
  );
}

export default SubVendorSection;
