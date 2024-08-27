import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeroSection from "./pages/HeroSection";
import Header from "./components/Header";
import CartSection from "./pages/CartSection";
import WishlistSection from "./pages/WishlistSection";
import ProfileSection from "./pages/ProfileSection";

function App() {
  return (
    <Router>
      <div className="flex">
        <Header />
        <div className="lg:w-4/5 md:w-4/6">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/cart" element={<CartSection />} />
            <Route path="/wishlist" element={<WishlistSection />} />
            <Route path="/profile" element={<ProfileSection />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
