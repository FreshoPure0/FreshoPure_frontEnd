import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST,FETCH_WISHLIST_ITEMS } from "../actions/wishlist";
import {ADD_ORDER} from '../actions/order';
import { DELETE_PRODUCT } from "../actions/product";

const initialState = {
    items: {},
    totalAmount: 0,
    wishlistData:[]
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_WISHLIST_ITEMS:
            return {
                ...state,
            wishlistData:action.products.wishlistData,
            };
        case ADD_TO_WISHLIST: 
        return {
            ...state,
        wishlistData:action.products.wishlistData,
        };
        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
            wishlistData:action.products.wishlistData,
        };
        
        
        default:
            return state;
    }
};