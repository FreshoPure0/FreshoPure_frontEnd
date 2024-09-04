import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import productsReducer from "./src/store/reducers/product.js";
import cartReducer from "./src/store/reducers/cart.js";
import ordersReducer from "./src/store/reducers/order.js";
import wishlistReducer from "./src/store/reducers/wishlist.js";
import addressReducer from "./src/store/reducers/address.js";
import hotelReducer from "./src/store/reducers/hotel.js";
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    wishlist: wishlistReducer,
    address: addressReducer,
    hotel: hotelReducer,
  // Add more reducers here
});

const store = createStore(rootReducer,composeWithDevTools(
  applyMiddleware(thunk)
)
);

export default store;