/* eslint-disable no-unused-vars */
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

  const renderComponent = () => {
    switch (selectedComponent) {
      case "personalInfo":
        return {
          title: "Personal Information",
          component: <PersonalInfo />,
        };
      case "analytics":
        return {
          title: "Analytics",
          component: <AnalyticsSection />,
        };
      case "myOrders":
        return {
          title: "My Orders",
          component: <MyOrder />,
        };
      case "myAddresses":
        return {
          title: "My Addresses",
          component: <MyAddress />,
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
        <h2 className="text-3xl font-bold mb-0">{title}</h2>{" "}
        <SearchBar className="mb-4" />
      </div>
      {component ? ( // If a component is selected, render it
        component
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 p-4 bg-[#EFE5D8] rounded-lg overflow-y-auto">
          {cardData.map((profile) => (
            <div
              key={profile.id}
              className="w-full cursor-pointer" // Add cursor pointer for clickability
              onClick={() => handleCardClick(profile.component)} // Handle card click
            >
              <ProfileCard
                text={profile.text}
                image={profile.image}
                title={profile.title}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProfileSection;
