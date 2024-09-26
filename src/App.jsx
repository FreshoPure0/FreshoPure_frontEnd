import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HeroSection from "./pages/Hotel/HeroSection";
import Header from "./components/Header";
import CartSection from "./pages/Hotel/CartSection";
import WishlistSection from "./pages/Hotel/WishlistSection"; 
import ProfileSection from "./pages/Hotel/ProfileSection";
import HeroSectionVendor from "./pages/Vendor/HeroSectionVendor";
import SubVendorSection from "./pages/Vendor/SubVendorSection";
import HotelsSection from "./pages/Vendor/HotelsSection";

function App() {
  return (
    <Router>
      <div className="flex">
        <Header/>
        <div className="lg:w-4/5 md:w-4/6">
          <Routes>
            <Route path="/hotel" element={<HeroSection />} />
            <Route path="/hotel/cart" element={<CartSection />} />
            <Route path="/hotel/wishlist" element={<WishlistSection />} />
            <Route path="/hotel/profile" element={<ProfileSection />} />
            <Route path="/vendor" element={<HeroSectionVendor/>} />
            <Route path="/vendor/subvendor" element={<SubVendorSection/>} />
            <Route path="/vendor/hotels" element={<HotelsSection/>} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
