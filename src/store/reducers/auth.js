import {
  AUTHENTICATE,
  LOGOUT,
  SET_DID_TRY_AUTO_LOGIN,
  LOGIN,
  CLEAR_INFO,
  SET_USER,
  COMPLETE_PROFILE,
  ADD_USER,
  OTP_HANDLING,
  REVIEW_PROFILE,
  UPDATE_USER_DETAILS,
  GET_PROFILE_DATA,
  SWITCH_PROFILE,
} from "../actions/auth";

const initialState = {
  users: [],
  activeUserId: null, // ID of the currently active user
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex !== -1) {
        const updatedUsers = [...state.users];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          loginSuccess: true,
          isSelected: true,
        };
        return {
          ...state,
          users: updatedUsers,
          activeUserId: action.payload.id,
        };
      }
      return state;
    }

    case AUTHENTICATE: {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      const userData = {
        id: action.payload.id,
        role: action.payload.role,
        token: action.payload.token,
        user: action.payload.user,
        isProfileComplete: action.payload.isProfileComplete,
        isReviewed: action.payload.isReviewed,
        isApproved: action.payload.isApproved,
        loginSuccess: true,
        didTryAutoLogin: false,
      };

      if (userIndex !== -1) {
        const updatedUsers = [...state.users];
        updatedUsers[userIndex] = userData;

        return {
          ...state,
          users: updatedUsers,
          activeUserId: action.payload.id,
        };
      } else {
        return {
          ...state,
          users: [...state.users, userData],
          activeUserId: action.payload.id,
        };
      }
    }

    case SET_USER: {
      const { users, activeUserId } = action.payload;

      return {
        ...state,
        users,
        activeUserId,
      };
    }

    case SET_DID_TRY_AUTO_LOGIN: {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex !== -1) {
        const updatedUsers = [...state.users];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          didTryAutoLogin: true,
        };
        return {
          ...state,
          users: updatedUsers,
        };
      }
      return state;
    }

    case COMPLETE_PROFILE: {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex !== -1) {
        const updatedUsers = [...state.users];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          isProfileComplete: true,
          isSelected: true,
        };
        return {
          ...state,
          users: updatedUsers,
        };
      }
      return state;
    }

    case LOGOUT: {
       return {
           ...state,
           users:action.restUsers,
           activeUserId:action.activeUserId
       };
      }

    case CLEAR_INFO: {
      const userIndex = state.users?.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex !== -1) {
        const updatedUsers = [...state.users];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          loginSuccess: false,
          isSelected: false,
        };
        return {
          ...state,
          users: updatedUsers,
        };
      }
      return state;
    }

    case ADD_USER: {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }

    case REVIEW_PROFILE: {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex !== -1) {
        const updatedUsers = [...state.users];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          isReviewed: true,
          isApproved: true,
        };
        return {
          ...state,
          users: updatedUsers,
        };
      }
      return state;
    }

    case UPDATE_USER_DETAILS: {
      const userIndex = state.users.findIndex((user) => user.id === action.id);
      if (userIndex !== -1) {
        const updatedUsers = [...state.users];
        updatedUsers[userIndex].user = action.payload;

        return {
          ...state,
          users: updatedUsers,
        };
      }
      return state;
    }

    case GET_PROFILE_DATA: {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex !== -1) {
        const updatedUsers = [...state.users];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          profilePicture: action.payload,
        };
        return {
          ...state,
          users: updatedUsers,
        };
      }
      return state;
    }

    case SWITCH_PROFILE: {
      return {
        ...state,
        activeUserId: action.payload,
      };
    }

    default:
      return state;
  }
};
