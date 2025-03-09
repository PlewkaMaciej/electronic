import React from "react";
import Carousel from "../component/Items/Carousel";

const CarouselWrapper: React.FC = () => {
  const items = Array.from({ length: 15 }, (_, index) => ({
    name: `Losowy Produkt ${index + 1}`,
    specification: `Przykładowa specyfikacja produktu ${index + 1}`,
    imageSrc: `https://picsum.photos/200/300?random=${index + 10}`,
  }));

  return (
    <div className="container mx-auto py-8">
      <Carousel title="Polecane Produkty" items={items} />
    </div>
  );
};

export default CarouselWrapper;
