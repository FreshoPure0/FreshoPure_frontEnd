export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const FETCH_CART_ITEMS = "FETCH_CART_ITEMS";
export const CLEAR_CART = 'CLEAR_CART';

import { baseUrl } from "../baseUrl";

const fetchToken = async () => {
  const userData = await AsyncStorage.getItem("userData");
  const activeId = await AsyncStorage.getItem("activeUserId");
  const parsedData = JSON.parse(userData);

  const user = parsedData?.filter((user) => user.id === activeId);

  return user[0]?.token;
};

export const fetchCartItems = () => {
  try {
    return async (dispatch, getState) => {
      const response = await fetch(`${baseUrl}/cart/getcartitems`, {
        method: "get",
        headers: {
          token: await fetchToken(),
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching items!!");
      }

      const resData = await response.json();

      dispatch({
        type: FETCH_CART_ITEMS,
        products: resData,
      });
    };
  } catch (err) {
    throw err;
  }
};

export const addItemToCart = ({ itemId, quantity, vendorId, unit }) => {
  const orderedItem = [
    {
      itemId: itemId,
      quantity: quantity,
      vendorId: vendorId,
      unit: unit,
    },
  ];

  try {
    return async (dispatch, getState) => {
      const response = await fetch(`${baseUrl}/cart/additemtocart`, {
        method: "post",
        body: JSON.stringify({ orderedItem }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while adding product!!");
      }

      const resData = await response.json();

      dispatch({
        type: ADD_TO_CART,
        products: resData,
      });
    };
  } catch (err) {
    throw err;
  }
};

export const clearCart = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CART, 
    });
  };
};

export const removeFromCart = (itemId) => {
  try {
    return async (dispatch, getState) => {
      const response = await fetch(`${baseUrl}/cart/removeitemfromcart`, {
        method: "post",
        body: JSON.stringify({ itemId: itemId }),
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while deleting product!!");
      }

      const resData = await response.json();

      dispatch({
        type: REMOVE_FROM_CART,
        products: resData,
      });
    };
  } catch (err) {
    throw err;
  }
};
