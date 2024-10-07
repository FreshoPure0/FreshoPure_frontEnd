// src/components/ProfileSection.js
import React, { useState } from "react";
import ProfileCard from "../../components/ProfileCard";
import { cardData } from "../../data/profileCardData";
import SearchBar from "../../components/SearchBar";
import PersonalInfo from "./PersonalInfo";
import AnalyticsSection from "../Hotel/AnalyticsSection";
import MyOrder from "../Hotel/MyOrder";
import MyAddress from "../Hotel/MyAddress";

function ProfileSection() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  // Function to handle card click
  const handleCardClick = (component) => {
    setSelectedComponent(component);
  };

  const handleBack = () => {
    setSelectedComponent(null); // Go back to the main profile view
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "personalInfo":
        return {
          title: "Personal Information",
          component: <PersonalInfo onBack={handleBack} />, // Pass the back handler
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
      default:
        return null; // Return nothing if no component is selected
    }
  };

  const { title, component } = selectedComponent
    ? renderComponent()
    : { title: "Profile Details", component: null };

  return (
    <section className="ml-8 mt-10 flex flex-col lg:w-full md:w-1/5 h-[80vh]">
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold mb-0">{title}</h2>
        <SearchBar className="mb-4" />
      </div>
      {component ? (
        component
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 p-4 bg-[#EFE5D8] rounded-lg overflow-y-auto">
          {cardData.map((profile, index) => (
            <div
              key={profile.id}
              className="w-full cursor-pointer"
              onClick={() => handleCardClick(profile.component)}
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
