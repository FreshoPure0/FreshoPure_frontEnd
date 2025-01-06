import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData } from "../store/actions/auth";

const VenderProfileCardData = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  console.log(users, "user");
  const profileDetail = users;

  const uniqueId = profileDetail?.uniqueId || " ";
  const extractedId = uniqueId.split("+")[0];

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        await dispatch(getProfileData());
      } catch (error) {
        console.log(error);
      }
    };
    loadUserDetails();
  }, [dispatch]);

  // Now return cardData with dynamic data
  return [
    {
      id: 1,
      image:
        "/assets/vendor_profile.png",
      title: profileDetail?.imageDetails?.fullName || " ",
      text: uniqueId || " ",
      component: "personalInfo",
    },
    {
      id: 2,
      image: "/assets/personal_info.png",
      title: "Personal Info",
      text: "Name, Email, etc",
      component: "personalInfo",
    },
    {
      id: 3,
      image: "/assets/analystic.jpg",
      title: "Analytics",
      text: "",
      component: "analytics",
      // route: "/hotel/profile/analytics",
    },
    {
      id: 4,
      image: "/assets/order.jpg",
      title: "My Orders",
      text: "",
      component: "myOrders",
      // route: "/hotel/profile/orders",
    },
    {
      id: 5,
      image: "/assets/items.jpg",
      title: "My Items",
      text: "",
      component: "myitems",
    },
    {
      id: 6,
      image: "/assets/ledger.png",
      title: "Ledger",
      text: "",
      component: "ledger",
    },
  ];
};

export default VenderProfileCardData;
