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
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[80vh] bg-gray-900 rounded-lg shadow-lg flex items-center justify-center"
      >
        <img
          src={images[current]}
          alt={`preview ${current + 1}`}
          className="max-w-full max-h-[70vh] object-contain rounded-lg"
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-gray-800 bg-opacity-70 hover:bg-opacity-90 rounded-full w-10 h-10 flex items-center justify-center"
        >
          ✕
        </button>
        <button
          onClick={() =>
            onChange(current === 0 ? images.length - 1 : current - 1)
          }
          className="absolute left-3 text-white p-2"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => onChange((current + 1) % images.length)}
          className="absolute right-3 text-white p-2"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
