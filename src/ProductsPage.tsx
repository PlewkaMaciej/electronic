import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";

const product = {
  id: 218636377,
  name: "Komputer do gier Ryzen 7 9800X3D, Radeon RX 6800 XT, 32GB RAM, 750W, M.2 2TB",
  price: "5999,99 zł",
  description:
    "Na sprzedaż komputer do gier mojego syna. Młody się nie uczy, więc pora sprzedać mu kompa. Zakupiony na morele w 2023r. Używany po 6-7 godzin dziennie. Bez problemu odpali wszystkie nowe gry z tego roku i posłuży przez następne kilka lat bez problemu.",
  sellerName: "Aleksander Richert",
  sellerRating: 4.84,
  sellerReviews: 121,
  sellerJoinDate: "25.11.2024",
  location: "Wejherowo, woj. Pomorskie",
  images: [
    "https://picsum.photos/400/300?random=1",
    "https://picsum.photos/400/300?random=2",
    "https://picsum.photos/400/300?random=3",
    "https://picsum.photos/400/300?random=4",
    "https://picsum.photos/400/300?random=5",
  ],
  specifications: [
    "Procesor: AMD Ryzen 7 9800X3D",
    "Karta graficzna: Radeon RX 6800 XT 16GB",
    "RAM: 32GB DDR5",
    "Zasilacz: 750W Platinum Plus",
    "Dysk (1): M.2 2TB",
    "Dysk (2): HDD 512GB",
    "System operacyjny: Brak",
  ],
};

const formatPrice = (price: string) => {
  const [integerPart, decimalPart] = price.split(",");
  return (
    <span>
      {integerPart},<span className="text-sm">{decimalPart}</span> zł
    </span>
  );
};

const ProductPage: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [imageAnimation, setImageAnimation] = useState<string>("");

  const handleImageChange = (direction: string) => {
    if (direction === "next") {
      setImageAnimation("slideInFromRight");
      setCurrentImage((prev) => (prev + 1) % product.images.length);
    } else {
      setImageAnimation("slideInFromLeft");
      setCurrentImage((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    setImageAnimation("");
  }, [currentImage]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleImageChange("next"),
    onSwipedRight: () => handleImageChange("prev"),
    trackMouse: true,
  });

  const handleImageClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage(index);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* mobile header*/}
      <div className="block lg:hidden mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h1>
        <p className="text-lg font-semibold text-green-600 mb-4">
          {formatPrice(product.price)}
        </p>
        <div className="flex flex-col gap-3">
          <button className="bg-[#339FB8] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#2b8fa6] transition-all duration-300 transform hover:scale-105">
            Kup teraz
          </button>
          <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105">
            Zaproponuj cenę
          </button>
          <button className="bg-gray-200 text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105">
            Wyślij wiadomość
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 border border-gray-200 p-6 rounded-2xl shadow-xl bg-white">
        {/* left column*/}
        <div className="relative flex flex-col items-center bg-white rounded-lg p-4 max-w-md mx-auto lg:max-w-full lg:w-[70%]">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className={`w-full h-[300px] md:h-[600px] object-cover rounded-xl shadow-md cursor-pointer transition-transform duration-500 ${imageAnimation} sm:w-full sm:h-[auto]`}
              onClick={() => setIsPreviewOpen(true)}
            />
          </div>

          <div className="relative w-full mt-4">
            <div className="flex items-center justify-center gap-4 w-full flex-wrap">
              <button
                onClick={() => handleImageChange("prev")}
                className="hidden sm:flex bg-[#339FB8] text-white p-2 rounded-full shadow-md hover:bg-[#2b8fa6] transition-all duration-300 transform hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex justify-center flex-wrap gap-4">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Miniatura ${index + 1}`}
                    onClick={(e) => handleImageClick(index, e)}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-transform duration-300 transform ${
                      currentImage === index
                        ? "scale-110 border-2 border-[#339FB8] opacity-90"
                        : "opacity-50 hover:scale-105"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => handleImageChange("next")}
                className="hidden sm:flex bg-[#339FB8] text-white p-2 rounded-full shadow-md hover:bg-[#2b8fa6] transition-all duration-300 transform hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* produdt description */}
          <div className="mt-6 w-full bg-gray-50 p-4 rounded-lg shadow-sm flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              <b>OPIS PRODUKTU</b>
            </h2>
            <p className="text-sm text-gray-700">{product.description}</p>
          </div>

          {/* specification section */}
          <div className="block lg:hidden space-y-6 mt-6 w-full">
            <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                <b>INFORMACJE O SPRZEDAJĄCYM</b>
              </h3>
              <p className="text-sm text-gray-700">
                Nazwa: <span className="font-bold">{product.sellerName}</span>
              </p>
              <p className="text-sm text-gray-700">
                Ocena: <span className="font-bold">{product.sellerRating}</span>{" "}
                ({product.sellerReviews} opinii)
              </p>
              <p className="text-sm text-gray-700">
                Dołączył:{" "}
                <span className="font-bold">{product.sellerJoinDate}</span>
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                <b>SPECYFIKACJA</b>
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="font-bold">
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                <b>LOKALIZACJA</b>
              </h3>
              <div className="w-full h-60 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 text-sm">
                Mapka z lokalizacją (tu można podpiąć API)
              </div>
            </div>
          </div>
        </div>

        {/* right column */}
        <div className="hidden lg:block lg:w-[30%] space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-xl font-semibold text-green-600 mb-4">
              {formatPrice(product.price)}
            </p>

            <div className="flex flex-col gap-3 mt-4">
              <button className="bg-[#339FB8] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#2b8fa6] transition-all duration-300">
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

          <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              <b>INFORMACJE O SPRZEDAJĄCYM</b>
            </h3>
            <p className="text-sm text-gray-700">
              Nazwa: <span className="font-bold">{product.sellerName}</span>
            </p>
            <p className="text-sm text-gray-700">
              Ocena: <span className="font-bold">{product.sellerRating}</span> (
              {product.sellerReviews} opinii)
            </p>
            <p className="text-sm text-gray-700">
              Dołączył:{" "}
              <span className="font-bold">{product.sellerJoinDate}</span>
            </p>
          </div>

          <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              <b>SPECYFIKACJA</b>
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {product.specifications.map((spec, index) => (
                <li key={index} className="font-bold">
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              <b>LOKALIZACJA</b>
            </h3>
            <div className="w-full h-60 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 text-sm">
              Mapka z lokalizacją (tu można podpiąć API)
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      {isPreviewOpen && (
        <div
          onClick={() => setIsPreviewOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
          {...swipeHandlers}
        >
          <div className="relative w-4/5 h-4/5 flex flex-col justify-center items-center">
            <img
              src={product.images[currentImage]}
              alt="Podgląd"
              className="w-full h-[1000px] sm:h-[1000px] object-cover rounded-lg shadow-lg modal-image"
            />
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-50 px-3 py-1 rounded-full cursor-pointer"
            >
              &times;
            </button>
          </div>
          {/* small photos in modal */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Miniatura ${index + 1}`}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer transition-transform duration-300 transform ${
                  currentImage === index
                    ? "scale-110 border-2 border-[#339FB8] opacity-90"
                    : "opacity-50 hover:scale-105"
                }`}
                onClick={(e) => handleImageClick(index, e)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
