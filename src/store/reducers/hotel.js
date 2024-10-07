import {
    GET_HOTEL_ITEM_ANALYTICS,
    HOTEL_ORDER_ANALYTICS,
    TOTAL_SALES,
  } from "../actions/hotel";
  
  const initialState = {
    orderAnalytics: [],
    itemAnalytics: [],
    totalSales: 0,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case HOTEL_ORDER_ANALYTICS:
        return {
          ...state,
          orderAnalytics: action.payload,
        };
      case GET_HOTEL_ITEM_ANALYTICS:
        return {
          ...state,
          itemAnalytics: action.payload,
        };
      case TOTAL_SALES:
        return {
          ...state,
          totalSales: action.payload,
        };
    }
    return state;
  };
  