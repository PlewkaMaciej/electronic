// src/Homepage.tsx
import React, { useEffect } from "react";
import Carousel from "../component/Items/Carousel";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

const Homepage: React.FC = () => {
  // 1) Odczyt tokenu z localStorage
  const token = localStorage.getItem("accessToken");

  // 2) Pobranie usera ze stanu Redux
  const user = useSelector((state: RootState) => state.auth.user);

  // 3) Logowanie w konsoli
  useEffect(() => {
    console.log("🔑 JWT token:", token);
    console.log("👤 Redux user:", user);
  }, [token, user]);

  const trustedSellers = Array.from({ length: 10 }, (_, index) => ({
    name: `Sprzedawca ${index + 1}`,
    specification: `Specyfikacja produktu ${index + 1}`,
    imageSrc: `https://picsum.photos/200/300?random=${index + 10}`,
    id: index,
  }));

  const highlightedAds = Array.from({ length: 10 }, (_, index) => ({
    name: `Produkt ${index + 1}`,
    imageSrc: `https://picsum.photos/200/300?random=${index + 20}`,
    price: `${(Math.random() * 1000 + 100).toFixed(2)} PLN`,
    date: new Date().toLocaleDateString(),
    id: index,
  }));

  return (
    <div className="container mx-auto py-8 flex flex-col gap-8">
      <Carousel
        title="Zaufani Sprzedawcy"
        items={trustedSellers}
        variant="trusted"
      />
      <Carousel
        title="Wyróżnione Ogłoszenia"
        items={highlightedAds}
        variant="highlighted"
      />
    </div>
  );
};

export default Homepage;
