export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";

// import AsyncStorage from "@react-native-async-storage/async-storage";
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
  try {
    return async (dispatch, getState) => {
      const response = await fetch(`${baseUrl}/customer/getAllCategories`, {
        method: "get",
        headers: {
          token: await fetchToken(),
        },
      });

      const resData = await response.json();

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
