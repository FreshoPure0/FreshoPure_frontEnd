import { GET_ALL_CATEGORIES } from "../actions/customer";

const initialState = {
  allCategories: [],
  vendorList: [],
  vendorItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload,
      };
  }
  return state;
};
