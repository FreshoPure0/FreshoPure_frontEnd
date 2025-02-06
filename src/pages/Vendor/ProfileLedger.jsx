import React, { useEffect, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { getLedger, updateTransaction, createTransaction } from "../../store/actions/vendor";
import Modal from "react-modal";
import { BiFilterAlt } from "react-icons/bi";
import { GoPencil } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";

function ProfileLedger() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(""); // separate state for start date
  const [endDate, setEndDate] = useState(""); // separate state for end date
  const dispatch = useDispatch();
  const { ledger, linkedHotels, expense } = useSelector((state) => state.vendor); // This fetches the ledger from the Redux store
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [addTransaction, setaddTransaction] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 20)), // current date - 7 days
    endDate: new Date(), // current date
  });


  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().split("T")[0], // Default to today's date
    hotelId: "",
    expenseId: "",
    remarks: "",
    transactionType: "Cr",
    status: "Pending",
    amount: 0,
  });

  const handleAddTransaction = () => {
    let transactionData = { ...newTransaction };

  // Remove hotelId if it's an empty string
  if (!transactionData.hotelId) {
    delete transactionData.hotelId;
  }

  // Remove expenseId if it's an empty string
  if (!transactionData.expenseId) {
    delete transactionData.expenseId;
  }
    // Dispatch the createTransaction action with the new transaction data
    dispatch(createTransaction(transactionData));
    setaddTransaction(false); // Close the modal
    setNewTransaction({
      date: new Date().toISOString().split("T")[0],
      hotelId: "",
      expenseId: "",
      remarks: "",
      transactionType: "Cr",
      status: "Pending",
      amount: 0,
    }); // Reset the form
  };

  const handleHotelChange = (e) => {
    setNewTransaction({
      ...newTransaction,
      hotelId: e.target.value,
      expenseId: '', // Reset the other dropdown
    });
  };

  const handleExpenseChange = (e) => {
    setNewTransaction({
      ...newTransaction,
      expenseId: e.target.value,
      hotelId: '', // Reset the other dropdown
    });
  };

  const handleSaveClick = () => {
    if (selectedTransaction && selectedTransaction._id) {
      // Dispatch the update transaction action
      dispatch(updateTransaction(selectedTransaction));
      closeModal();
    } else {
      console.log("No transaction selected"); // Log if no transaction is selected
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setSelectedTransaction(null); // Reset selected transaction when closing modal
    setaddTransaction(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getLedgerData = async () => {
      await dispatch(
        getLedger({
          startDate: date.startDate,
          endDate: date.endDate,
        })
      );
    };
    getLedgerData();
  }, [dispatch]);

  const filteredLedgerData = async () => {
    if (startDate && endDate) {
      const formattedStartDate = new Date(startDate)
        .toISOString()
        .split("T")[0]; // "YYYY-MM-DD"
      const formattedEndDate = new Date(endDate).toISOString().split("T")[0]; // "YYYY-MM-DD"

      await dispatch(
        getLedger({
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        })
      );
    }
  };

  const applyFilter = () => {
    // When the "Apply Filter" button is clicked, we dispatch the filtered ledger data
    filteredLedgerData();
    closeModal(); // Close the modal after applying the filter
  };
  const formatDate = (dateStr) => {
    return new Date(dateStr).toISOString().split("T")[0]; // "2025-01-21"
  };
  const sortedLedger = ledger.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const openingBalance =
    sortedLedger.length > 0 ? sortedLedger[0].openingBalance : 0;
  let runningBalance = openingBalance;

  const updatedLedger = sortedLedger.map((txn) => {
    const balance =
      txn.transactionType === "Cr"
        ? (runningBalance += txn.amount)
        : (runningBalance -= txn.amount);

    return {
      ...txn,
      balance, // Add the balance to the transaction object
    };
  });

  const calculateBalance = (index) => {
    let balance = openingBalance;
    for (let i = 0; i <= index; i++) {
      const txn = sortedLedger[i];
      balance =
        txn.transactionType === "Cr"
          ? balance + txn.amount
          : balance - txn.amount;
    }
    return balance;
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
                  <th className="py-2 px-4 border-b font-bold">Expenses</th>
                  <th className="py-2 px-4 border-b font-bold">Remarks</th>
                  <th className="py-2 px-4 border-b font-bold">Status</th>
                  <th className="py-2 px-4 border-b font-bold">Amount</th>
                  <th className="py-2 px-4 border-b font-bold">Dr/Cr</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                    <input
                      className="w-[10vw] rounded-md p-1"
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) =>
                        setNewTransaction({ ...newTransaction, date: e.target.value })
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                  <select
                      className="w-[10vw] rounded-md p-1 hide-scrollbar"
                      value={newTransaction.hotelId}
                      onChange={handleHotelChange}
                      disabled={!!newTransaction.expenseId} // Disable if expenseId is selected
                    >
                      <option value="">Select a hotel</option>
                      {linkedHotels.map((hotel) => (
                        <option key={hotel._id} value={hotel.userId}>
                          {hotel.fullName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b">
                  <select
                      className="w-[10vw] rounded-md p-1 pr-8 hide-scrollbar"
                      value={newTransaction.expenseId}
                      onChange={handleExpenseChange}
                      disabled={!!newTransaction.hotelId} // Disable if hotelId is selected
                    >
                      <option value="">Select an option</option>
                      {expense.map((exp) => (
                        <option key={exp._id} value={exp._id}>
                          {exp.expenses}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      className="w-[7vw] rounded-md p-1"
                      type="text"
                      placeholder="Remark"
                      value={newTransaction.remarks}
                      onChange={(e) =>
                        setNewTransaction({ ...newTransaction, remarks: e.target.value })
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">Pending</td>
                  <td className="py-2 px-4 border-b">
                    ₹{" "}
                    <input
                      type="number"
                      className="w-[7vw] rounded-md p-1"
                      placeholder="Amount"
                      value={newTransaction.amount}
                      onChange={(e) =>
                        setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                  <select
                      className="w-[5vw] rounded-md p-1"
                      value={newTransaction.transactionType}
                      onChange={(e) =>
                        setNewTransaction({ ...newTransaction, transactionType: e.target.value })
                      }
                    >
                      <option value="Cr">Cr</option>
                      <option value="Dr">Dr</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex gap-3 mt-2">
            <button
            onClick={handleAddTransaction}
             className="bg-[#EFE5D8] text-yellow-900 rounded-md px-4 py-1 shadow flex items-center gap-2">
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
                    {formatDate(selectedTransaction.date)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {selectedTransaction.hotelFullName}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      className="w-[7vw] rounded-md p-1"
                      placeholder="Enter a remark"
                      value={selectedTransaction.remarks || ""}
                      onChange={(e) => {
                        setSelectedTransaction({
                          ...selectedTransaction,
                          remarks: e.target.value,
                        });
                      }}
                    />
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
                    <select
                      className="w-[7vw] rounded-md p-1 pr-6"
                      value={selectedTransaction.status}
                      onChange={(e) => {
                        setSelectedTransaction({
                          ...selectedTransaction,
                          status: e.target.value,
                        });
                      }}
                    >
                      <option className="text-black" value="Approved">
                        Approved
                      </option>
                      <option className="text-black" value="Pending">
                        Pending
                      </option>
                      <option className="text-black" value="Rejected">
                        Rejected
                      </option>
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b">
                    ₹{" "}
                    <input
                      className="w-[7vw] rounded-md p-1"
                      type="number"
                      value={selectedTransaction.amount.toFixed(2) || 0}
                      onChange={(e) => {
                        setSelectedTransaction({
                          ...selectedTransaction,
                          amount: parseFloat(e.target.value),
                        });
                      }}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    {selectedTransaction.transactionType}
                  </td>
                  <td
                    className={`py-2 px-4 border-b ${
                      selectedTransaction.transactionType === "Cr"
                        ? "text-green-500"
                        : selectedTransaction.transactionType === "Dr"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    ₹
                    {selectedTransaction.amount !== undefined
                      ? selectedTransaction.amount.toFixed(2)
                      : "0.00"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleSaveClick}
              className="bg-[#EFE5D8] text-yellow-900 rounded-md px-4 py-1 shadow flex items-center gap-2"
            >
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

      {/* Main Ledger Section */}
      <section className="mt-10 flex flex-col w-full lg:w-full md:w-4/5 h-[90vh] md:px-8 overflow-y-auto hide-scrollbar">
        {(addTransaction || selectedTransaction) && (
          <div
            onClick={closeModal}
            className="h-full w-full absolute top-0 left-0 z-40 bg-black opacity-40"
          ></div>
        )}
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

        {/* Filter Modal */}
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
            <label htmlFor="startDate" className="mb-2">
              Select From Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mb-4 placeholder-gray-400"
            />
            <label htmlFor="endDate" className="mb-2">
              To Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mb-4 placeholder-gray-400"
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
          {/* Summary Section */}
          <div className="grid grid-cols-2 h-[10vh] w-full justify-items-center items-center text-center mt-2">
            <div className="bg-white rounded-lg shadow w-[80%] p-2 flex flex-col items-center">
              <h2 className="font-semibold text-lg text-gray-800">
                Opening Balance
              </h2>
              <p className="text-lg text-gray-600">
                ₹{openingBalance.toFixed(2)}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow w-[80%] p-2 flex flex-col items-center">
              <h2 className="font-semibold text-lg text-gray-800">
                Closing Balance
              </h2>
              <p className="text-lg text-gray-600">
                ₹{calculateBalance(sortedLedger.length - 1).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Transaction Table */}
          <div className="mt-3 p-4 w-full h-[59vh] rounded-lg flex items-center justify-center overflow-y-auto hide-scrollbar">
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
                  {/* Render real data from ledger */}
                  {updatedLedger.map((txn, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b w-24 max-w-25 hide-scrollbar overflow-auto whitespace-nowrap">
                        {formatDate(txn.date)}
                      </td>
                      <td className="py-2 px-4 border-b w-24 max-w-25 hide-scrollbar overflow-auto whitespace-nowrap">
                        {txn.hotelFullName}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {Array.isArray(txn.invoiceNumber)
                          ? txn.invoiceNumber.join(", ")
                          : txn.invoiceNumber}
                      </td>
                      <td className="py-2 px-4 border-b w-40 max-w-40 hide-scrollbar overflow-x-scroll whitespace-nowrap">
                        {txn.remarks}
                      </td>
                      <td
                        className={`py-2 px-4 max-w-25 min-w-25 border-b ${
                          txn.status === "Approved"
                            ? "text-green-500"
                            : txn.status === "Pending"
                            ? "text-yellow-500"
                            : txn.status === "Rejected"
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        {txn.status}
                      </td>
                      <td className="py-2 px-4 border-b w-24 max-w-25 hide-scrollbar overflow-auto whitespace-nowrap">
                        ₹{txn.amount.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b w-24 max-w-25 hide-scrollbar overflow-auto whitespace-nowrap">
                        {txn.transactionType}
                      </td>
                      <td
                        className={`py-2 px-4 border-b w-25 max-w-25 hide-scrollbar overflow-auto whitespace-nowrap ${
                          txn.balance > 0
                            ? "text-green-500"
                            : txn.balance < 0
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        ₹{txn.balance.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b cursor-pointer">
                        <GoPencil
                          onClick={() => {
                            setSelectedTransaction(txn);
                          }}
                        />
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
                      ₹
                      {updatedLedger
                        .reduce((total, txn) => total + txn.amount, 0)
                        .toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-t"></td>
                    <td
                      className={`py-2 px-2 ${
                        calculateBalance(sortedLedger.length - 1).toFixed(2) > 0
                          ? "text-green-500"
                          : calculateBalance(sortedLedger.length - 1).toFixed(
                              2
                            ) < 0
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      ₹{calculateBalance(sortedLedger.length - 1).toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-t"></td>
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
