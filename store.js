import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import productsReducer from "./src/store/reducers/product.js";
import cartReducer from "./src/store/reducers/cart.js";
import ordersReducer from "./src/store/reducers/order.js";
import wishlistReducer from "./src/store/reducers/wishlist.js";
import addressReducer from "./src/store/reducers/address.js";
import hotelReducer from "./src/store/reducers/hotel.js";
import vendorReducer from "./src/store/reducers/vendor.js";
import subVendorReducer from './src/store/reducers/subvendor.js'

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    wishlist: wishlistReducer,
    address: addressReducer,
    hotel: hotelReducer,
    vendor: vendorReducer,
    subVendor: subVendorReducer,

  // Add more reducers here
});

const store = createStore(rootReducer,
  applyMiddleware(thunk)

);

export default store;