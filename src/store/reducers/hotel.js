import {
  GET_HOTEL_ITEM_ANALYTICS,
  HOTEL_ORDER_ANALYTICS,
  HOTEL_INVENTORY_DATA,
  TOTAL_SALES,
  UPDATED_HOTEL_INVENTORY_DATA,
  GET_ANALYTICS_CHART,
} from "../actions/hotel";

const initialState = {
  orderAnalytics: [],
  itemAnalytics: [],
  inventory: [],
  totalSales: 0,
  categoryTotals: [],
  weeklySalesData: [],
  sixMonthSalesData: [],
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
    case HOTEL_INVENTORY_DATA:
      return {
        ...state,
        inventory: action.payload,
      };
    case UPDATED_HOTEL_INVENTORY_DATA:
      return {
        ...state,
        inventory: action.payload,
      };
    case TOTAL_SALES:
      return {
        ...state,
        totalSales: action.payload,
      };
    case GET_ANALYTICS_CHART:
      return {
        ...state,
        ...action.payload, // Merges the new data into the state
      };
  }
  return state;
};
