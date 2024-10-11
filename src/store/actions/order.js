export const ADD_ORDER = "ADD_ORDER";
export const GET_ORDERS = "GET_ORDERS";
export const SET_ORDER_DETAILS = "SET_ORDER_DETAILS";
export const ORDER_ANALYTICS = "ORDER_ANALYTICS";
export const COMPILED_ORDER = "COMPILED_ORDER";
export const GET_ORDER_DETAIL = "GET_ORDER_DETAIL";
export const CLEAR_INFO = "CLEAR_INFO";
export const CLEAR_ORDERS_SUCCESS = "CLEAR_ORDERS_SUCCESS";
export const GENERATE_INVOICE = "GENERATE_INVOICE";
export const CANCEL_ORDER = "CANCEL_ORDER";
export const STATUS_CHANGE = "STATUS_CHANGE";
export const CLEAR_ORDERS = "CLEAR_ORDERS";
export const GET_ALL_COMPILED_ORDERS = "GET_ALL_COMPILED_ORDERS";
export const COMPILED_ORDER_DETAIL = "COMPILED_ORDER_DETAIL";
export const COMPILED_ORDER_DETAIL_PDF = "COMPILED_ORDER_DETAIL_PDF";
export const UPDATE_COMPILED_ORDER_QUANTITY = "UPDATE_COMPILED_ORDER_QUANTITY";
// import Toast from "react-native-toast-message";
// import axios from "axios";
import { baseUrl } from "../baseUrl";
import Cookies from "js-cookie";

// import RNFS from "react-native-fs"; // Import react-native-fs library

const fetchToken = () => {
  // Get the cookies using js-cookie
  const userDataCookie = Cookies.get("userData");
  const activeUserIdCookie = Cookies.get("activeUserId");

  // If userData or activeUserId doesn't exist, return null
  if (!userDataCookie || !activeUserIdCookie) {
    return null;
  }

  // Parse the JSON data
  const parsedData = JSON.parse(userDataCookie);

  // Find the user with the active ID
  const user = parsedData?.filter((user) => user.id === activeUserIdCookie);

  // Return the token if found
  return user[0]?.token;
  // console.log(user[0]?.token)
};

export const fetchOrders = ({ offset, status, date }) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${baseUrl}/order/orderhistory?status=${status}&offset=${offset}&date=${date}`,
        {
          method: "GET", // Use GET method since parameters are in the URL
          headers: {
            token: await fetchToken(),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching orders!!");
      }

      const orders = await response.json();

      dispatch({
        type: GET_ORDERS,
        orders: orders.data,
        incomingStatus: orders.status,
        selectedStatus: status,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const updateCompiledItemQuantity = (itemId, quantity) => {
  return async (dispatch, getState) => {
    let response = await fetch(`${baseUrl}/vendor/updateCompiledItemQuantity`, {
      method: "post",
      body: JSON.stringify({ itemId, quantity }),
      headers: {
        token: await fetchToken(),
        "Content-Type": "application/json",
      },
    });

    // if (!response.ok) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Something went wrong!",
    //   });
    // }

    // if (response.ok) {
    //   Toast.show({
    //     type: "success",
    //     text1: "Quantity Updated successfully",
    //   });
    // }

    const resData = await response.json();
    console.log("hit");

    dispatch({
      type: UPDATE_COMPILED_ORDER_QUANTITY,
      payload: resData.data,
    });
  };
};

export const clearHotelOrders = () => {
  return async (dispatch, getState) => {
    try {
      // const response = await fetch(`${baseUrl}/vendor/orderhistory`, {
      //   method: "post",

      //   headers: {
      //     token: await fetchToken(),
      //     "Content-Type": "application/json",
      //   },
      // });

      // if (!response.ok) {
      //   throw new Error("Something went wrong while fetching orders!!");
      // }

      // const data = await response.json();

      dispatch({
        type: CLEAR_ORDERS,
        payload: [],
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const orderHistoryItems = (order_id) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/order/orderhistoryitems`, {
        method: "post",
        body: JSON.stringify({ order_id }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while posting orders!!");
      }

      const orders = await response.json();

      dispatch({
        type: SET_ORDER_DETAILS,
        orders: orders,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const clearInfo = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_INFO,
    });
  };
};

export const clearOrderSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_ORDERS_SUCCESS,
    });
  };
};

// export const getAllCompiledOrders = () => {
//   return (dispatch) => {

//     dispatch({
//       type: GET_ALL_COMPILED_ORDERS,
//     });
//   };
// };
export const getAllCompiledOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/order/getAllCompiledOrders`, {
        method: "GET", // Use GET method since parameters are in the URL
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      console.log(await response);

      if (!response.ok) {
        throw new Error("Something went wrong while fetching orders!!");
      }

      const orders = await response.json();
      console.log(orders);

      dispatch({
        type: GET_ALL_COMPILED_ORDERS,
        payload: orders.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const placeorder = (notes) => {
  return async (dispatch, getState) => {
    let response = await fetch(`${baseUrl}/order/placeorder`, {
      method: "post",
      body: JSON.stringify({ notes }),
      headers: {
        token: await fetchToken(),
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();

    // const userData = await AsyncStorage.getItem("userData");
    // const parsedData = JSON.parse(userData);

    const userData = Cookies.get("userData");
    let parsedData = userData ? JSON.parse(userData) : null;

    if (resData.success) {
      const vendordata = {
        id: resData?.newOrder?.vendorId,
        title: "New Order Recieved!",
        message: `New Order has been placed by ${parsedData?.user?.organization}`,
      };
      const hotelData = {
        id: resData?.newOrder?.hotelId,
        title: "Order Placed!",
        message: `Hey ${parsedData?.user?.fullName}!, Your order has been placed. You will be notified once the order is in process.`,
      };
      // sendNotification(vendordata);
      // sendNotification(hotelData);
    }

    if (!response.ok) {
      throw new Error("Something went wrong while placing orders!!");
    }

    dispatch({
      type: ADD_ORDER,
      payload: true,
    });
  };
};

// export const sendNotification = async (data) => {
//   const { id, title, message } = data;

//   await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
//     subID: id,
//     appId: 21751,
//     appToken: "ZkTW5huO0kRCf7UXI6DmJL",
//     title: title,
//     message: message,
//   });
// };

export const orderPriceAnalytics = (duration) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/order/orderpriceanalytics`, {
        method: "post",
        body: JSON.stringify({ duration }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while posting orders!!");
      }

      const resData = await response.json();

      dispatch({
        type: ORDER_ANALYTICS,
        data: resData,
      });
    } catch (err) {
      console.log(err, "error");
      throw err;
    }
  };
};

export const compiledOrders = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/order/compiledorderforhotel`, {
        method: "get",
        headers: {
          token: await fetchToken(),
        },
      });
      r;

      if (!response.ok) {
        throw new Error("Something went wrong while posting orders!!");
      }

      const data = await response.json();

      dispatch({
        type: COMPILED_ORDER,
        compiledData: data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getOrderDetails = (orderId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/order/orderDetails`, {
        method: "post",
        body: JSON.stringify(orderId),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching order Detail!!");
      }

      const data = await response.json();

      dispatch({
        type: GET_ORDER_DETAIL,
        compiledData: data?.data[0],
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

// export const generateInvoice = (orderId) => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch(`${baseUrl}/vendor/generatePdf`, {
//         method: "POST",
//         body: JSON.stringify({ orderId }),
//         headers: {
//           token: await fetchToken(),
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Something went wrong while fetching the invoice!!");
//       }

//       // Get the PDF blob from the response
//       const pdfBlob = await response.blob();

//       // Create a URL for the PDF blob
//       const url = window.URL.createObjectURL(pdfBlob);

//       // Create a temporary <a> element to trigger the download
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "invoice.pdf");

//       // Simulate a click event to trigger the download
//       link.click();

//       // Cleanup: Remove the temporary <a> element and URL object
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error generating invoice:", error);
//       throw error;
//     }
//   };
// };

export const compiledOrderHotelDetails = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${baseUrl}/vendor/compiledorderhoteldetails`,
        {
          method: "get",
          headers: {
            token: await fetchToken(),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching compiled Order!!");
      }

      const resData = await response.json();

      dispatch({
        type: COMPILED_ORDER_DETAIL,
        payload: resData,
      });
    } catch (error) {
      console.error("Error :", error);
      throw error;
    }
  };
};

// export const compiledOrderHotelDetailsPdf =() => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch(`${baseUrl}/vendor/compiledorderhoteldetailspdf`, {
//         method: "get",
//         headers: {
//           token: await fetchToken(),
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Something went wrong while fetching the invoice!!");
//       }

//       // Get the PDF blob from the response
//       const pdfBlob = await response.blob();

//       // Create a URL for the PDF blob
//       const url = window.URL.createObjectURL(pdfBlob);

//       // Create a temporary <a> element to trigger the download
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "hotel_details.pdf");

//       // Simulate a click event to trigger the download
//       link.click();

//       // Cleanup: Remove the temporary <a> element and URL object
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error generating pdf:", error);
//       throw error;
//     }
//   };
// };

// export const cancelOrder = ({ orderNumber }) => {
//   return async (dispatch, getState) => {
//     let response = await fetch(`${baseUrl}/order/cancelOrder`, {
//       method: "post",
//       body: JSON.stringify({ orderNumber }),
//       headers: {
//         token: await fetchToken(),
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       Toast.show({
//         type: "success",
//         text1: "Order Cancelled!",
//       });
//     }
//     if (response.status === 400) {
//       Toast.show({
//         type: "error",
//         text1: "Cannot cancel order! Order is already in process.",
//       });
//     }
//     if (!response.ok) {
//       throw new Error("Something went wrong while canceling order!");
//     }

//     const resData = await response.json();

//     dispatch({
//       type: CANCEL_ORDER,
//       payload: resData.data,
//     });
//   };
// };
