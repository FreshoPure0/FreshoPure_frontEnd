/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard";
import useProfileCardData from "../../data/profileCardData";
import PersonalInfo from "./PersonalInfo";
import AnalyticsSection from "../Hotel/AnalyticsSection";
import MyOrder from "../Hotel/MyOrder";
import MyAddress from "../Hotel/MyAddress";
import InventarySection from "./InventarySection";
import { useLocation } from "react-router-dom";

function ProfileSection() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const cardData = useProfileCardData();

  const location = useLocation();
  const showOrder = location.state?.showOrder || false;

  // Automatically open "My Orders" if `showOrder` is true
  useEffect(() => {
    if (showOrder) {
      setSelectedComponent("myOrders");
    }
  }, [showOrder]);

  // Function to handle card click, sets the selected component to be rendered
  const handleCardClick = (component) => {
    if (component) {
      setSelectedComponent(component); // Handle in-app component rendering
    }
  };

  // Function to handle back button, sets selectedComponent back to null
  const handleBack = () => {
    setSelectedComponent(null); // Go back to the main profile view
  };

  // Function to render the selected component based on user selection
  const renderComponent = () => {
    switch (selectedComponent) {
      case "personalInfo":
        return {
          title: "Personal Information",
          component: <PersonalInfo onBack={handleBack} />,
        };
      case "analytics":
        return {
          title: "Analytics",
          component: <AnalyticsSection onBack={handleBack} />,
        };
      case "myOrders":
        return {
          title: "My Orders",
          component: <MyOrder onBack={handleBack} />,
        };
      case "myAddresses":
        return {
          title: "My Addresses",
          component: <MyAddress onBack={handleBack} />,
        };
      case "Inventory":
        return {
          title: "Inventory Management",
          component: <InventarySection onBack={handleBack} />,
        };
      default:
        return null;
    }
  };

  // Destructure the `title` and `component` from the result of `renderComponent`
  const { title, component } = selectedComponent
    ? renderComponent()
    : { title: "Profile Details", component: null };

  return (
    <section className="mt-10 flex flex-col w-full lg:w-full md:w-4/5 h-[80vh] md:px-8 overflow-y-auto">
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold mb-0">{title}</h2>
      </div>

      {component ? (
        component
      ) : (
        <div className="mt-5 -ml-2 p-4 w-full lg:h-[69vh] bg-[#EFE5D8] rounded-lg flex items-center justify-evenly flex-wrap overflow-y-auto hide-scrollbar">
          {cardData.map((profile, index) => (
            <div
              key={profile.id}
              className="w-full max-w-xs min-w-0 cursor-pointer p-2 flex justify-center"
              onClick={() => handleCardClick(profile.component)} // Set the clicked component
            >
              <ProfileCard
                text={profile.text}
                image={profile.image}
                title={profile.title}
                isFirst={index === 0}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProfileSection;
