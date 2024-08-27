import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import productsReducer from "./store/reducers/product.js";
import cartReducer from "./store/reducers/cart.js";
import ordersReducer from "./store/reducers/order.js";
import wishlistReducer from "./store/reducers/wishlist.js";
import addressReducer from "./store/reducers/address.js";
import hotelReducer from "./store/reducers/hotel.js";

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    wishlist: wishlistReducer,
    address: addressReducer,
    hotel: hotelReducer,
  // Add more reducers here
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;