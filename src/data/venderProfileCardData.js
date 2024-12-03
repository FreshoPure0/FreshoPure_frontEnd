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
        "https://s3-alpha-sig.figma.com/img/3c8d/1c0e/302cb16330f866e30689725dbb18c9dd?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YSYUeKNLryaB3e-NIDKLZDXkoEFrX4J9IwGo335lbXmiQOcZI8vfhANeMfVX1173tNGbgCNwXIlp8euEEO3vtWc5X1NISrLHKjwEClO9wySuMYsZj9ysBwJENWzbeOF32JvAZDzgEpkH7zoZcWA44hX8ALijvzL-0mQO~t2LCoN20XaSBVimmMijL9Jy~79-nBksnP1JqoGcBcDRPKtwmXGBhg5EBvRqR026NUQyX4DjsBgQmZw6d0gKNmYWYsJ7l3-63RXZX9Y7ad8szVUBvUqX8rCZCPkaHusP5bLR1XLHN74fvYSqDNUfGPQEedVciMHPccoJa-PY9v7P0Mb7KA__",
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
  ];
};

export default VenderProfileCardData;
