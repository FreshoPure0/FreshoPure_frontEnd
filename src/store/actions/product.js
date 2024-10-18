export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
import { baseUrl } from "../baseUrl";
import Cookies from "js-cookie";

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

export const fetchItems = (categoryId) => {
  try {
    return async (dispatch, getState) => {
      const response = await fetch(
        `${baseUrl}/hotel/getalltemsforhotelandvendor`,
        {
          method: "post",
          headers: {
            token: await fetchToken(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryId: categoryId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching items!!");
      }

      const resData = await response.json();

      dispatch({
        type: SET_PRODUCTS,
        products: resData.data,
      });
    };
  } catch (err) {
    throw err;
  }
};

export const getAllCategories = () => {
  try {
    return async (dispatch, getState) => {
      const response = await fetch(`${baseUrl}/hotel/getAllCategories`, {
        method: "get",
        headers: {
          token: await fetchToken(),
          "Cache-Control": "no-cache",
        },
      });

      const resData = await response.json();
      console.log("hit");

      if (!response.ok) {
        throw new Error("Something went wrong while fetching categories!!");
      }

      dispatch({
        type: GET_ALL_CATEGORIES,
        products: resData.categories,
      });
    };
  } catch (err) {
    throw err;
  }
};
