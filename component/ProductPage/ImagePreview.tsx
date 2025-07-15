// src/components/ProductPage/ImagePreview.tsx
import React from "react";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  current: number;
  onClose: () => void;
  onChange: (i: number) => void;
}

const ImagePreview: React.FC<Props> = ({
  images,
  current,
  onClose,
  onChange,
}) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => onChange((current + 1) % images.length),
    onSwipedRight: () =>
      onChange(current === 0 ? images.length - 1 : current - 1),
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      onClick={onClose}
      className="
        fixed inset-0 bg-black bg-opacity-70 z-50 
        overflow-auto flex flex-col items-center justify-center p-4
      "
    >
      {/* main image + arrows */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-3xl max-h-[80vh] bg-gray-900 rounded-lg 
          shadow-lg flex items-center justify-center overflow-visible
        "
      >
        <button
          onClick={() =>
            onChange(current === 0 ? images.length - 1 : current - 1)
          }
          className="
            absolute left-2 md:-left-8 top-1/2 transform -translate-y-1/2
            text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 
            rounded-full p-2 z-10 cursor-pointer
          "
        >
          <ChevronLeft size={32} />
        </button>

        <img
          src={images[current]}
          alt={`preview ${current + 1}`}
          className="max-w-full max-h-[80vh] object-contain"
        />

        <button
          onClick={() => onChange((current + 1) % images.length)}
          className="
            absolute right-2 md:-right-8 top-1/2 transform -translate-y-1/2
            text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 
            rounded-full p-2 z-10 cursor-pointer
          "
        >
          <ChevronRight size={32} />
        </button>

        <button
          onClick={onClose}
          className="
            absolute top-3 right-3 text-white bg-gray-800 bg-opacity-70 
            hover:bg-opacity-90 rounded-full w-10 h-10 flex items-center 
            justify-center cursor-pointer hover:scale-110 transition-transform
          "
        >
          ✕
        </button>
      </div>

      {/* thumbnails */}
      <div
        className="
          mt-4 w-full 
          overflow-x-auto md:overflow-x-visible overflow-y-hidden
        "
      >
        <div
          className="
            flex gap-3 flex-nowrap items-center justify-center px-4
          "
        >
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              onClick={(e) => {
                e.stopPropagation();
                onChange(idx);
              }}
              className={`
                w-24 h-24 object-cover rounded-md cursor-pointer 
                flex-shrink-0 transition-transform duration-200
                ${
                  idx === current
                    ? "ring-4 ring-blue-500 scale-110"
                    : "opacity-60 hover:opacity-100 hover:scale-105"
                }
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
