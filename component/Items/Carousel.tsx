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
    <div className="w-full bg-[#F0F1EC] py-6 px-4 sm:px-10 relative border border-gray-300 rounded-xl shadow-lg overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {title}
      </h2>

      <div className="relative flex items-center">
        {/* Left Arrow - Hidden on small screens */}
        <button
          onClick={() => scroll(-340)}
          className="hidden sm:flex absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-lg z-10"
        >
          <ChevronLeft />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-4 sm:px-16 scroll-smooth scrollbar-hide whitespace-nowrap"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-[90%] sm:w-[260px]">
              <Announcement
                name={item.name}
                specification={item.specification}
                imageSrc={item.imageSrc}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow - Hidden on small screens */}
        <button
          onClick={() => scroll(340)}
          className="hidden sm:flex absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-lg z-10"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
