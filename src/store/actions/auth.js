// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Toast from "react-native-toast-message";
import { ToastContainer, toast } from "react-toastify";
// import { registerIndieID, unregisterIndieDevice } from "native-notify";
// import axios from "axios";
// import createAsyncThunk from "@reduxjs/toolkit";
import { activeVendorSubscription } from "./vendor";
// import { StackActions } from "@react-navigation/native";
import { baseUrl } from "../baseUrl";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

// Action Types
export const SET_USER_ROLE = "SET_USER_ROLE";

export const AUTHENTICATE = "AUTHENTICATE";
// export const LOGOUT = "LOGOUT";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_DID_TRY_AUTO_LOGIN = "SET_DID_TRY_AUTO_LOGIN";
export const SET_USER = "SET_USER";
export const LOGIN = "LOGIN";
export const ADD_USER = "ADD_USER";
export const COMPLETE_PROFILE = "COMPLETE_PROFILE";
export const CLEAR_INFO = "CLEAR_INFO";
export const OTP_HANDLING = "OTP_HANDLING";
export const REVIEW_PROFILE = "REVIEW_PROFILE";
export const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";
export const GET_PROFILE_DATA = "GET_PROFILE_DATA";
export const SWITCH_PROFILE = "SWITCH_PROFILE";
export const FETCH_USER_ROLE = "FETCH_USER_ROLE";
let timer;

const fetchToken = () => {
  // Get the cookies using js-cookie
  const userDataCookie = Cookies.get("userData");
  const activeUserIdCookie = Cookies.get("activeUserId");

  // If userData or activeUserId doesn't exist, return null
  if (!userDataCookie || !activeUserIdCookie) {
    return null;
  }

  // Parse the JSON data
  const parsedData = JSON.parse(userDataCookie);

  // Find the user with the active ID
  const user = parsedData?.filter((user) => user.id === activeUserIdCookie);

  // Return the token if found
  return user[0]?.token;
  // console.log(user[0]?.token)
};

const fetchRole = () => {
  // Get the cookies using js-cookie
  const userDataCookie = Cookies.get("userData");
  const activeUserIdCookie = Cookies.get("activeUserId");

  // If userData or activeUserId doesn't exist, return null
  if (!userDataCookie || !activeUserIdCookie) {
    return null;
  }

  // Parse the JSON data
  const parsedData = JSON.parse(userDataCookie);

  // Find the user with the active ID
  const user = parsedData?.filter((user) => user.id === activeUserIdCookie);

  // Return the token if found
  return user[0]?.role;
  // console.log(user[0]?.role)
};

export const setDidTryAutoLogin = () => {
  return {
    type: SET_DID_TRY_AUTO_LOGIN,
  };
};

// Modified authenticate to handle multiple profiles
export const authenticate = (
  id,
  token,
  user,
  role,
  isProfileComplete,
  isReviewed,
  isApproved,
  activeSubscription,
  hasActiveSubscription,
  paymentToken
) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      payload: {
        id,
        token,
        user,
        role,
        isProfileComplete,
        isReviewed,
        isApproved,
        activeSubscription,
        hasActiveSubscription,
        paymentToken,
      },
    });
  };
};

// Action Creator
export const setUserRole = (role) => {
  return {
    type: SET_USER_ROLE,
    payload: role,
  };
};

export const otpVerify = (phone, otp) => {
  return async (dispatch) => {
    const response = await fetch(baseUrl + "/user/emailverification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        code: otp,
      }),
    });

    // if (!response.ok) {
    //   return Toast.show({
    //     type: "error",
    //     text1: "Try Again!",
    //   });
    // }

    const resData = await response.json();

    if (resData?.success) {
      registerIndieID(resData?.user?._id, 21751, "ZkTW5huO0kRCf7UXI6DmJL");
    }

    if (!resData.success) {
      // Toast.show({
      //   type: "error",
      //   text1: "Invalid Otp!",
      // });
    } else {
      const userData = await AsyncStorage.getItem("userData");

      if (userData !== null) {
        const parsedData = JSON.parse(userData);

        const index = parsedData?.findIndex(
          (user) => user.id === resData?.user?._id
        );

        if (index === -1) {
          const user = {
            id: resData.user._id,
            role: resData.role,
            token: resData.token,
            user: resData.user,
            isProfileComplete: resData.isProfileComplete,
            isReviewed: resData.isReviewed,
            isApproved: resData.isApproved,
            loginSuccess: true,
            didTryAutoLogin: false,
          };

          let userData = parsedData;
          userData.push(user);

          saveDataToStorage(userData, resData.user._id);
        }
      } else {
        const user = [
          {
            id: resData.user._id,
            role: resData.role,
            token: resData.token,
            user: resData.user,
            isProfileComplete: resData.isProfileComplete,
            isReviewed: resData.isReviewed,
            isApproved: resData.isApproved,
            loginSuccess: true,
            didTryAutoLogin: false,
          },
        ];

        saveDataToStorage(user, resData.user._id);
      }

      dispatch(
        authenticate(
          resData.user._id,
          resData.token,
          resData.user,
          resData.role,
          resData.user.isProfileComplete,
          resData.user.isReviewed,
          resData.user.isApproved
        )
      );
    }
  };
};

export const getUserRole = () => {
  return async (dispatch) => {
    try {
      const role = fetchRole(); // Function to fetch the role
      dispatch({
        type: FETCH_USER_ROLE,
        role: role, // Dispatch the fetched role
      });
    } catch (err) {
      console.error("Error fetching user role:", err);
      dispatch({
        type: FETCH_USER_ROLE,
        role: null, // Handle error case
      });
    }
  };
};

// Modified login to handle multiple profiles
export const login = ({ phone, code }) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, code }),
      });

      if (!response.ok) {
        // return Toast.show({
        //   type: "error",
        //   text1: "Invalid credentials",
        // });
        console.log("Invalid credentials");
      }

      const resData = await response.json();
      console.log(resData);
      // if (resData?.success) {
      //   registerIndieID(resData?.user?._id, 21751, "ZkTW5huO0kRCf7UXI6DmJL");
      // }

      // if (resData.otp === true) {
      //   return Toast.show({
      //     type: "success",
      //     text1: "Otp Sent",
      //   });
      // }

      if (!resData.success) {
        console.log("Invalid Unique ID");
        toast.error("Invalid UniqueId!");
        // Toast.show({
        //   type: "error",
        //   text1: "Invalid UniqueId!",
        // });
        return;
      }
      const userData = Cookies.get("userData");
      let parsedData = userData ? JSON.parse(userData) : null;

      if (parsedData === null) {
        parsedData = [
          {
            id: resData.user._id,
            role: resData.role,
            token: resData.token,
            user: resData.user,
            isProfileComplete: resData.isProfileComplete,
            isReviewed: resData.isReviewed,
            isApproved: resData.isApproved,
            loginSuccess: true,
            didTryAutoLogin: false,
          },
        ];
      } else {
        const index = parsedData.findIndex(
          (user) => user.id === resData?.user?._id
        );

        if (index !== -1) {
          // return Toast.show({
          //   type: "error",
          //   text1: "Already Logged In",
          // });
        }

        const newUser = {
          id: resData.user._id,
          role: resData.role,
          token: resData.token,
          user: resData.user,
          isProfileComplete: resData.isProfileComplete,
          isReviewed: resData.isReviewed,
          isApproved: resData.isApproved,
          loginSuccess: true,
          didTryAutoLogin: false,
        };
        parsedData.push(newUser);
      }

      saveDataToStorage(parsedData, resData.user._id);
      fetchToken();
      dispatch(
        authenticate(
          resData.user._id,
          resData.token,
          resData.user,
          resData.role,
          resData.user.isProfileComplete,
          resData.user.isReviewed,
          resData.user.isApproved
        )
      );
    } catch (err) {
      console.log(err);
      // Toast.show({
      //   type: "error",
      //   text1: "An error occurred during login.",
      // });
    }
  };
};

const saveDataToStorage = (userData, activeUserId) => {
  // Save userData as a cookie with 1-week expiration
  Cookies.set("userData", JSON.stringify(userData), { expires: 30, path: "/" });

  // Save activeUserId as a cookie with 1-week expiration
  Cookies.set("activeUserId", activeUserId, { expires: 30, path: "/" });
  console.log("cookie Saved");
};

export const resend = (phone) => {
  try {
    return async (dispatch) => {
      const response = await fetch(baseUrl + "/user/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone,
        }),
      });

      if (!response.ok) {
        // return Toast.show({
        //   type: "error",
        //   text1: "Invalid Number",
        // });
      }
    };
  } catch (err) {
    // console.log(err);
  }
};

export const getProfileData = () => {
  try {
    return async (dispatch) => {
      const response = await fetch(baseUrl + "/user/profile", {
        method: "GET",
        headers: {
          token: await fetchToken(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching Details!!");
      }

      const resData = await response.json();
      console.log(resData, "resData");
      dispatch({
        type: GET_PROFILE_DATA,
        payload: resData?.user,
      });
    };
  } catch (err) {
    console.log(err);
  }
};

// Modified setUser to handle multiple profiles
export const setUser = () => {
  return async (dispatch) => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const activeUserId = await AsyncStorage.getItem("activeUserId");

      if (!userData) {
        // return Toast.show({
        //   type: "error",
        //   text1: "Session Expired",
        // });
      }

      const users = JSON.parse(userData);
      const activeUser = users.find((user) => user?.id === activeUserId);

      dispatch({
        type: SET_USER,
        payload: {
          users,
          activeUserId,
        },
      });

      //   const verifyToken = async () => {
      //     const response = await fetch(baseUrl + "/user/verifyToken", {
      //       method: "POST",
      //       headers: {
      //         token: await fetchToken(),
      //         "Content-Type": "application/json",
      //       },
      //     });
      //     if (!response.ok) {
      //       throw new Error("Session Expired!");
      //     }
      //     return response.json();
      //   };

      //   try {
      //     const user = await verifyToken();
      //     if (user?.user) {
      //       await AsyncStorage.setItem("userData", JSON.stringify(users));
      //       await AsyncStorage.setItem("activeUserId", activeUserId);
      //     } else {
      //       throw new Error("Session Expired");
      //     }
      //   } catch (err) {
      //     console.log(err);

      //     const updatedUsers = users.filter((user) => user?.id !== activeUserId);
      //     const nextActiveUserId = updatedUsers[0]?.id || null;

      //     await AsyncStorage.setItem("userData", JSON.stringify(updatedUsers));
      //     await AsyncStorage.setItem("activeUserId", nextActiveUserId);

      //     dispatch({
      //       type: SET_USER,
      //       payload: {
      //         users: updatedUsers,
      //         activeUserId: nextActiveUserId,
      //       },
      //     });
      // }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUserProfile = (userData) => {
  console.log(userData);
  return async (dispatch) => {
    const response = await fetch(`${baseUrl}/user/profileComplete`, {
      method: "post",
      body: JSON.stringify(userData),
      headers: {
        token: await fetchToken(),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const resData = await response.json();

    console.log(resData);

    if (!response.ok) {
      // Toast.show({
      //   type: "error",
      //   text1: "Something went wrong!!",
      // });
    } else {
      // Toast.show({
      //   type: "success",
      //   text1: "Profile Completed successfully",
      // });

      dispatch(
        authenticate(
          resData.user._id,
          resData.token,
          resData.user,
          resData.role,
          resData.user.isProfileComplete,
          resData.user.isReviewed,
          resData.user.isApproved
        )
      );

      const userData = await AsyncStorage.getItem("userData");
      const parsedData = JSON.parse(userData);

      const index = parsedData?.findIndex(
        (user) => user.id === resData?.user?._id
      );

      const updatedUser = {
        id: resData.user._id,
        role: resData.role,
        token: resData.token,
        user: resData.user,
        isProfileComplete: true,
        isReviewed: false,
        isApproved: false,
        loginSuccess: true,
        didTryAutoLogin: false,
      };

      if (index === -1) {
        // If the user is not found, add a new user object
        parsedData.push(updatedUser);
      } else {
        // If the user is found, update the user's information
        parsedData[index] = updatedUser;
      }

      console.log(parsedData, "parsedData");

      saveDataToStorage(parsedData, resData?.user?._id);
    }
  };
};

export const setUserProfileImage = async (image) => {
  try {
    const parts = image?.uri?.split("/");
    const filename = parts[parts.length - 1];

    const formData = new FormData();
    formData.append({
      fieldname: "images",
      originalname: filename,
      encoding: "7bit",
      mimetype: "image/jpeg",
      destination: "uploads",
      filename: filename,
      uri: filename,
      type: image.type,
    });

    const response = await fetch(`${baseUrl}/user/addUserDetails`, {
      method: "post",
      body: formData._parts[0],
      headers: {
        token: await fetchToken(),
      },
    });

    // Dispatch your success action here if needed
  } catch (error) {
    throw error;
  }
};

export const ProfileReview = () => {
  return async (dispatch) => {
    dispatch({
      type: REVIEW_PROFILE,
    });
  };
};

export const switchProfile = (userId) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");
    const parsedData = JSON.parse(userData);

    saveDataToStorage(parsedData, userId);

    dispatch({
      type: SWITCH_PROFILE,
      payload: userId,
    });
  };
};

export const clearinfo = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_INFO,
    });
  };
};

// Modified logout to handle multiple profiles
// export const logout = () => {
//   return async (dispatch) => {
//     try {
//       const userData = await AsyncStorage.getItem("userData");
//       const activeId = await AsyncStorage.getItem("activeUserId");

//       if (userData) {
//         const parsedUserData = JSON.parse(userData);
//         const otherUsers = parsedUserData?.filter(
//           (user) => user?.user?._id !== activeId
//         );

//         saveDataToStorage(otherUsers, otherUsers[0]?.user?._id);

//         dispatch({
//           type: LOGOUT,
//           restUsers: otherUsers,
//           activeUserId: otherUsers[0]?.user?._id,
//         });
//       } else {
//         // Toast.show({
//         //   type: "error",
//         //   text1: "Unknown Error occurred",
//         // });
//       }
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };
// };

export const logout = () => {
  return (dispatch) => {
    // Clear cookies
    Cookies.remove("userData");
    Cookies.remove("activeUserId");

    // Dispatch logout action to reset the state
    dispatch({ type: LOGOUT_USER });

    // Optionally, if you want to clear localStorage/sessionStorage or any other related storage, do it here

    // If you're using routing in your action, you can navigate here as well
  };
};

// // Modified saveDataToStorage to handle multiple profiles
// const saveDataToStorage = (
//   token,
//   user,
//   role,
//   isProfileComplete,
//   isReviewed,
//   isApproved,
//   img
// ) => {
//   AsyncStorage.setItem(
//     "userData",
//     JSON.stringify({
//       token: token,
//       role: role,
//       user: user,
//       profilePicture: img,
//       isProfileComplete: isProfileComplete,
//       isReviewed: isReviewed,
//       isApproved: isApproved,
//     })
//   );
// };

export const updateUserProfile = (profileData) => {
  return async (dispatch) => {
    const response = await fetch(`${baseUrl}/user/updateUserDetails`, {
      method: "post",
      body: JSON.stringify(profileData),
      headers: {
        token: await fetchToken(),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Toast.show({
      //   type: "error",
      //   text1: "Profile Not Updated! Please Try Again Later.",
      // });
    }

    if (response.ok) {
      // Toast.show({
      //   type: "success",
      //   text1: "Profile Updated Successfully!",
      // });
    }

    const resData = await response.json();

    dispatch({
      type: UPDATE_USER_DETAILS,
      payload: resData?.user,
      id: resData?.user?._id,
    });
  };
};
