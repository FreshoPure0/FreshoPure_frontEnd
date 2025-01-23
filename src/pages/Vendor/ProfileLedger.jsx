import React, { useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import Modal from "react-modal";
import { BiFilterAlt } from "react-icons/bi";
import { GoPencil } from "react-icons/go";
function ProfileLedger() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editTransaction, seteditTransaction] = useState(false)
  const [filterDate, setFilterDate] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [addTransaction, setaddTransaction] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      date: "2025-01-15",
      invoiceNo: "1",
      amount: 10000,
      action: "Dr",
      balance: 5000,
      status: "Approved",
      hotel: "Dummy Hotel",
      edit: (
        <div className="flex space-x-4">
          <GoPencil className="cursor-pointer" />
        </div>
      ),
    },
    {
      date: "2025-01-14",
      invoiceNo: "2",
      amount: 10000,
      action: "Dr",
      balance: 5000,
      status: "Approved",
      hotel: "Bombay Hospital",
      edit: (
        <div className="flex space-x-4">
          <GoPencil className="cursor-pointer" />
        </div>
      ),
    },
    {
      date: "2025-01-13",
      invoiceNo: "3",
      amount: 15000,
      action: "Dr",
      balance: 2000,
      status: "Pending",
      hotel: "Gud Mishri",
      edit: (
        <div className="flex space-x-4">
          <GoPencil className="cursor-pointer" />
        </div>
      ),
    },
    {
      date: "2025-01-12",
      invoiceNo: "4",
      amount: 12000,
      action: "Dr",
      balance: 2000,
      status: "Approved",
      hotel: "Kanha Tan Sukh",
      edit: (
        <div className="flex space-x-4">
          <GoPencil className="cursor-pointer" />
        </div>
      ),
    },
    {
      date: "2025-01-12",
      invoiceNo: "5",
      amount: 12000,
      action: "Cr",
      balance: 2000,
      status: "Pending",
      hotel: "Kanha Vaishali Nagar",
      edit: (
        <div className="flex space-x-4">
          <GoPencil className="cursor-pointer" />
        </div>
      ),
    },
    {
      date: "2025-01-11",
      invoiceNo: "6",
      amount: 12000,
      action: "Cr",
      balance: 2000,
      status: "Approved",
      hotel: "Taverns",
      edit: (
        <div className="flex space-x-4">
          <GoPencil className="cursor-pointer" />
        </div>
      ),
    },
    {
      date: "2025-01-10",
      invoiceNo: "7",
      amount: 12000,
      action: "Cr",
      balance: 2000,
      status: "Pending",
      hotel: "Dummy Hotel",
      edit: (
        <div className="flex space-x-4">
          <GoPencil className="cursor-pointer" />
        </div>
      ),
    },
    {
      date: "2025-01-09",
      invoiceNo: "8",
      amount: 12000,
      action: "Cr",
      balance: 2000,
      status: "Pending",
      hotel: "Dummy Hotel",
      edit: (
        <div className="flex space-x-4">
          <GoPencil className="cursor-pointer" />
        </div>
      ),
    },
  ]);

  // Filter transactions by date
  const filteredTransactions = filterDate
    ? transactions.filter((txn) => txn.date === filterDate)
    : transactions;

  // Calculate total amounts
  const totalCredit = filteredTransactions
    .filter((txn) => txn.action === "Cr") // Filter only credit transactions
    .reduce((sum, txn) => sum + txn.balance, 0);

  const totalAmount = filteredTransactions.reduce(
    (sum, txn) => sum + txn.amount,
    0
  );
  const totalDebit = filteredTransactions
    .filter((txn) => txn.action === "Dr") // Filter only debit transactions
    .reduce((sum, txn) => sum + txn.balance, 0);

  const totalbalance = totalCredit - totalDebit;
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setSelectedTransaction(null); // Reset selected transaction when closing modal
    setaddTransaction(false);
    setIsModalOpen(false);
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        closeModal(); // Close the modal on Escape key
      }
    };

    // Attach the keydown listener when the modal is opened
    window.addEventListener("keydown", handleEscKey);
    return handleEscKey;
  };

  const applyFilter = () => {
    setFilterDate(inputDate); // Apply the filter with the selected date
    closeModal();
  };
  

  return (
    <>
    {/* Add Entry Modal */}
      {addTransaction && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-200 to-orange-100 transform transition-transform duration-300 ease-in-out p-4 w-[90%] max-w-[95%] z-50 rounded-lg shadow-lg h-[50vh]">
          <h1 className="text-center text-2xl font-bold text-black flex justify-center items-start h-[10vh]">
            Add a transaction
          </h1>
          <div className="w-full bg-white rounded-lg shadow p-2">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white shadow-md">
                <tr>
                  <th className="py-2 px-4 border-b font-bold">Date</th>
                  <th className="py-2 px-4 border-b font-bold">Hotel</th>
                  <th className="py-2 px-4 border-b font-bold">Remarks</th>
                  <th className="py-2 px-4 border-b font-bold">Status</th>
                  <th className="py-2 px-4 border-b font-bold">Amount</th>
                  <th className="py-2 px-4 border-b font-bold">Dr/Cr</th>
                  {/* <th className="py-2 px-4 border-b font-bold">Edit</th> */}
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">
                    <input
                      className="w-[10vw] rounded-md p-1"
                      type="date"
                      placeholder="Enter Date"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <select className="w-[10vw] rounded-md p-1" name="hotels">
                      <option value="">Select a hotel</option>
                      <option value="">Dummy Hotel</option>
                      <option value="">Kanha Tan Sukh</option>
                      <option value="">Gud Mishri</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {" "}
                    <input
                      className=" w-[7vw] rounded-md p-1"
                      type="text"
                      placeholder="Remark"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                  Pending
                  </td>
                  <td className="py-2 px-4 border-b">
                    ₹{" "}
                    <input
                      type="number"
                      className="w-[7vw] rounded-md p-1"
                      placeholder="Amount"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    Cr
                  </td>
                  {/* <td className="py-2 px-4 border-b">
                    <div className="flex space-x-4">
                      <GoPencil className="cursor-pointer" />
                    </div>
                  </td> */}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex gap-3 mt-2">
            <button className="bg-[#EFE5D8] text-yellow-900 rounded-md px-4 py-1 shadow flex items-center gap-2">
              Save
            </button>
            <button
              onClick={closeModal}
              className="bg-[#EFE5D8] text-yellow-900 rounded-md px-4 py-1 shadow flex items-center gap-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {selectedTransaction && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-200 to-orange-100 transform transition-transform duration-300 ease-in-out p-4 w-[90%] max-w-[95%] z-50 rounded-lg shadow-lg h-[50vh]">
          <h1 className="text-center text-2xl font-bold text-black flex justify-center items-start h-[10vh]">
            Edit the transaction
          </h1>
          <div className="w-full bg-white rounded-lg shadow p-2">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white shadow-md">
                <tr>
                  <th className="py-2 px-4 border-b font-bold">Date</th>
                  <th className="py-2 px-4 border-b font-bold">Hotel</th>
                  <th className="py-2 px-4 border-b font-bold">Remarks</th>
                  <th className="py-2 px-4 border-b font-bold">Status</th>
                  <th className="py-2 px-4 border-b font-bold">Amount</th>
                  <th className="py-2 px-4 border-b font-bold">Dr/Cr</th>
                  <th className="py-2 px-4 border-b font-bold">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">
                    {selectedTransaction.date}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {selectedTransaction.hotel}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input type="text" className="w-[7vw] rounded-md p-1" placeholder="Enter a remark"/>
                  </td>
                  <td
                    className={`py-2 px-4 border-b ${
                      selectedTransaction.status === "Approved"
                        ? "text-green-500"
                        : selectedTransaction.status === "Pending"
                        ? "text-yellow-500"
                        : selectedTransaction.status === "Rejected"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {selectedTransaction.status}
                  </td>
                  <td className="py-2 px-4 border-b">
                    ₹ <input className="w-[7vw] rounded-md p-1" type="number" defaultValue={selectedTransaction.amount.toFixed(2)}/>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {selectedTransaction.action}
                  </td>
                  <td
                    className={`py-2 px-4 border-b ${
                      selectedTransaction.action === "Cr"
                        ? "text-green-500"
                        : selectedTransaction.action === "Dr"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    ₹{selectedTransaction.balance.toFixed(2)}
                  </td>
                  {/* <td className="py-2 px-4 border-b">
                    <div className="flex space-x-4">
                      <GoPencil className="cursor-pointer" />
                    </div>
                  </td> */}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex gap-3 mt-2">
            <button className="bg-[#EFE5D8] text-yellow-900 rounded-md px-4 py-1 shadow flex items-center gap-2">
              Save
            </button>
            <button
              onClick={closeModal}
              className="bg-[#EFE5D8] text-yellow-900 rounded-md px-4 py-1 shadow flex items-center gap-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <section className="mt-10 flex flex-col w-full lg:w-full md:w-4/5 h-[90vh] md:px-8 overflow-y-auto hide-scrollbar">
      {(addTransaction || selectedTransaction) ? <div onClick={closeModal} className="h-full w-full absolute top-0 left-0 z-40 bg-black opacity-40"></div> : null}
        <div className="flex justify-between mb-4">
          <h2 className="text-3xl font-bold mb-0">Ledger</h2>
          <div className="flex justify-end items-start gap-4">
            <button
              onClick={() => {
                setaddTransaction(true);
              }}
              className="bg-[#EFE5D8] text-yellow-900 rounded-md px-4 py-2 shadow flex items-center gap-2"
            >
              Add Entry
            </button>
            <button className="bg-[#EFE5D8] text-yellow-900 rounded-md px-4 py-2 shadow flex items-center gap-2">
              <AiOutlinePrinter /> Print
            </button>
            <button
              onClick={openModal}
              className="bg-[#EFE5D8] text-yellow-900 rounded-md px-4 py-2 shadow flex items-center gap-2"
            >
              <BiFilterAlt /> Filter
            </button>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
            },
            content: {
              inset: "unset",
              width: "300px",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              margin: "30px",
            },
          }}
        >
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">Filter Transactions</h2>
            <label htmlFor="filterDate" className="mb-2">
              Select From Date:
            </label>
            <input
              type="date"
              id="filterDate"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="border rounded p-2 w-full mb-4"
            />
            <label htmlFor="filterDate" className="mb-2">
              To Date:
            </label>
            <input
              type="date"
              id="filterDate"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="border rounded p-2 w-full mb-4"
            />
            <button
              className="bg-yellow-500 text-white rounded-md px-4 py-2 shadow w-full mb-2"
              onClick={applyFilter}
            >
              Apply Filter
            </button>
            <button
              className="bg-red-500 text-white rounded-md px-4 py-2 shadow w-full"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </Modal>

        <div className="bg-[#EFE5D8] h-[70vh] rounded-md">
          <div className="grid grid-cols-3 h-[10vh] w-full justify-items-center items-center text-center mt-2">
            <div className="bg-white rounded-lg shadow w-[80%] p-2 flex flex-col items-center">
              <h2 className="font-semibold text-lg text-gray-800">
                Opening Balance
              </h2>
              <p className="text-lg text-gray-600">Dummy Text</p>
            </div>
            <div className="bg-white rounded-lg shadow w-[80%]  p-2 flex flex-col items-center">
              <h2 className="font-semibold text-lg text-gray-800">
                Closing Balance
              </h2>
              <p className="text-lg text-gray-600">Dummy Text</p>
            </div>
            <div className="bg-white rounded-lg shadow w-[80%]  p-2 flex flex-col items-center">
              <h2 className="font-semibold text-lg text-gray-800">
                Remaining Balance
              </h2>
              <p className="text-lg text-gray-600">Dummy Text</p>
            </div>
          </div>

          <div className="mt-3 p-4 w-full h-[59vh] rounded-lg flex items-center justify-center overflow-y-auto hide-scrollbar">
            {/* Transaction Table */}
            <div className="w-full bg-white rounded-lg shadow p-2 overflow-x-auto max-h-[52vh] hide-scrollbar">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="sticky top-0 bg-white shadow-md">
                  <tr>
                    <th className="py-2 px-4 border-b font-bold">Date</th>
                    <th className="py-2 px-4 border-b font-bold">Hotel</th>
                    <th className="py-2 px-4 border-b font-bold">
                      Invoice No.
                    </th>
                    <th className="py-2 px-4 border-b font-bold">Remarks</th>
                    <th className="py-2 px-4 border-b font-bold">Status</th>
                    <th className="py-2 px-4 border-b font-bold">Amount</th>
                    <th className="py-2 px-4 border-b font-bold">Dr/Cr</th>
                    <th className="py-2 px-4 border-b font-bold">Balance</th>
                    <th className="py-2 px-4 border-b font-bold">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((txn, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b">{txn.date}</td>
                      <td className="py-2 px-4 border-b">{txn.hotel}</td>
                      <td className="py-2 px-4 border-b">{txn.action === "Dr"? txn.invoiceNo : ""}</td>
                      <td className="py-2 px-4 border-b">{txn.action === "Cr"? "Remarks" : ""}</td>
                      <td
                        className={`py-2 px-4 border-b ${
                          txn.status === "Approved"
                            ? "text-green-500"
                            : txn.status === "Pending"
                            ? "text-yellow-500"
                            : txn.status === "Rejected"
                            ? "text-red-500"
                            : "" // Default if no match
                        }`}
                      >
                        {txn.status}
                      </td>
                      <td className="py-2 px-4 border-b">
                        ₹{txn.amount.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b">{txn.action}</td>
                      <td
                        className={`py-2 px-4 border-b ${
                          txn.action === "Cr"
                            ? "text-green-500"
                            : txn.action === "Dr"
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        ₹{txn.balance.toFixed(2)}
                      </td>
                      <td
                        className="py-2 px-4 border-b"
                        onClick={txn.action === "Cr"? () => setSelectedTransaction(txn): null}
                      >
                        {txn.action === "Cr"? txn.edit : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Total Row */}
                <tfoot>
                  <tr className="font-bold">
                    <td className="py-2 px-4 border-t">Total</td>
                    <td className="py-2 px-4 border-t"></td>
                    <td className="py-2 px-4 border-t"></td>
                    <td className="py-2 px-4 border-t"></td>
                    <td className="py-2 px-4 border-t"></td>
                    <td className="py-2 px-4 border-t">
                      ₹{totalAmount.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-t"></td>
                    <td
                      className={`py-2 px-4 border-t ${
                        totalbalance >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      ₹{totalbalance.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProfileLedger;
