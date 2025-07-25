import React from "react";
import UserPanelNav from "./Items/UserPanelNav";
import Announcement from "../../component/Items/Announcement";

const MyOrders = () => {
  const ads = [
    {
      id: "1",
      imageSrc: "/images/car1.jpg",
      name: "Samochód sportowy",
      dateAdded: "2025-05-17",
      spec: { silnik: "2.0 turbo", moc: "300KM" },
      price: 75000,
    },
    {
      id: "2",
      imageSrc: "/images/laptop.jpg",
      name: "Laptop gamingowy",
      dateAdded: "2025-05-15",
      spec: { RAM: "16GB", GPU: "RTX 3060" },
      price: 6500,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 gap-6">
      <div className="w-full lg:w-1/4">
        <UserPanelNav />
      </div>
      <div className="w-full lg:w-3/4 space-y-6 p-4 flex flex-wrap gap-3">
        {ads.map((ad) => (
          <Announcement
            key={ad.id}
            offer={{
              _id: ad.id,
              title: ad.name,
              images: [ad.imageSrc],
              createdAt: ad.dateAdded,
              specification: ad.spec,
              price: ad.price,
              userId: ad.id,
            }}
            category={null}
          />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
