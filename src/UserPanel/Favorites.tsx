import React from "react";

import UserPanelNav from "./Items/UserPanelNav";
import Announcement from "../../component/Items/Announcement";

const Favorites = () => {
  const ads = [
    {
      imageSrc: "/images/car1.jpg",
      name: "Samochód sportowy",
      dateAdded: "2025-05-17",
      specification: "Silnik 2.0 turbo, 300KM, manual",
      price: "75000",
    },
    {
      imageSrc: "/images/laptop.jpg",
      name: "Laptop gamingowy",
      dateAdded: "2025-05-15",
      specification: "16GB RAM, RTX 3060, 1TB SSD",
      price: "6500",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 gap-6">
      {/* Nawigacja po lewej */}
      <div className="w-full lg:w-1/4">
        <UserPanelNav />
      </div>

      {/* Lista ulubionych ogłoszeń po prawej */}
      <div className="w-full lg:w-3/4 space-y-6 p-4">
        {/* {ads.map((ad, idx) => (
          <Announcement
            key={idx}
            imageSrc={ad.imageSrc}
            name={ad.name}
            specification={ad.specification}
          />
        ))} */}
      </div>
    </div>
  );
};

export default Favorites;
