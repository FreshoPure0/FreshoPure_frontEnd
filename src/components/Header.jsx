import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiUsers,
  FiBarChart2,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { getUserRole, logout } from "../store/actions/auth";

function Icon({ name, size }) {
  const iconMap = {
    home: FiHome,
    cart: FiShoppingCart,
    wishlist: FiHeart,
    profile: FiUser,
    logout: FiLogOut,
    subvendor: FiUsers,
    hotel: FiBarChart2,
    setting: FiSettings,
  };

  const IconComponent = iconMap[name] || FiHome;

  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full">
      <IconComponent size={size} className="text-yellow-900" />
    </div>
  );
}

function Header() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate("/"); // Navigate to the login page
  };

  useEffect(() => {
    dispatch(getUserRole());
  }, [dispatch]);

  return (
    <div className="flex flex-col mx-4 lg:w-fit md:w-1/5 min-h-[60.5vh] h-[85vh] overflow-y-auto flex-shrink-0">
      <div className="flex justify-center items-center h-20 mt-4">
        <img
          src="/assets/logo_1.jpg"
          alt="logo"
          className="w-20 rounded-2xl transition-all duration-300 ease-in-out"
        />
      </div>
      <div className="flex mt-4 flex-col justify-between py-2 w-fit h-full bg-gradient-to-r from-orange-200 to-orange-100 rounded-lg">
        {role === "Hotel" ? (
          <div className="flex-grow">
            <Link
              to="/hotel"
              className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
            >
              <Icon name="home" size={30} />
              <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">
                Home
              </p>
            </Link>
            <Link
              to="/hotel/cart"
              className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
            >
              <Icon name="cart" size={30} />
              <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">
                Cart
              </p>
            </Link>
            <Link
              to="/hotel/wishlist"
              className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
            >
              <Icon name="wishlist" size={30} />
              <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">
                Wishlist
              </p>
            </Link>
            <Link
              to="/hotel/profile"
              className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
            >
              <Icon name="profile" size={30} />
              <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">
                Profile
              </p>
            </Link>
          </div>
        ) : role === "Vendor" ? (
          <div className="flex-grow">
            <Link
              to="/vendor"
              className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
            >
              <Icon name="home" size={30} />
              <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">
                Home
              </p>
            </Link>
            <Link
              to="/vendor/hotels"
              className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
            >
              <Icon name="hotel" size={30} />
              <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">
                Hotels
              </p>
            </Link>
            <Link
              to="/vendor/subvendor"
              className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
            >
              <Icon name="subvendor" size={30} />
              <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">
                Subvendors
              </p>
            </Link>
            <Link
              to="/vendor/profile"
              className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
            >
              <Icon name="setting" size={30} />
              <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">
                Profile
              </p>
            </Link>
          </div>
        ) : null}
        <Link
          to="/"
          className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
          onClick={() => {
            handleLogout();
          }}
        >
          <Icon name="logout" size={30} />
          <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">
            Logout
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
