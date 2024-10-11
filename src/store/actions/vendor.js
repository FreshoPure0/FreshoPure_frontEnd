export const GET_COMPILED_ORDER = "GET_COMPILED_ORDER";
export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const GET_ALL_HOTELS = "GET_ALL_HOTELS";
export const GET_ALL_HOTEL_ITEMS = "GET_ALL_HOTEL_ITEMS";
export const GET_ALL_HOTEL_ORDERS = "GET_ALL_HOTEL_ORDERS";
export const GET_ALL_VENDOR_ORDERS = "GET_ALL_VENDOR_ORDERS";
export const UPDATE_ITEM_PROFIT = "UPDATE_ITEM_PROFIT";
export const ADD_STOCK = "ADD_STOCK";
export const GET_STOCK = "GET_STOCK";
export const UPDATE_STOCK = "UPDATE_STOCK";
export const REMOVE_STOCK = "REMOVE_STOCK";
export const ADD_HOTEL_ITEM = "ADD_HOTEL_ITEM";
export const REMOVE_HOTEL_ITEM = "REMOVE_HOTEL_ITEM";
export const GET_HOTEL_ASSIGNABLE_ITEMS = "GET_HOTEL_ASSIGNABLE_ITEMS";
export const GET_VENDOR_CATEGORIES = "GET_VENDOR_CATEGORIES";
export const ADD_STOCK_OPTIONS = "ADD_STOCK_OPTIONS";
export const CLEAR_INFO = "CLEAR_INFO";
export const VENDOR_ORDER_ANALYTICS = "VENDOR_ORDER_ANALYTICS";
export const GET_VENDOR_ITEMS = "GET_VENDOR_ITEMS";
export const GET_ITEMS_FOR_VENDOR = "GET_ITEMS_FOR_VENDOR";
export const ADD_VENDOR_ITEM = "ADD_VENDOR_ITEM";
export const SET_VENDOR_ITEM_PRICE = "SET_VENDOR_ITEM_PRICE";
export const REMOVE_VENDOR_ITEM = "REMOVE_VENDOR_ITEM";
export const GET_ITEM_ANALYTICS = "GET_ITEM_ANALYTICS";
export const ACTIVE_VENDOR_SUBSCRIPTION = "ACTIVE_VENDOR_SUBSCRIPTION";
export const SUBSCRIPTION_PLAN = "SUBSCRIPTION_PLAN";
export const ALL_ORDERS = "ALL_ORDERS";
export const CHANGE_QUANTITY = "CHANGE_QUANTITY";
export const CLEAR_ALL_VENDOR_ORDERS = "CLEAR_ALL_VENDOR_ORDERS";
export const TOTAL_SALES = "TOTAL_SALES";
export const EMPTY_VENDOR_ITEMS = "EMPTY_VENDOR_ITEMS";
export const ORDER_STATUS_TO_DELIVERED = "ORDER_STATUS_TO_DELIVERED";
export const CHANGE_HOTEL_ITEM_PRICE = "CHANGE_HOTEL_ITEM_PRICE";
export const UPDATE_VENDOR_STOCK = "UPDATE_VENDOR_STOCK";
export const HOTEL_TYPE_TOGGLE = "HOTEL_TYPE_TOGGLE"
export const GET_ALL_COMPILED_ORDERS_TABLE = "GET_ALL_COMPILED_ORDERS_TABLE";
export const UPDATE_TODAY_COST_PRICE_C_O_TABLE = "UPDATE_TODAY_COST_PRICE_C_O_TABLE";


import { baseUrl } from "../baseUrl";
import Cookies from 'js-cookie';

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

export const getcompiledordertable = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${baseUrl}/vendor/getcompiledordertable`,
        {
          method: "GET",
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
      console.log(orders,"action")
      
      dispatch({
        type: GET_ALL_COMPILED_ORDERS_TABLE, 
        payload: orders,
      });
    } catch (err) {
      console.error(err);
    }
  };
};



export const updateTodayCostPriceInCOTable = (updates) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/updateTodayCostPriceInCOTable`, {
        method: "post",
        body: JSON.stringify(updates),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while updating");
      }
      const data = await response.json();

      dispatch({
        type: UPDATE_TODAY_COST_PRICE_C_O_TABLE,
        payload: data.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const compiledOrders = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/todayCompiledOrder`, {
        method: "get",
        headers: {
          token: await fetchToken(),
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while posting orders!!");
      }

      const data = await response.json();

      console.log(data)

      dispatch({
        type: GET_COMPILED_ORDER,
        payload: data.data,
      });
    } catch (err) {

      console.log(err)
      throw err;
    }
  };
};

export const linkedHotels = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/hotelsLinkedWithVendor`, {
        method: "GET",  // Use uppercase for the method
        headers: {
          token: await fetchToken(),  // Make sure the token is valid
        },
      });

      console.log("Raw response:", response);

      // Check if response is not ok (e.g., 404, 500, etc.)
      if (!response.ok) {
        throw new Error(`Something went wrong: ${response.statusText} (status: ${response.status})`);
      }
      console.log("hit")
      // Safely parse the response as JSON
      const data = await response.json();
      
      // Log the data for debugging
      console.log("Response Data:", data);

      // Dispatch the data to your store
      dispatch({
        type: GET_ALL_HOTELS,
        payload: data.data,  // Make sure data is structured correctly
      });
    } catch (err) {
      // Handle and log the error
      console.error("Error fetching hotels:", err.message || err);
      // Optionally, you can dispatch an error action or show a notification
    }
  };
};


export const getHotelItemList = (HotelId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/gethotelitemlist`, {
        method: "post",
        body: JSON.stringify({ HotelId }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching items!!");
      }

      const data = await response.json();

      dispatch({
        type: GET_ALL_HOTEL_ITEMS,
        payload: data.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getHotelOrderList = ({ HotelId, date }) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${baseUrl}/vendor/getallordersbyhotel?date=${date}&HotelId=${HotelId}`,
        {
          method: "get",
          headers: {
            token: await fetchToken(),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching orders!!");
      }

      const data = await response.json();

      dispatch({
        type: GET_ALL_HOTEL_ORDERS,
        payload: data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const allOrdersForVendors = ({ offset, status, date }) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${baseUrl}/vendor/orderhistory?status=${status}&offset=${offset}&date=${date}`,
        {
          method: "get",
          headers: {
            token: await fetchToken(),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching orders!!");
      }

      const data = await response.json();

      dispatch({
        type: GET_ALL_VENDOR_ORDERS,
        payload: data.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const clearOrdersForVendors = () => {
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
        type: CLEAR_ALL_VENDOR_ORDERS,
        payload: [],
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const setHotelItemProfit = ({
  itemId,
  hotelId,
  newPercentage,
  newPrice,
}) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/updateItemProfit`, {
        method: "post",
        body: JSON.stringify({ itemId, hotelId, newPercentage, newPrice }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while updating price!!");
      }

      const data = await response.json();

      dispatch({
        type: UPDATE_ITEM_PROFIT,
        payload: data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addItemToStock = (itemId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/addStock`, {
        method: "post",
        body: JSON.stringify({ itemId }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while adding Stock!");
      }

      if (response.ok) {
        // Toast.show({
        //   type: "success",
        //   text1: "Stock added successfully",
        // });
      }

      const { data } = await response.json();

      dispatch({
        type: ADD_STOCK,
        payload: data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const updateStock = (itemId, quantity) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/updateStock`, {
        method: "post",
        body: JSON.stringify({ itemId, quantity }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while updating Stock!");
      }

      dispatch({
        type: UPDATE_STOCK,
        payload: data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getVendorStocks = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/getVendorStocks`, {
        method: "get",
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching Vendor Stocks!");
      }

      const { data } = await response.json();

      dispatch({
        type: GET_STOCK,
        payload: data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteItemStock = (itemId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/deleteItemStock`, {
        method: "post",
        body: JSON.stringify({ itemId }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while deleting Stocks!");
      }


      dispatch({
        type: REMOVE_STOCK,
        payload: itemId,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addHotelItem = (itemIds, hotelId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/addHotelItem`, {
        method: "post",
        body: JSON.stringify({ itemIds, hotelId }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while adding Hotel Item!");
      }

      if (response.ok) {
        // Toast.show({
        //   type: "success",
        //   text1: "Items added successfully!",
        // });
      }

      const data = await response.json();

      dispatch({
        type: GET_ALL_HOTEL_ITEMS,
        payload: data.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteHotelItem = (hotelId, itemId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/deleteHotelItem`, {
        method: "post",
        body: JSON.stringify({ itemId, hotelId }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while deleting Hotel Items!");
      }

      if (response.ok) {
        // Toast.show({
        //   type: "success",
        //   text1: "Item Removed Successfully",
        // });
      }

      const data = await response.json();

      dispatch({
        type: REMOVE_HOTEL_ITEM,
        payload: itemId,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getHotelAssignableItems = (hotelId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${baseUrl}/vendor/gethotelAssignableItems`,
        {
          method: "post",
          body: JSON.stringify({ hotelId }),
          headers: {
            token: await fetchToken(),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching items!!");
      }

      const data = await response.json();

      dispatch({
        type: GET_HOTEL_ASSIGNABLE_ITEMS,
        payload: data.assignItems,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getVendorCategories = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/getVendorCategories`, {
        method: "get",
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching categories!!");
      }

      const data = await response.json();

      dispatch({
        type: GET_VENDOR_CATEGORIES,
        payload: data.vendor,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addStockOptions = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/addStockOptions`, {
        method: "get",
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching items!!");
      }

      const data = await response.json();

      dispatch({
        type: ADD_STOCK_OPTIONS,
        payload: data.assignItems,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const vendorOrderAnalytics = (duration) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/orderAnalytics`, {
        method: "post",
        body: JSON.stringify({ duration }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching items!!");
      }

      const data = await response.json();

      dispatch({
        type: VENDOR_ORDER_ANALYTICS,
        payload: data.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getVendorItems = (offset) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${baseUrl}/vendor/getVendorItem?offset=${offset}`,
        {
          method: "get",
          headers: {
            token: await fetchToken(),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching vendor Items!!");
      }

      const data = await response.json();

      console.log(data)

      dispatch({
        type: GET_VENDOR_ITEMS,
        payload: data?.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const emptyVendorItems = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: EMPTY_VENDOR_ITEMS,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getItemsForVendor = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/itemsForVendor`, {
        method: "get",
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "Something went wrong while fetching Items for vendor!!"
        );
      }

      const data = await response.json();
      
      dispatch({
        type: GET_ITEMS_FOR_VENDOR,
        payload: data.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addVendorItem = (itemIds) => {

  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/addVendorItem`, {
        method: "post",
        body: JSON.stringify({ itemIds }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while adding Item!");
      }

      const data = await response.json();

      dispatch({
        type: ADD_VENDOR_ITEM,
        payload:data?.data
      });
    } catch (err) {
      throw err;
    }
  };
};

export const changeVendorItemPrice = (itemId, price) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/setVendorItemPrice`, {
        method: "post",
        body: JSON.stringify({ itemId, price }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while adding Item!");
      }

      const data = await response.json();

      dispatch({
        type: SET_VENDOR_ITEM_PRICE,
        payload: data.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const removeVendorItem = (itemId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/removeVendorItem`, {
        method: "post",
        body: JSON.stringify({ itemId }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while removing Item!");
      }

      const data = await response.json();

      dispatch({
        type: REMOVE_VENDOR_ITEM,
        payload: itemId,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getItemAnalytics = (duration) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/itemAnalytics`, {
        method: "post",
        body: JSON.stringify({ duration }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching item Analytics!!");
      }

      const data = await response.json();

      dispatch({
        type: GET_ITEM_ANALYTICS,
        payload: data.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const activeVendorSubscription = (duration) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/planSubscribed`, {
        method: "post",
        body: JSON.stringify({ duration }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while Activating Subscription!!");
      }

      const data = await response.json();

      dispatch({
        type: ACTIVE_VENDOR_SUBSCRIPTION,
        payload: data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const changeOrderQuantity = (data) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/changeOrderQuantity`, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while Updating Quantity!!");
      }

      const resData = await response.json();

      dispatch({
        type: CHANGE_QUANTITY,
        payload: resData.data,
        orderId: data.orderId,
        itemId: data.itemId,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getTotalSales = (data) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/totalSales`, {
        method: "post",
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while Updating Quantity!!");
      }

      const resData = await response.json();

      dispatch({
        type: TOTAL_SALES,
        payload: resData,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getAllPlans = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/getAllPlans`, {
        method: "get",
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching Subscription!!");
      }

      const data = await response.json();

      dispatch({
        type: SUBSCRIPTION_PLAN,
        payload: data.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const OrderStatusToDelivered = (data) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/StatusToDelivered`, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while updating Status!!");
      }

      if (response.status === 200) {
        console.log(response.status, "status");
        // Toast.show({
        //   type: "success",
        //   text1: "Status Updated!",
        // });
      }

      dispatch({
        type: ORDER_STATUS_TO_DELIVERED,
        payload: data?.orderNumber,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const UpdateFixedItemPrice = ({ hotelId, itemId, newPrice }) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/updatePrice`, {
        method: "post",
        body: JSON.stringify({ hotelId, itemId, newPrice }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while updating Status!!");
      }

      if (response.ok) {
        // Toast.show({
        //   type: "success",
        //   text1: "Price Updated!",
        // });
      }

      const data = await response.json();

      dispatch({
        type: CHANGE_HOTEL_ITEM_PRICE,
        payload: { hotelId, itemId, newPrice,todayPercentageProfit:(data?.newProfitPercentage).toFixed(2) },
      });
    } catch (err) {
      throw err;
    }
  };
};
export const changeHotelType = ({ hotelId, toggle }) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/changeHotelType`, {
        method: "post",
        body: JSON.stringify({ hotelId, toggle }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while updating Hotel Type!!");
      }

      if (response.ok) {
        // Toast.show({
        //   type: "success",
        //   text1: "Hotel Status Updated!",
        // });
      }

      const data = await response.json();


      dispatch({
        type: HOTEL_TYPE_TOGGLE,
        payload:{hotelId,toggle}
      });
    } catch (err) {
      throw err;
    }
  };
};
export const importItems = ({ hotelTo, hotelFrom }) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/importAssignedItems`, {
        method: "post",
        body: JSON.stringify({ hotelTo, hotelFrom }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while importing hotel items!!");
      }

      if (response.ok) {
        // Toast.show({
        //   type: "success",
        //   text1: "Items Imported successfully",
        // });
      }

      const data = await response.json();


    } catch (err) {
      throw err;
    }
  };
};
export const vendorItemSearch = (searchText) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${baseUrl}/vendor/searchQueryForVendoritems?searchText=${searchText}`,
        {
          method: "get",
          headers: {
            token: await fetchToken(),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching vendor Items!!");
      }

      const data = await response.json();

      dispatch({
        type: GET_VENDOR_ITEMS,
        payload: data?.data,
      });
    } catch (err) {
      throw err;
    }
  };
};


export const updateVendorStock = (price, quantity, historyId, itemId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${baseUrl}/vendor/updateVendorItemStock`,
        {
          method: "post",
          body: JSON.stringify({ price, quantity, historyId, itemId}),
          headers: {
            token: await fetchToken(),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong while adding stock!!");
      }

      if (response.ok) {
        // Toast.show({
        //   type: "success",
        //   text1: "Stock added successfully",
        // });
      }

      const data = await response.json();

      dispatch({
        type: UPDATE_VENDOR_STOCK,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const updateVendorWaste = (reason, quantity, wasteId, itemId) => {

  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${baseUrl}/vendor/updateVendorItemWaste`,
        {
          method: "post",
          body: JSON.stringify({reason, quantity, wasteId, itemId}),
          headers: {
            token: await fetchToken(),
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Toast.show({
        //   type: "success",
        //   text1: "Waste added successfully",
        // });
      }

      if (!response.ok) {
        throw new Error("Something went wrong while adding stock!!");
      }

      const data = await response.json();

      dispatch({
        type: UPDATE_VENDOR_STOCK,
      });
    } catch (err) {
      throw err;
    }
  };
};
