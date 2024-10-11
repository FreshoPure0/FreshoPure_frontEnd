import {
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    SET_PRODUCTS,
    GET_ALL_CATEGORIES,
  } from "../actions/product";
  
  const initialState = {
    hotelItems: [],
    userProducts: [],
    allCategories: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_PRODUCTS:
        return {
          ...state,
          hotelItems: action.products,
        };
      case GET_ALL_CATEGORIES:
        return {
          ...state,
          allCategories: action.products,
        };
  
      default:
        return state;
    }
  };
  