import React from "react";
import Carousel from "../component/Items/Carousel";

const Homepage: React.FC = () => {
  const trustedSellers = Array.from({ length: 10 }, (_, index) => ({
    name: `Sprzedawca ${index + 1}`,
    specification: `Specyfikacja produktu ${index + 1}`,
    imageSrc: `https://picsum.photos/200/300?random=${index + 10}`,
  }));

  const highlightedAds = Array.from({ length: 10 }, (_, index) => ({
    name: `Produkt ${index + 1}`,
    imageSrc: `https://picsum.photos/200/300?random=${index + 20}`,
    price: `${(Math.random() * 1000 + 100).toFixed(2)} PLN`,
    date: new Date().toLocaleDateString(),
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
