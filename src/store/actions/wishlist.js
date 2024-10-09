export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
export const FETCH_WISHLIST_ITEMS = "FETCH_WISHLIST_ITEMS";

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

export const fetchWishlistItems = () => {
  try {
    return async (dispatch, getState) => {
      const response = await fetch(`${baseUrl}/wishlist/getwishlistitems`, {
        method: "get",
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching product!!");
      }

      const resData = await response.json();

      dispatch({
        type: FETCH_WISHLIST_ITEMS,
        products: resData,
      });
    };
  } catch (err) {
    throw err;
  }
};

export const addToWishlist = (itemId) => {
  const wishlistItem = [
    {
      itemId: itemId,
    },
  ];

  try {
    return async (dispatch, getState) => {
      const response = await fetch(`${baseUrl}/wishlist/additemtowishlist`, {
        method: "post",
        body: JSON.stringify({ wishlistItem }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while adding item to wishlist!!");
      }

      const resData = await response.json();

      dispatch({
        type: ADD_TO_WISHLIST,
        products: resData,
      });
    };
  } catch (err) {
    throw err;
  }
};

export const removefromWishlist = (itemId) => {
  try {
    return async (dispatch, getState) => {
      const response = await fetch(
        `${baseUrl}/wishlist/removeitemfromwishlist`,
        {
          method: "post",
          body: JSON.stringify({ Itemid: itemId }),
          headers: {
            token: await fetchToken(),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong while removing from wishlist!!");
      }

      const resData = await response.json();

      dispatch({
        type: REMOVE_FROM_WISHLIST,
        products: resData,
      });
    };
  } catch (err) {
    throw err;
  }
};
