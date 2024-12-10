// src/data/profileCardData.js

import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData } from "../store/actions/auth";

// This function can be used in the component where cardData is needed
const useProfileCardData = () => {
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
        "https://s3-alpha-sig.figma.com/img/9913/48e1/c591f24014fcc2f1215d47984442d440?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jur9sC4GO2Kx4C5OEV-3767XQ7PH0UPqjcHHxmlTZRziJ8kyHxdJSZbVLsmdTcNEXJTZVAb2ndHdkJfEMmRbtPdlQ6QY-NlSp5kuUQm51ImeIpGJ3plieBDB8TgV-~NmtCbFCf5K8igjtga7S~d6Y6PkMxVFq7c6vaiDOH~xZy6jD4hf2R9qmHJ9ilkKdSFc9P1AyF5rWsS3~xXYE88m2aUO5yAQ7cY2fAzj314QUPERdizpWxU5Um2quD3V15uDR4YabUeiYTeWxVqsq5Gt8pnaCt7QZHne9yC5fMI40ncL4zHtORNTK5~5PIVQGSGt4CbIIxCs07hBijbStzPLDg__",
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
      image: "/assets/address.jpg",
      title: "My Address",
      text: "",
      component: "myAddresses",
    },
    {
      id: 6,
      image: "/assets/Inventory.jpg",
      title: "Inventory Management",
      text: "",
      component: "Inventory",
      // route: "/hotel/profile/inventory",
    },
  ];
};

export default useProfileCardData;
