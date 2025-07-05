import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { useSingleAnnouncement } from "../hooks/useGetSingleAnn";

const formatPrice = (price: number) => {
  const [integerPart, decimalPart] = price.toFixed(2).split(".");
  return (
    <span>
      {integerPart},<span className="text-sm">{decimalPart}</span> zł
    </span>
  );
};

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useSingleAnnouncement(id as string);

  const [currentImage, setCurrentImage] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [imageAnimation, setImageAnimation] = useState<string>("");

  // Tymczasowy zestaw zdjęć jeśli product.images nie istnieje
  const images =
    product?.images && product.images.length > 0
      ? product.images
      : [
          "https://picsum.photos/400/300?random=1",
          "https://picsum.photos/400/300?random=2",
          "https://picsum.photos/400/300?random=3",
        ];

  const handleImageChange = (direction: "next" | "prev") => {
    if (direction === "next") {
      setImageAnimation("slideInFromRight");
      setCurrentImage((prev) => (prev + 1) % images.length);
    } else {
      setImageAnimation("slideInFromLeft");
      setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  useEffect(() => {
    if (imageAnimation) {
      const timeout = setTimeout(() => setImageAnimation(""), 300);
      return () => clearTimeout(timeout);
    }
  }, [currentImage, imageAnimation]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleImageChange("next"),
    onSwipedRight: () => handleImageChange("prev"),
    trackMouse: true,
  });

  const handleImageClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (index > currentImage) {
      setImageAnimation("slideInFromRight");
    } else if (index < currentImage) {
      setImageAnimation("slideInFromLeft");
    }
    setCurrentImage(index);
  };

  if (isLoading || !product) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>Ładowanie produktu...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Mobile view header + buttons */}
      <div className="block lg:hidden mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          {product.title}
        </h1>
        <p className="text-lg font-semibold text-[#006F91] mb-4">
          {formatPrice(product.price)}
        </p>
        <div className="flex flex-col gap-3">
          <button className="bg-[#006F91] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#00597A] transition-all duration-300 transform hover:scale-105">
            Kup teraz
          </button>
          <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105">
            Zaproponuj cenę
          </button>
          <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105">
            Wyślij wiadomość
          </button>
        </div>
      </div>

      {/* Main content layout */}
      <div className="flex flex-col lg:flex-row gap-6 border border-gray-200 p-6 rounded-2xl shadow-xl bg-white">
        {/* Left side - images */}
        <div className="relative flex flex-col items-center bg-white rounded-lg p-4 max-w-md mx-auto lg:max-w-full lg:w-[70%]">
          <div
            {...swipeHandlers}
            className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6 cursor-pointer w-full"
            onClick={() => setIsPreviewOpen(true)}
          >
            <img
              src={images[currentImage]}
              alt={`${product.title} - zdjęcie ${currentImage + 1}`}
              className={`w-full h-[300px] md:h-[600px] object-cover rounded-xl shadow-md transition-transform duration-300 ${imageAnimation}`}
            />
          </div>

          <div className="relative w-full mt-4 flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => handleImageChange("prev")}
              className="hidden sm:flex bg-[#006F91] text-white p-2 rounded-full shadow-md hover:bg-[#00597A] transition-all duration-300 transform hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex justify-center flex-wrap gap-4">
              {images.map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Miniatura ${idx + 1}`}
                  onClick={(e) => handleImageClick(idx, e)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-transform duration-300 transform ${
                    currentImage === idx
                      ? "scale-110 border-2 border-[#006F91] opacity-90"
                      : "opacity-50 hover:scale-105"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => handleImageChange("next")}
              className="hidden sm:flex bg-[#006F91] text-white p-2 rounded-full shadow-md hover:bg-[#00597A] transition-all duration-300 transform hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 w-full bg-gray-50 p-4 rounded-lg shadow-sm flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              <b>OPIS PRODUKTU</b>
            </h2>
            <p className="text-sm text-gray-700">{product.description}</p>
          </div>

          {/* Mobile view extra info */}
          <div className="block lg:hidden space-y-6 mt-6 w-full">
            {product.specification && (
              <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  <b>SPECYFIKACJA</b>
                </h3>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {Object.entries(product.specification).map(([key, value]) => (
                    <li key={key} className="font-bold">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                      {String(value)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right side - details and actions on desktop */}
        <div className="hidden lg:block lg:w-[30%] space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {product.title}
            </h1>
            <p className="text-xl font-semibold text-[#006F91] mb-4">
              {formatPrice(product.price)}
            </p>

            <div className="flex flex-col gap-3 mt-4">
              <button className="bg-[#006F91] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#00597A] transition-all duration-300">
                Kup teraz
              </button>
              <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all duration-300">
                Zaproponuj cenę
              </button>
              <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all duration-300">
                Wyślij wiadomość
              </button>
            </div>
          </div>

          {product.specification && (
            <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                <b>SPECYFIKACJA</b>
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {Object.entries(product.specification).map(([key, value]) => (
                  <li key={key} className="font-bold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                    {String(value)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {isPreviewOpen && (
        <div
          onClick={() => setIsPreviewOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          {...swipeHandlers}
        >
          <div
            className="relative w-full max-w-3xl max-h-[80vh] flex flex-col justify-center items-center bg-gray-900 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // żeby kliknięcie na obraz nie zamykało podglądu
          >
            <img
              src={images[currentImage]}
              alt="Podgląd"
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-3 right-3 text-white bg-gray-800 bg-opacity-70 hover:bg-opacity-90 transition-all rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-md"
              aria-label="Zamknij podgląd"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`Miniatura ${index + 1}`}
                className={`w-12 h-12 object-cover rounded-lg cursor-pointer transition-transform duration-300 transform ${
                  currentImage === index
                    ? "scale-110 border-2 border-[#006F91] opacity-90"
                    : "opacity-50 hover:scale-105"
                }`}
                onClick={(e: React.MouseEvent<HTMLImageElement>) =>
                  handleImageClick(index, e)
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
