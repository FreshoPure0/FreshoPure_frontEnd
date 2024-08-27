import React from "react";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";

function HeroSection() {
  const handleClick = (link) => {
    console.log(`Image clicked: ${link}`);
  };

  return (
    <section className="flex flex-col ml-6">
      <div className="flex flex-row justify-between mt-10 mb-4">
        <h2 className="text-3xl font-bold mb-0">Top Categories</h2>
        <SearchBar />
      </div>
      <div className="flex overflow-x-auto overflow-y-hidden hide-scrollbar flex-nowrap mt-4">
        {[
          "link1",
          "link2",
          "link3",
          "link4",
          "link5",
          "link6",
          "link7",
          "link8",
          "link9",
          "link10",
          "link11",
        ].map((link, index) => (
          <div
            key={index}
            className="relative w-24 h-fit mr-2 flex-shrink-0 group"
            tabIndex={0} // Ensure the div can be focused
            onClick={() => handleClick(link)}
          >
            <div className="relative w-full h-fit flex items-center justify-center">
              <img
                src="./assets/dairy.png"
                alt=""
                className="w-full object-contain rounded-lg"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">Link {index + 1}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 py-2 w-full lg:h-[58vh] md:h-[69vh] bg-[#EFE5D8] rounded-lg flex justify-evenly flex-wrap overflow-y-auto hide-scrollbar">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
}

export default HeroSection;
