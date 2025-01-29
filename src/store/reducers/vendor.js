import { act } from "react";
import {
  GET_COMPILED_ORDER,
  HOTEL_TYPE_TOGGLE,
  GET_ALL_HOTELS,
  GET_ALL_HOTEL_ITEMS,
  GET_ALL_HOTEL_ORDERS,
  GET_ALL_VENDOR_ORDERS,
  GET_ANALYTICS_CHART,
//   UPDATE_ITEM_PRICE,
  UPDATE_STOCK,
  ADD_STOCK,
  GET_STOCK,
  GET_HOTEL_ASSIGNABLE_ITEMS,
  GET_VENDOR_CATEGORIES,
  ADD_STOCK_OPTIONS,
  REMOVE_STOCK,
  VENDOR_ORDER_ANALYTICS,
  GET_VENDOR_ITEMS,
  GET_ITEMS_FOR_VENDOR,
  ADD_VENDOR_ITEM,
  SET_VENDOR_ITEM_PRICE,
  REMOVE_VENDOR_ITEM,
  UPDATE_ITEM_PROFIT,
  GET_ITEM_ANALYTICS,
  SUBSCRIPTION_PLAN,
  CLEAR_ALL_VENDOR_ORDERS,
  TOTAL_SALES,
  EMPTY_VENDOR_ITEMS,
  GET_LEDGER,
  OrderStatusToDelivered,
  ORDER_STATUS_TO_DELIVERED,
  CHANGE_HOTEL_ITEM_PRICE,
  REMOVE_HOTEL_ITEM,
  GET_ALL_COMPILED_ORDERS_TABLE,
  UPDATE_TODAY_COST_PRICE_C_O_TABLE,
  EDIT_TRANSACTION,
} from "../actions/vendor";

const initialState = {
  compiledOrder: [],
  linkedHotelsData: [],
  removedItem: [],
  removedVendor: [],
  hotelItems: [],
  hotelOrders: [],
  allOrders: [],
  vendorStocks: [],
  hotelAssignableItems: [],
  vendorCategories: {},
  stockOptions: [],
  orderAnalytics: [],
  allVendorItems: [],
  itemsForVendor: [],
  itemAnalytics: [],
  allPlans: [],
  compiledOrderTableData: [],
  updatedCompiledOrderTableData: [],
  totalSales: 0,
  weeklySalesData: [],
  sixMonthSalesData: [],
  ledger: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPILED_ORDER:
      return {
        ...state,
        compiledOrder: action.payload,
      };
    case GET_LEDGER:
      return {
        ...state,
        ledger: action.payload,
      };
      case EDIT_TRANSACTION: {
        // When editing a transaction, we'll map over the ledger to find the transaction by _id
        const updatedLedger = state.ledger.map((txn) =>
          txn._id === action.payload._id ? { ...txn, ...action.payload } : txn
        );
        return {
          ...state,
          ledger: updatedLedger,  // Update the ledger state with the edited transaction
        };
      }
    case GET_ALL_HOTELS:
      return {
        ...state,
        linkedHotelsData: action.payload,
      };

    case GET_ALL_HOTEL_ITEMS:
      return {
        ...state,
        hotelItems: action.payload,
      };
    case REMOVE_HOTEL_ITEM: {
      return {
        ...state,
        hotelItems: state.hotelItems.filter(
          (item) => item.itemId !== action.payload
        ),
      };
    }
    case HOTEL_TYPE_TOGGLE:{

      const index = state?.linkedHotelsData?.findIndex(hotel=>hotel.hotelId === action.payload.hotelId)

      if (index !== -1) {

        state.linkedHotelsData[index]['isPriceFixed'] = action.payload.toggle;
    }

      return {
        ...state,
        linkedHotelsData:state.linkedHotelsData
      }
    }

    case UPDATE_TODAY_COST_PRICE_C_O_TABLE:
      return {
        ...state,
        updatedCompiledOrderTableData: action.payload,
      };

      
      case GET_ALL_COMPILED_ORDERS_TABLE:
        return {
          ...state,
          compiledOrderTableData: action.payload
          
        };
    case CHANGE_HOTEL_ITEM_PRICE: {
      const index = state.hotelItems.findIndex(
        (item) => item.itemId === action.payload.itemId
      );

      if (index !== -1) {
        // Create a new array with the updated item

        let updated = state.hotelItems[index];
        updated.todayCostPrice = action.payload.newPrice;
        updated.todayPercentageProfit = action.payload.todayPercentageProfit;
        const updatedItems = [
          ...state.hotelItems.slice(0, index),
          updated,
          ...state.hotelItems.slice(index + 1),
        ];
        return {
          ...state,
          hotelItems: updatedItems,
        };
      }
      return state; // If item not found, return state unchanged
    }
    case GET_ALL_HOTEL_ORDERS:
      return {
        ...state,
        hotelOrders: action.payload,
      };
    case GET_ALL_VENDOR_ORDERS:
      return {
        ...state,
        allOrders: [...state.allOrders, ...action.payload],
      };
    case CLEAR_ALL_VENDOR_ORDERS:
      return {
        ...state,
        allOrders: [],
      };
    case UPDATE_ITEM_PROFIT:
      return {
        ...state,
        hotelItems: action.payload,
      };

    case ADD_STOCK:
      return {
        ...state,
        vendorStocks: [...state.vendorStocks, action.payload],
      };
    case UPDATE_STOCK: {
      // console.log(action.payload);
      const index = state.vendorStocks.findIndex(
        (item) => item.itemId === action.payload.itemId
      );

      if (index !== -1) {
        // Create a new array with the updated item
        const updatedItems = [
          ...state.vendorStocks.slice(0, index),
          action.payload,
          ...state.vendorStocks.slice(index + 1),
        ];
        return {
          ...state,
          vendorStocks: updatedItems,
        };
      }
      return state; // If item not found, return state unchanged
    }
    case GET_STOCK:
      return {
        ...state,
        vendorStocks: action.payload,
      };
    case REMOVE_STOCK: {
      // console.log(state.vendorStocks.data[0].itemId, action.payload, "rducer");
      return {
        ...state,
        vendorStocks: state.vendorStocks.filter(
          (item) => item.itemId !== action.payload
        ),
      };
    }
    case GET_HOTEL_ASSIGNABLE_ITEMS:
      return {
        ...state,
        hotelAssignableItems: action.payload,
      };
    case GET_VENDOR_CATEGORIES:
      return {
        ...state,
        vendorCategories: action.payload,
      };
    case ADD_STOCK_OPTIONS:
      return {
        ...state,
        stockOptions: action.payload,
      };
    case VENDOR_ORDER_ANALYTICS:
      return {
        ...state,
        orderAnalytics: action.payload,
      };
    case GET_VENDOR_ITEMS:
      const newItems = action.payload;

      console.log(newItems,'newItems',newItems)

      // Create a set of existing item IDs
      const existingItemIds = new Set(
        state.allVendorItems.map((item) => item.itemId)
      );

      // Filter new items to include only those not already in allVendorItems
      const filteredNewItems = newItems.filter(
        (item) => !existingItemIds.has(item.itemId)
      );

      return {
        ...state,
        allVendorItems: [...state.allVendorItems, ...filteredNewItems],
      };
    case EMPTY_VENDOR_ITEMS:
      return {
        ...state,
        allVendorItems: [],
      };

    case GET_ITEMS_FOR_VENDOR:
      return {
        ...state,
        itemsForVendor: action.payload,
      };
    case ADD_VENDOR_ITEM:
      return {
        ...state,
        allVendorItems: [...state.allVendorItems, ...action.payload],
      };
    case SET_VENDOR_ITEM_PRICE: {
      // console.log(action.payload);
      const index = state.allVendorItems.findIndex(
        (item) => item.itemId === action.payload.itemId
      );

      if (index !== -1) {
        // Create a new array with the updated item
        const updatedItems = [
          ...state.allVendorItems.slice(0, index),
          action.payload,
          ...state.allVendorItems.slice(index + 1),
        ];
        return {
          ...state,
          allVendorItems: updatedItems,
        };
      }
      return state; // If item not found, return state unchanged
    }

    case REMOVE_VENDOR_ITEM:
      return {
        ...state,
        allVendorItems: state.allVendorItems.filter(
          (item) => item.itemId !== action.payload
        ),
      };
    case GET_ITEM_ANALYTICS:
      return {
        ...state,
        itemAnalytics: action.payload,
      };
      case GET_ANALYTICS_CHART:
        return {
          ...state,
          ...action.payload,
        };
    case SUBSCRIPTION_PLAN:
      return {
        ...state,
        allPlans: action.payload,
      };

    case TOTAL_SALES:
      return {
        ...state,
        totalSales: action.payload,
      };
    case ORDER_STATUS_TO_DELIVERED:
      const key = state.allOrders.findIndex(
        (item) => item.orderNumber === action.payload
      );

      if (index !== -1) {
        const updatedOrders = state.allOrders;

        updatedOrders[key].orderStatusDetails.status = "Delivered";
      }

      return {
        ...state,
        allOrders: updatedOrders,
      };
  }
  return state;
};
