export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../baseUrl";

const fetchToken = async () => {
  const userData = await AsyncStorage.getItem("userData");
  const activeId = await AsyncStorage.getItem("activeUserId");
  const parsedData = JSON.parse(userData);

  const user = parsedData?.filter((user) => user.id === activeId);

  return user[0]?.token;
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
