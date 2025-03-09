import React, { useRef } from "react";
import Announcement from "./Announcement";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AnnouncementProps {
  name: string;
  specification: string;
  imageSrc: string;
}

interface CarouselProps {
  title: string;
  items: AnnouncementProps[];
}

const Carousel: React.FC<CarouselProps> = ({ title, items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#F0F1EC] py-6 px-10 relative border border-gray-300 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {title}
      </h2>

      <button
        onClick={() => scroll(-340)}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-lg z-10"
      >
        <ChevronLeft />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-10 px-16 scroll-smooth"
      >
        {items.map((item, index) => (
          <div key={index} style={{ minWidth: "260px" }}>
            <Announcement
              name={item.name}
              specification={item.specification}
              imageSrc={item.imageSrc}
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll(340)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-lg z-10"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Carousel;
