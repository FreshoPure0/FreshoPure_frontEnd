/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import useProfileCardData from "../../data/profileCardData";
import AnalyticsSectionVendor from "../Vendor/AnalyticSectionVendor";
import PersonalInfo from "../Hotel/PersonalInfo";
import ProfileCard from "../../components/ProfileCard";
import MyOrderSection from "./ProfileMyOrderSection";
import MyItemSection from "./ProfileMyItemSection";
import ProfileStock from "./ProfileStock";
import VenderProfileCardData from "../../data/venderProfileCardData";


function VenderProfileSection() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const cardData = VenderProfileCardData();

  // Function to handle card click, sets the selected component to be rendered
  const handleCardClick = (component) => {
    setSelectedComponent(component);
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
          component: <AnalyticsSectionVendor onBack={handleBack} />,
        };
      case "myOrders":
        return {
          title: "My Orders",
          component: <MyOrderSection onBack={handleBack} />,
        };
      case "myitems":
        return {
          title: "My items",
          component: <MyItemSection onBack={handleBack} />,
        };
      case "ProfileStock":
        return {
          title: "Stock & Waste",
          component: <ProfileStock onBack={handleBack} />,
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
    <section className="mt-10 flex flex-col w-full lg:w-full md:w-4/5 h-[80vh] md:px-8 overflow-y-auto hide-scrollbar">
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold  mb-0">{title}</h2>
      </div>

      {component ? (
        component
      ) : (
        <div className="mt-5 -ml-2 p-4 w-full lg:h-[69vh] bg-[#EFE5D8] rounded-lg flex items-center justify-evenly flex-wrap overflow-y-auto hide-scrollbar">
          {cardData.map((profile, index) => (
            <div
              key={profile.id}
              className="w-[20vw] max-w-xs min-w-0 cursor-pointer p-2 flex justify-center"
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

export default VenderProfileSection;
