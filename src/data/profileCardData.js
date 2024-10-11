// src/data/profileCardData.js

import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData } from "../store/actions/auth";

// This function can be used in the component where cardData is needed
const useProfileCardData = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  const profileDetail = useMemo(() => users[0]?.user || {}, [users]);

  const uniqueId = profileDetail.uniqueId || " ";
  const extractedId = uniqueId.split("+")[0];

  useEffect(() => {
    const loadUserDetails = async () => {
      dispatch(getProfileData());
    };

    loadUserDetails();
  }, [dispatch]);

  // Now return cardData with dynamic data
  return [
    {
      id: 1,
      image:
        "https://s3-alpha-sig.figma.com/img/9913/48e1/c591f24014fcc2f1215d47984442d440?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HfHms9E4z9eKzXExZ5UbZpT2s2BC0BSad3qR6h28Vyknfz-kPrEticT3F9gy23tA0Lmf0Tt6qC5xq3-5pkDdP1XqkT3UiWMO31BgsFpflhfYwu-Yz4lB-036w4cbDObuLi6zhR14yxHIt25gdNtcgOYwRtNNkFdiIQjAEhN3oi-Bl0ewCABM6OoHpjEZrOsmHxkfBu3YwSqfRyhG5jG1ptflPXnX-7XZ3G6fi0d7zBf0rQiW161n1XPV~eOtoQxS2tHEtRVtwXSub~rSkO1fKeWs8q~WgLQWfBHooVTuws347dItt7dzBwYRa2FJsuj54z66PoBVswWVPUWt1zmS3A__",
      title: profileDetail?.fullName || " ",
      text: extractedId || " ",
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
    },
    {
      id: 4,
      image: "/assets/order.jpg",
      title: "My Orders",
      text: "",
      component: "myOrders",
    },
    {
      id: 5,
      image: "/assets/address.jpg",
      title: "My Addresses",
      text: "Delivery locations",
      component: "myAddresses",
    },
  ];
};

export default useProfileCardData;
