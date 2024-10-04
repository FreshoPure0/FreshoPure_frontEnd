import {
    ADD_SUBVENDOR,
    ADD_SUBVENDOR_ITEM,
    GET_ALL_ASSIGNABLE_ITEMS,
    GET_ALL_SUBVENDORS,
    GET_ALL_SUBVENDOR_ITEMS,
    REMOVE_SUBVENDOR,
    REMOVE_SUBVENDOR_ITEM,
  } from "../actions/subvendor";
  
  const initialState = {
    allSubVendors: [],
    subVendorItems: [],
    assignableItems: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_SUBVENDORS:
        return {
          ...state,
          allSubVendors: action.payload,
        };
      case GET_ALL_SUBVENDOR_ITEMS:
        return {
          ...state,
          subVendorItems: action.payload,
        };
      case ADD_SUBVENDOR:
        return {
          ...state,
          allSubVendors: action.payload,
        };
      case REMOVE_SUBVENDOR_ITEM:
        return {
          ...state,
          subVendorItems: action.payload,
        };
      case REMOVE_SUBVENDOR:
        return {
          ...state,
          allSubVendors: action.payload,
        };
      case GET_ALL_ASSIGNABLE_ITEMS:
        return {
          ...state,
          assignableItems: action.payload,
        };
      case ADD_SUBVENDOR_ITEM:
        return {
          ...state,
          subVendorItems: action.payload,
        };
    }
    return state;
  };
  