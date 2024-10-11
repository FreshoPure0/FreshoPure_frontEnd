export const GET_COMPILED_ORDER = "GET_COMPILED_ORDER";
export const HOTEL_ORDER_ANALYTICS = "HOTEL_ORDER_ANALYTICS";
export const GET_HOTEL_ITEM_ANALYTICS = "GET_HOTEL_ITEM_ANALYTICS";
export const TOTAL_SALES = "TOTAL_SALES";
// export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
// export const GET_ALL_HOTELS = "GET_ALL_HOTELS";
// export const GET_ALL_HOTEL_ITEMS = "GET_ALL_HOTEL_ITEMS";
// export const GET_ALL_HOTEL_ORDERS = "GET_ALL_HOTEL_ORDERS";
// export const GET_ALL_VENDOR_ORDERS = "GET_ALL_VENDOR_ORDERS";
// export const UPDATE_ITEM_PRICE = "UPDATE_ITEM_PRICE";
// export const ADD_STOCK = "ADD_STOCK";
// export const GET_STOCK = "GET_STOCK";
// export const UPDATE_STOCK = "UPDATE_STOCK";
// export const REMOVE_STOCK = "REMOVE_STOCK";
// export const ADD_HOTEL_ITEM = "ADD_HOTEL_ITEM";
// export const REMOVE_HOTEL_ITEM = "REMOVE_HOTEL_ITEM";
// export const GET_HOTEL_ASSIGNABLE_ITEMS = "GET_HOTEL_ASSIGNABLE_ITEMS";
// export const GET_VENDOR_CATEGORIES = "GET_VENDOR_CATEGORIES";
// export const ADD_STOCK_OPTIONS = "ADD_STOCK_OPTIONS";
// export const CLEAR_INFO = "CLEAR_INFO";

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

export const getAllCategories = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/getAllCategories`, {
        method: "get",
        headers: {
          token: await fetchToken(),
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while posting orders!!");
      }

      const data = await response.json();

      dispatch({
        type: GET_COMPILED_ORDER,
        payload: data.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const linkedHotels = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/hotelsLinkedWithVendor`, {
        method: "get",
        headers: {
          token: await fetchToken(),
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while posting orders!!");
      }

      const data = await response.json();

      dispatch({
        type: GET_ALL_HOTELS,
        payload: data.data,
      });
    } catch (err) {
      throw err;
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
        payload: data.itemList,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const hotelOrderAnalytics = (duration) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/hotel/hotelOrderAnalytics`, {
        method: "post",
        body: JSON.stringify({ duration }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "Something went wrong while fetching order Analytics!!"
        );
      }

      const data = await response.json();

      dispatch({
        type: HOTEL_ORDER_ANALYTICS,
        payload: data.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getHotelItemAnalytics = (duration) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/hotel/hotelItemAnalytics`, {
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
        type: GET_HOTEL_ITEM_ANALYTICS,
        payload: data.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getTotalSales = (data) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/hotel/totalSales`, {
        method: "get",
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
        payload: resData.sales,
      });
    } catch (err) {
      throw err;
    }
  };
};
