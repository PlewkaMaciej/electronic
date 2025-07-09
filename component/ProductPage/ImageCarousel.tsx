import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";

interface Props {
  images: string[];
  onPreviewOpen: () => void;
}

const ImageCarousel: React.FC<Props> = ({ images, onPreviewOpen }) => {
  const [current, setCurrent] = useState(0);
  const [anim, setAnim] = useState<"" | "slideInFromLeft" | "slideInFromRight">(
    ""
  );

  const change = (dir: "next" | "prev") => {
    setAnim(dir === "next" ? "slideInFromRight" : "slideInFromLeft");
    setCurrent((c) =>
      dir === "next"
        ? (c + 1) % images.length
        : c === 0
        ? images.length - 1
        : c - 1
    );
  };

  useEffect(() => {
    if (anim) {
      const t = setTimeout(() => setAnim(""), 300);
      return () => clearTimeout(t);
    }
  }, [current]);

  const swipe = useSwipeable({
    onSwipedLeft: () => change("next"),
    onSwipedRight: () => change("prev"),
    trackMouse: true,
  });

  const onThumbClick = (i: number) => {
    setAnim(i > current ? "slideInFromRight" : "slideInFromLeft");
    setCurrent(i);
  };

  return (
    <div className="relative flex flex-col items-center bg-white rounded-lg p-4 max-w-md mx-auto lg:max-w-full lg:w-[70%]">
      <div
        {...swipe}
        className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6 cursor-pointer w-full"
        onClick={onPreviewOpen}
      >
        <img
          src={images[current]}
          alt={`zdjęcie ${current + 1}`}
          className={`w-full h-[300px] md:h-[600px] object-cover rounded-xl shadow-md transition-transform duration-300 ${anim}`}
        />
      </div>

      <div className="relative w-full mt-4 flex items-center justify-center gap-4 flex-wrap">
        <button
          onClick={() => change("prev")}
          className="hidden sm:flex bg-[#006F91] text-white p-2 rounded-full shadow-md hover:bg-[#00597A] transition-all duration-300 transform hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex flex-wrap gap-4 justify-center">
          {images.map((u, i) => (
            <img
              key={i}
              src={u}
              onClick={() => onThumbClick(i)}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-transform duration-300 transform ${
                i === current
                  ? "scale-110 border-2 border-[#006F91] opacity-90"
                  : "opacity-50 hover:scale-105"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => change("next")}
          className="hidden sm:flex bg-[#006F91] text-white p-2 rounded-full shadow-md hover:bg-[#00597A] transition-all duration-300 transform hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
