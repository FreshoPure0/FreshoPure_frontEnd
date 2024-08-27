import React from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

function Icon({ name, size }) {
  const iconMap = {
    home: FiHome,
    cart: FiShoppingCart,
    wishlist: FiHeart,
    profile: FiUser,
    logout: FiLogOut,
  };

  const IconComponent = iconMap[name] || FiHome;

  return <IconComponent size={size} className="text-yellow-900" />;
}

function Header() {
  return (
    <div className="flex flex-col lg:w-1/5 md:w-2/6 h-[85vh] flex-shrink-0">
      <img src="./assets/logo_1.jpg" alt="logo" className="w-20 rounded-2xl mx-auto mt-4" />
      <div className="flex flex-col justify-between mt-4 py-2 w-full h-full bg-gradient-to-r from-orange-200 to-orange-100 rounded-lg">
        <div>
          <Link
            to="/"
            className="flex items-center shadow-sm rounded-lg overflow-hidden mt-2 mx-8 px-4 bg-[#FDFCFB] focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439]"
          >
            <Icon name="home" size={20} />
            <p className="flex-grow p-2 text-base text-yellow-900">Home</p>
          </Link>
          <Link
            to="/cart"
            className="flex items-center shadow-sm rounded-lg overflow-hidden mt-2 mx-8 px-4 bg-[#FDFCFB] focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439]"
          >
            <Icon name="cart" size={20} />
            <p className="flex-grow p-2 text-base text-yellow-900">Cart</p>
          </Link>
          <Link
            to="/wishlist"
            className="flex items-center shadow-sm rounded-lg overflow-hidden mt-2 mx-8 px-4 bg-[#FDFCFB] focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439]"
          >
            <Icon name="wishlist" size={20} />
            <p className="flex-grow p-2 text-base text-yellow-900">Wishlist</p>
          </Link>
          <Link
            to="/profile"
            className="flex items-center shadow-sm rounded-lg overflow-hidden mt-2 mx-8 px-4 bg-[#FDFCFB] focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439]"
          >
            <Icon name="profile" size={20} />
            <p className="flex-grow p-2 text-base text-yellow-900">Profile</p>
          </Link>
        </div>
        <Link
          to="#"
          className="flex items-center shadow-sm rounded-lg overflow-hidden mb-4 mx-8 px-4 bg-[#FDFCFB] focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439]"
        >
          <Icon name="logout" size={20} />
          <p className="flex-grow p-2 text-base text-yellow-900">Logout</p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
