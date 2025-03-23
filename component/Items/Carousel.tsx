import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  name: string;
  specification?: string;
  imageSrc: string;
  price?: string;
  date?: string;
}

interface CarouselProps {
  title: string;
  items: CarouselItem[];
  variant: "trusted" | "highlighted";
}

const Carousel: React.FC<CarouselProps> = ({ title, items, variant }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#F0F1EC] py-6 px-2 sm:px-4 relative border border-gray-300 rounded-xl shadow-lg overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {title}
      </h2>

      <div className="relative flex items-center justify-between px-0 sm:px-2">
        {/* Lewa strzałka */}
        <button
          onClick={() => scroll(-340)}
          className="hidden sm:flex bg-[#339FB8] hover:bg-opacity-90 text-white rounded-full p-2 shadow-lg z-10 cursor-pointer mx-2 sm:mx-4"
        >
          <ChevronLeft />
        </button>

        {/* Kontener przewijania */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-0 sm:px-2 scroll-smooth scrollbar-hide whitespace-nowrap cursor-grab w-full"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[90%] sm:w-[260px] bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={item.imageSrc}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md shadow-lg border border-gray-300"
              />
              <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>

              {variant === "trusted" ? (
                <>
                  <p className="text-sm text-gray-600">{item.specification}</p>
                  <button className="mt-2 w-full bg-[#339FB8] text-white py-1 rounded-md">
                    Sprawdź Produkty
                  </button>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold text-green-600">
                    {item.price}
                  </p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Prawa strzałka */}
        <button
          onClick={() => scroll(340)}
          className="hidden sm:flex bg-[#339FB8] hover:bg-opacity-90 text-white rounded-full p-2 shadow-lg z-10 cursor-pointer mx-2 sm:mx-4"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
