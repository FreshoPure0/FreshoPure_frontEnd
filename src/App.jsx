import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeroSection from "./pages/Hotel/HeroSection";
import Header from "./components/Header";
import CartSection from "./pages/Hotel/CartSection";
import WishlistSection from "./pages/Hotel/WishlistSection";
import ProfileSection from "./pages/Hotel/ProfileSection";
import HeroSectionVendor from "./pages/Vendor/HeroSectionVendor";
import SubVendorSection from "./pages/Vendor/SubVendorSection";
import HotelsSection from "./pages/Vendor/HotelsSection";
import MyOrderSection from "./pages/Vendor/ProfileMyOrderSection";
import MyItemSection from "./pages/Vendor/ProfileMyItemSection";
import AnalyticsSection from "./pages/Hotel/AnalyticsSection";
import LoginById from "./pages/Auth/LoginById";
import VenderComponents from "./components/VenderComponents";
import { useSelector } from "react-redux";
// import InventorySection from "./pages/Hotel/InventarySection";

function App() {
  const { role } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginById />} />
        <Route
          path="/hotel"
          element={
            <div className="flex  min-h-[60.5vh] h-[85vh]">
              <Header />
              <HeroSection />
            </div>
          }
        />
        <Route
          path="/hotel/cart"
          element={
            <div className="flex min-h-[60.5vh] h-[85vh]">
              <Header />
              <CartSection />
            </div>
          }
        />
        <Route
          path="/hotel/wishlist"
          element={
            <div className="flex min-h-[60.5vh] h-[85vh]">
              <Header />
              <WishlistSection />
            </div>
          }
        />
        <Route
          path="/hotel/profile"
          element={
            <div className="flex min-h-[60.5vh] h-[85vh]">
              <Header />
              <ProfileSection />
            </div>
          }
        />
        <Route
          path="/hotel/profile/analytics"
          element={
            <div className="flex min-h-[60.5vh] h-[85vh]">
              <Header />
              <AnalyticsSection />
            </div>
          }
        />
        {/* <Route
          path="/hotel/profile/inventory"
          element={
            <div className="flex min-h-[60.5vh] h-[85vh]">
              <Header />
              <InventorySection />
            </div>
          }
        /> */}
        {role === "Vendor" ? (
          <Route path="/vendor" element={<VenderComponents />} />
        ) : (
          <>
            <Route
              path="/vendor"
              element={
                <div className="flex">
                  <Header />
                  <HeroSectionVendor />
                </div>
              }
            />
            <Route
              path="/vendor/subvendor"
              element={
                <div className="flex">
                  <Header />
                  <SubVendorSection />
                </div>
              }
            />
            <Route
              path="/vendor/hotels"
              element={
                <div className="flex">
                  <Header />
                  <HotelsSection />
                </div>
              }
            />
            <Route
              path="/vendor/profile/orders"
              element={
                <div className="flex">
                  <Header />
                  <MyOrderSection />
                </div>
              }
            />
            <Route
              path="/vendor/profile/items"
              element={
                <div className="flex">
                  <Header />
                  <MyItemSection />
                </div>
              }
            />
          </>
        )}
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
