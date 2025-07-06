import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { useSingleAnnouncement } from "../hooks/useGetSingleAnn";
import { useCreateConversation } from "../hooks/useCreateConversation";

const formatPrice = (price: number) => {
  const [integerPart, decimalPart] = price.toFixed(2).split(".");
  return (
    <span>
      {integerPart},<span className="text-sm">{decimalPart}</span> zł
    </span>
  );
};

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: product, isLoading } = useSingleAnnouncement(id!);
  const { mutate: createConversation, isLoading: creatingConversation } =
    useCreateConversation();

  const [currentImage, setCurrentImage] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [imageAnimation, setImageAnimation] = useState("");

  const images = product?.images?.length
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

  const handleCreateConversation = () => {
    if (!product) return;

    createConversation(
      { recipientId: product.userId, productId: product._id },
      {
        onSuccess: (data) => {
          navigate(`/chat/${data.conversation._id}`);
        },
        onError: () => {
          alert("Nie udało się utworzyć konwersacji.");
        },
      }
    );
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
          <button
            onClick={handleCreateConversation}
            disabled={creatingConversation}
            className={`px-6 py-2 rounded-md shadow-md transition-all duration-300 transform ${
              creatingConversation
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {creatingConversation ? "Tworzenie..." : "Wyślij wiadomość"}
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
                  onClick={(
                    e: React.MouseEvent<HTMLImageElement, MouseEvent>
                  ) => handleImageClick(idx, e)}
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
              OPIS PRODUKTU
            </h2>
            <p className="text-sm text-gray-700">{product.description}</p>
          </div>

          <div className="block lg:hidden space-y-6 mt-6 w-full">
            {product.specification && (
              <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  SPECYFIKACJA
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

        <div className="hidden lg:block lg:w-[30%] space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {product.title}
            </h1>
            <p className="text-xl font-semibold text-[#006F91] mb-4">
              {formatPrice(product.price)}
            </p>
            <div className="flex flex-col gap-3">
              <button className="bg-[#006F91] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#00597A] transition-all duration-300 transform hover:scale-105">
                Kup teraz
              </button>
              <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105">
                Zaproponuj cenę
              </button>
              <button
                onClick={handleCreateConversation}
                disabled={creatingConversation}
                className={`px-6 py-2 rounded-md shadow-md transition-all duration-300 transform ${
                  creatingConversation
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {creatingConversation ? "Tworzenie..." : "Wyślij wiadomość"}
              </button>
            </div>
          </div>

          {product.specification && (
            <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                SPECYFIKACJA
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
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsPreviewOpen(false)}
        >
          <img
            src={images[currentImage]}
            alt={`Podgląd zdjęcia ${currentImage + 1}`}
            className="max-w-full max-h-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
