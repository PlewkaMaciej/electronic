import React, { useState } from "react";

import UserPanelNav from "./Items/UserPanelNav";
import RectangleAd from "../../component/Items/RectangleAd";
const Favorites = () => {
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
    { label: "Aktywne", href: "/my-ads?active" },
    { label: "Oczekujące", href: "/my-ads?pending" },
    { label: "Robocze", href: "/my-ads?inWork" },
    { label: "Obserwowane", href: "/my-ads?suspended" },
    { label: "Portfel", href: "/my-ads?private" },
    { label: "Powiadomienia", href: "/my-ads?ended" },
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
      <UserPanelNav items={userLinks}  matchBy="path"/>
      <UserPanelNav items={userAdsLinks} matchBy="search" />
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

export default Favorites;
