export const GET_ALL_SUBVENDORS = "GET_ALL_SUBVENDORS";
export const GET_ALL_SUBVENDOR_ITEMS = "GET_ALL_SUBVENDOR_ITEMS";
export const GET_SUBVENDOR_DETAILS = "GET_SUBVENDOR_DETAILS";
export const ADD_SUBVENDOR = "ADD_SUBVENDOR";
export const REMOVE_SUBVENDOR_ITEM = "REMOVE_SUBVENDOR_ITEM";
export const REMOVE_SUBVENDOR = "REMOVE_SUBVENDOR";
export const CLEAR_INFO = "CLEAR_INFO";
export const GET_ALL_ASSIGNABLE_ITEMS = "GET_ALL_ASSIGNABLE_ITEMS";
export const ADD_SUBVENDOR_ITEM = "ADD_SUBVENDOR_ITEM";

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

export const fetchSubVendors = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/vendor/getallsubvendors`, {
        method: "get",
        headers: {
          token: await fetchToken(),
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching SubVendors!!");
      }

      const data = await response.json();

      dispatch({
        type: GET_ALL_SUBVENDORS,
        payload: data?.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getSubVendorItems = (_id) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/subvendor/subVendorItem`, {
        method: "post",
        body: JSON.stringify({ _id }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching Items!!");
      }

      const data = await response.json();

      dispatch({
        type: GET_ALL_SUBVENDOR_ITEMS,
        payload: data.items,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addSubVendor = (fullName, phone) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/subvendor/add`, {
        method: "post",
        body: JSON.stringify({ fullName, phone }),
        headers: {
          token: await fetchToken(),
        },
      });

    //   if (!response.ok) {
    //     const res = await response.json();
    //     Toast.show({
    //       type: "error",
    //       text1: res.error,
    //     });
    //   }

      const data = await response.json();

      dispatch({
        type: ADD_SUBVENDOR,
        payload: data?.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const removeSubVendor = (vendorId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/subvendor/remove`, {
        method: "post",
        body: JSON.stringify({ vendorId }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while removing SubVendor!!");
      }

      const data = await response.json();

      dispatch({
        type: REMOVE_SUBVENDOR,
        payload: data.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const removeSubVendorItem = (_id, itemIds) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/subvendor/removeitem`, {
        method: "post",
        body: JSON.stringify({ _id, itemIds }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching SubVendors!!");
      }

      const data = await response.json();

      dispatch({
        type: REMOVE_SUBVENDOR_ITEM,
        payload: data.items,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getAssignableItems = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${baseUrl}/subvendor/getSubVendorAssignableItems`,
        {
          method: "get",
          headers: {
            token: await fetchToken(),
            "Content-Type": "application/json",
          },
        }
      );


      if (!response.ok) {
        throw new Error("Something went wrong while fetching Items!!");
      }

      const data = await response.json();


      dispatch({
        type: GET_ALL_ASSIGNABLE_ITEMS,
        payload: data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const AddSubVendorItem = (vendorId, itemIds) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${baseUrl}/subvendor/additem`, {
        method: "post",
        body: JSON.stringify({ vendorId, itemIds }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching SubVendors!!");
      }

      const data = await response.json();

      dispatch({
        type: ADD_SUBVENDOR_ITEM,
        payload: data.items,
      });
    } catch (err) {
      throw err;
    }
  };
};
