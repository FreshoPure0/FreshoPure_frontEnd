import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiShoppingCart, FiHeart, FiUser, FiUsers, FiBarChart2, FiLogOut, FiSettings } from "react-icons/fi";
import { getUserRole, logout } from "../store/actions/auth";

function Header() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control the mobile menu

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate("/"); // Navigate to the login page
  };

  // Fetch the user role when the component is mounted
  useEffect(() => {
    dispatch(getUserRole());
  }, [dispatch]);

  // Icon Map for quick access to icons
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

  // Function to render the icon based on the name
  const Icon = ({ name, size }) => {
    const IconComponent = iconMap[name] || FiHome;  // Default to home icon if not found
    return <IconComponent size={size} className="text-yellow-900" />;
  };

  return (
    <section>
      {/* Desktop or Tablet Navigation */}
      <div className="hidden lg:flex lg:flex-col mx-4 lg:w-fit md:w-1/5 h-[100vh] lg:items-center lg:justify-top overflow-y-auto flex-shrink-0 hide-scrollbar">
        <div className="flex justify-center items-center h-20 mt-4">
          <img
            src="/assets/logo_1.jpg"
            alt="logo"
            className="w-20 rounded-2xl transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="flex mt-4 flex-col justify-between py-2 w-fit h-2/3 bg-gradient-to-r from-orange-200 to-orange-100 rounded-lg">
          {role === "Hotel" ? (
            <div className="flex-grow">
              <Link
                to="/hotel"
                className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
              >
                <Icon name="home" size={30} />
                <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">Home</p>
              </Link>
              <Link
                to="/hotel/cart"
                className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
              >
                <Icon name="cart" size={30} />
                <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">Cart</p>
              </Link>
              <Link
                to="/hotel/wishlist"
                className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
              >
                <Icon name="wishlist" size={30} />
                <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">Wishlist</p>
              </Link>
              <Link
                to="/hotel/profile"
                className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
              >
                <Icon name="profile" size={30} />
                <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">Profile</p>
              </Link>
            </div>
          ) : role === "Vendor" ? (
            <div className="flex-grow">
              <Link
                to="/vendor"
                className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
              >
                <Icon name="home" size={30} />
                <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">Home</p>
              </Link>
              <Link
                to="/vendor/hotels"
                className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
              >
                <Icon name="hotel" size={30} />
                <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">Hotels</p>
              </Link>
              <Link
                to="/vendor/subvendor"
                className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
              >
                <Icon name="subvendor" size={30} />
                <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">Subvendors</p>
              </Link>
              <Link
                to="/vendor/profile"
                className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
              >
                <Icon name="setting" size={30} />
                <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">Profile</p>
              </Link>
            </div>
          ) : null}
          <Link
            to="/"
            className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
            onClick={handleLogout}
          >
            <Icon name="logout" size={30} />
            <p className="flex-grow pl-2 text-base text-yellow-900 hidden lg:block">Logout</p>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {/* Hamburger menu for smaller screens */}
      <div className="absolute top-4 left-4 z-50 lg:hidden cursor-pointer" onClick={toggleMenu}>
        {!isMenuOpen && <FiMenu size={30} className="text-yellow-900" />} {/* Only show hamburger if menu is closed */}
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-80 h-full bg-gradient-to-r from-orange-200 to-orange-100 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} z-40`}
      >
        <div className="flex justify-between items-center p-4">
          {/* Close Button */}
          <div onClick={toggleMenu} className="cursor-pointer">
            <FiX size={30} className="text-yellow-900" />
          </div>
        </div>

        <div className="flex flex-col justify-between py-2 w-full h-4/5">
          {role === "Hotel" ? (
            <div className="flex-grow">
              <Link
                to="/hotel"
                className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
              >
                <Icon name="home" size={30} />
                <p className="pl-2 text-base text-yellow-900">Home</p>
              </Link>
              <Link
                to="/hotel/cart"
                className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
              >
                <Icon name="cart" size={30} />
                <p className="pl-2 text-base text-yellow-900">Cart</p>
              </Link>
              <Link
                to="/hotel/wishlist"
                className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
              >
                <Icon name="wishlist" size={30} />
                <p className="pl-2 text-base text-yellow-900">Wishlist</p>
              </Link>
              <Link
                to="/hotel/profile"
                className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
              >
                <Icon name="profile" size={30} />
                <p className="pl-2 text-base text-yellow-900">Profile</p>
              </Link>
            </div>
          ) : role === "Vendor" ? (
            <div className="flex-grow">
              <Link
                to="/vendor"
                className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
              >
                <Icon name="home" size={30} />
                <p className="pl-2 text-base text-yellow-900">Home</p>
              </Link>
              <Link
                to="/vendor/hotels"
                className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
              >
                <Icon name="hotel" size={30} />
                <p className="pl-2 text-base text-yellow-900">Hotels</p>
              </Link>
              <Link
                to="/vendor/subvendor"
                className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
              >
                <Icon name="subvendor" size={30} />
                <p className="pl-2 text-base text-yellow-900">Subvendors</p>
              </Link>
              <Link
                to="/vendor/profile"
                className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
              >
                <Icon name="setting" size={30} />
                <p className="pl-2 text-base text-yellow-900">Profile</p>
              </Link>
            </div>
          ) : null}
          <Link
            to="/"
            className="flex items-center justify-center mt-2 mx-8 px-2 bg-[#FDFCFB] shadow-sm rounded-lg focus:bg-[#FFF4E8] focus:border-l-4 focus:border-[#896439] transition-all duration-200"
            onClick={handleLogout}
          >
            <Icon name="logout" size={30} />
            <p className="pl-2 text-base text-yellow-900">Logout</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Header;
