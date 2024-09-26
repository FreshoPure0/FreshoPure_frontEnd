import {
    ADD_ORDER,
    // SET_ORDERS,
    SET_ORDER_DETAILS,
    CLEAR_INFO,
    ORDER_ANALYTICS,
    COMPILED_ORDER,
    GET_ORDER_DETAIL,
    GET_ORDERS,
    // CLEAR_CART,
    CANCEL_ORDER,
    CLEAR_ORDERS_SUCCESS,
    CLEAR_ORDERS,
    GET_ALL_COMPILED_ORDERS,
    COMPILED_ORDER_DETAIL,
    UPDATE_COMPILED_ORDER_QUANTITY,
  } from "../actions/order";
  // import { CHANGE_QUANTITY } from "../actions/vendor";
  
  const initialState = {
    orders: [],
    //   orderDetail: {},
    orderSuccess: false,
    barChartData: [],
    compiledData: [],
    orderDetails: {},
    compiledOrders:[],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case GET_ORDERS:
        return {
          ...state,
  
          orders: [...state.orders, ...action.orders],
        };
      case CANCEL_ORDER: {
        const order = action.payload;
  
        const index = state.orders.findIndex(
          (item) => item.orderNumber === order[0]?.orderNumber
        );
  
        if (index !== -1) {
          // Create a new array with the updated item
          const updatedItems = [
            ...state.orders.slice(0, index),
            order[0],
            ...state.orders.slice(index + 1),
          ];
  
          return {
            ...state,
            orders: updatedItems,
          };
        }
        return state; // If item not found, return state unchanged
      }
  
      case GET_ALL_COMPILED_ORDERS:
        return {
          ...state,
          compiledOrders: action.payload
        }
  
        
      case COMPILED_ORDER_DETAIL:
        return {
          ...state,
        compiledData:action.payload,
        }  
  
  
      case CLEAR_ORDERS:
        return {
          ...state,
          orders: [],
        };
  
      case SET_ORDER_DETAILS:
        return {
          ...state,
          orderDetail: action.orders,
        };
      case ADD_ORDER:
        return {
          ...state,
          orderSuccess: action.payload,
        };
      case CLEAR_INFO:
        return {
          ...state,
          orderSuccess: false,
        };
  
      case CLEAR_ORDERS_SUCCESS:
          return {
            ...state,
            orderSuccess: false,
          };
      
       
      case ORDER_ANALYTICS:
        return {
          ...state,
          barChartData: action.data,
        };
      case COMPILED_ORDER:
        return {
          ...state,
          compiledData: action.compiledData.data,
        };
      case GET_ORDER_DETAIL:
        return {
          ...state,
          orderDetails: action.compiledData,
        };
      // case CHANGE_QUANTITY: {
      //   // console.log(state.orderDetails, "reducer order");
  
      //   // Find the index of the ordered item in the orderedItems array
      //   const orderedItemIndex = state.orderDetails?.orderedItems.findIndex(
      //     (item) => item.itemId.toString() === action.itemId
      //   );
  
      //   // console.log(orderedItemIndex, "oii");
  
      //   if (orderedItemIndex === -1) {
      //     return res.json({ message: "Item not found in order!" });
      //   }
  
      //   if (orderedItemIndex !== -1) {
      //     // Create a new array with the updated item
      //     const updatedItems = [
      //       ...state.orderDetails.orderedItems.slice(0, orderedItemIndex),
      //       action.payload,
      //       ...state.orderDetails.orderedItems.slice(orderedItemIndex + 1),
      //     ];
  
      //     // console.log(updatedItems, "updated i");
      //     return {
      //       ...state,
      //       hotelOrders: updatedItems,
      //     };
      //   }
      //   return state;
      // }
    }
    return state;
  };
  