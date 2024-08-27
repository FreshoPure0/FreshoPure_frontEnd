import { ADD_TO_CART, REMOVE_FROM_CART,FETCH_CART_ITEMS ,CLEAR_CART} from "../actions/cart";
import {ADD_ORDER} from '../actions/order';
import { DELETE_PRODUCT } from "../actions/product";

const initialState = {
    items: [],
    totalAmount: 0
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CART_ITEMS:
            return {
                ...state,
                items:action.products.cartData,
            };
        case ADD_TO_CART:
        case REMOVE_FROM_CART: 
            return {
            ...state,
            items:action.products.data,
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                items:action.products.data,
                };
        case CLEAR_CART:
                    return {
                      ...state,
                      items: [],
                      totalAmount:0,
                    };
        default:
            return state;
    }
};