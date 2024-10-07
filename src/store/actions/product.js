export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
import { baseUrl } from "../baseUrl";

// const fetchToken = async () => {
//   const userData = await localStorage.getItem("userData");
//   const activeId = await localStorage.getItem("activeUserId");
//   const parsedData = JSON.parse(userData);

//   const user = parsedData?.filter((user) => user.id === activeId);
//   return user[0]?.token;
// };

export const fetchItems = (categoryId) => {
  try {
    return async (dispatch, getState) => {
      const response = await fetch(`${baseUrl}/hotel/getalltemsforhotel`, {
        method: "post",
        headers: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmM1ZWVlYjJlNjNhMWM0YThlZjg1OCIsImlhdCI6MTcyNzA5MDg3OSwiZXhwIjoxNzI5NjgyODc5fQ.lKCzPGpicR6QnZUfmbyCMXjyFdrxjDLXqYV0E3c7gYo",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId: categoryId,
        }),
      });

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
          // token: await fetchToken(),
          "Cache-Control": "no-cache",
        },
      });

      const resData = await response.json();
      console.log("hit")

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
