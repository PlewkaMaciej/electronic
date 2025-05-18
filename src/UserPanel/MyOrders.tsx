import React, { useState } from "react";

import UserPanelNav from "./Items/UserPanelNav";
import RectangleAd from "../../component/Items/RectangleAd";
const MyOrders = () => {
  const userLinks = [
    { label: "Moje ogłoszenia", href: "/my-ads" },
    { label: "Moje zamówienia", href: "/my-orders" },
    { label: "Czat", href: "/chat" },
    { label: "Obserwowane", href: "/favorites" },
    { label: "Portfel", href: "/wallet" },
    { label: "Powiadomienia", href: "/notifications" },
    { label: "Pomoc", href: "/help" },
  ];

  const userAdsLinks = [
    { label: "Aktywne", href: "/my-orders?active" },
    { label: "Oczekujące", href: "/my-orders?canceled" },
    { label: "Robocze", href: "/my-ads?completed" },
  ];
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
    <>
      <UserPanelNav items={userLinks} matchBy="path" />
      <UserPanelNav items={userAdsLinks} matchBy="search"/>
      <div className="space-y-6 p-6 lg:flex justify-center flex-wrap gap-3"  >
      {ads.map((ad, idx) => (
        <RectangleAd
          key={idx}
          imageSrc={ad.imageSrc}
          name={ad.name}
          dateAdded={ad.dateAdded}
          specification={ad.specification}
          price={ad.price}
        />
      ))}
    </div>
    </>
  );
};

export default MyOrders;
