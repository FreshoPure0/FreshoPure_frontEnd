import { GET_ALL_ADDRESS,GET_SELECTED_ADDRESS,ADD_NEW_ADDRESS,REMOVE_ADDRESS} from '../actions/address';

const initialState = {
    allAddress:[],
    selectedAddress : null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_ADDRESS:
            return {
                ...state,
                allAddress:action.payload.allAddresses,
                selectedAddress:action.payload.selectedAddress,
            };

        case REMOVE_ADDRESS:
            return {
                ...state, 
                allAddress:action.payload.allAddresses,
                selectedAddress:action.payload.selectedAddress,
            };

        case ADD_NEW_ADDRESS:
            return {
                    ...state, 
                    allAddress:action.payload.allAddresses,
                    selectedAddress:action.payload.selectedAddress,
                };
       
        default:
            return state;
    }
};