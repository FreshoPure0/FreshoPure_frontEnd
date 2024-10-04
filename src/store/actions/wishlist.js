export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
export const FETCH_WISHLIST_ITEMS = "FETCH_WISHLIST_ITEMS";

import { baseUrl } from "../baseUrl";

const fetchToken = async () => {
  // const userData = await AsyncStorage.getItem("userData");
  // const activeId = await AsyncStorage.getItem("activeUserId");
  // const parsedData = JSON.parse(userData);

  const user ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmM1ZWVlYjJlNjNhMWM0YThlZjg1OCIsImlhdCI6MTcyNzk0OTExMSwiZXhwIjoxNzMwNTQxMTExfQ.FLtpx8L_3ptCqDCR-8SLB2JH14RbrB_xrt7bNR2Y6ds";

  return user;
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
