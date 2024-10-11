export const GET_ALL_ADDRESS = "GET_ALL_ADDRESS";
export const GET_SELECTED_ADDRESS = "GET_SELECTED_ADDRESS";
export const ADD_NEW_ADDRESS = "ADD_NEW_ADDRESS";
export const REMOVE_ADDRESS = "REMOVE_ADDRESS";
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

export const getAllAddress = (addressId) => {
  try {
    return async (dispatch, getState) => {
      const response = await fetch(`${baseUrl}/address/getalladdresses`, {
        method: "get",
        headers: {
          token: await fetchToken(),
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching addresses!!");
      }
      console.log("hit")
      const resData = await response.json();

      dispatch({
        type: GET_ALL_ADDRESS,
        payload: resData?.hotelAddresses,
      });
    };
  } catch (err) {
    throw err;
  }
};

export const addNewAddress = (
  addressLine1,
  addressLine2,
  state,
  city,
  pinCode
) => {
  try {
    return async (dispatch, getState) => {
      const response = await fetch(`${baseUrl}/address/addaddress`, {
        method: "post",
        body: JSON.stringify({
          addressLine1,
          addressLine2,
          state,
          city,
          pinCode,
        }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while adding address!!");
      }

      const resData = await response.json();

      dispatch({
        type: ADD_NEW_ADDRESS,
        payload: resData?.hotelAddresses,
      });
    };
  } catch (err) {
    throw err;
  }
};

export const updateSelectedAddress = (addressId) => {
  try {
    return async (dispatch, getState) => {
      const response = await fetch(`${baseUrl}/address/updateselectedaddress`, {
        method: "post",
        body: JSON.stringify({ addressId: addressId }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while updating addresses!!");
      }

      const resData = await response.json();

      dispatch({
        type: GET_ALL_ADDRESS,
        payload: resData?.hotelAddresses,
      });
    };
  } catch (err) {
    throw err;
  }
};

export const removeAddress = (addressId) => {
  try {
    return async (dispatch, getState) => {
      const response = await fetch(`${baseUrl}/address/removeaddress`, {
        method: "post",
        body: JSON.stringify({ addressId: addressId }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while deleting addresses!!");
      }

      const resData = await response.json();

      dispatch({
        type: REMOVE_ADDRESS,
        payload: resData?.hotelAddresses,
      });
    };
  } catch (err) {
    throw err;
  }
};
