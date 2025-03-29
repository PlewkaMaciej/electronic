import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const ProductPage: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleImageChange = (direction: string) => {
    if (direction === "next") {
      setCurrentImage((prev) => (prev + 1) % product.images.length);
    } else {
      setCurrentImage((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Mobilny nagłówek i przyciski */}
      <div className="block lg:hidden mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h1>
        <p className="text-lg font-semibold text-green-600 mb-4">
          {product.price}
        </p>
        <div className="flex flex-col gap-3">
          <button className="bg-[#339FB8] text-white px-6 py-2 rounded-md shadow hover:bg-[#2b8fa6]">
            Kup teraz
          </button>
          <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md shadow hover:bg-gray-300">
            Zaproponuj cenę
          </button>
          <button className="bg-[#339FB8] text-white px-6 py-2 rounded-md shadow hover:bg-[#2b8fa6]">
            Wyślij wiadomość
          </button>
        </div>
      </div>

      {/* Ogłoszenie */}
      <div className="flex flex-col lg:flex-row gap-6 border border-gray-200 p-6 rounded-2xl shadow-xl bg-white">
        {/* Zdjęcia + opis + info (mobilka) */}
        <div className="relative flex flex-col items-center bg-white rounded-lg p-4 max-w-md mx-auto lg:max-w-full lg:w-1/2">
          {/* Główne zdjęcie */}
          <img
            src={product.images[currentImage]}
            alt={product.name}
            className="w-full h-[300px] md:h-[400px] object-cover rounded-xl shadow-md cursor-pointer"
            onClick={() => setIsPreviewOpen(true)}
          />

          {/* Miniatury */}
          <div className="relative w-full mt-4">
            <div className="flex items-center justify-center gap-4 w-full flex-wrap">
              <button
                onClick={() => handleImageChange("prev")}
                className="hidden sm:flex bg-[#339FB8] text-white p-2 rounded-full shadow"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex justify-center flex-wrap gap-4">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Miniatura ${index + 1}`}
                    onClick={() => setCurrentImage(index)}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-transform duration-300 ${
                      currentImage === index
                        ? "scale-110 border-2 border-[#339FB8] opacity-90"
                        : "opacity-50 hover:scale-105"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => handleImageChange("next")}
                className="hidden sm:flex bg-[#339FB8] text-white p-2 rounded-full shadow"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Opis */}
          <div className="mt-6 w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Opis produktu
            </h2>
            <p className="text-sm text-gray-700">{product.description}</p>
          </div>

          {/* Info/sprzedawca/specyfikacja/lokalizacja – tylko mobilka */}
          <div className="block lg:hidden space-y-6 mt-6 w-full">
            <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Informacje o sprzedającym
              </h3>
              <p className="text-sm text-gray-700">
                Nazwa: {product.sellerName}
              </p>
              <p className="text-sm text-gray-700">
                Ocena: {product.sellerRating} ({product.sellerReviews} opinii)
              </p>
              <p className="text-sm text-gray-700">
                Dołączył: {product.sellerJoinDate}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Specyfikacja
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {product.specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Lokalizacja
              </h3>
              <div className="w-full h-60 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 text-sm">
                Mapka z lokalizacją (tu można podpiąć API)
              </div>
            </div>
          </div>
        </div>

        {/* Szczegóły produktu na desktopie */}
        <div className="flex-1 space-y-6 hidden lg:block">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-xl font-semibold text-green-600 mb-4">
              {product.price}
            </p>
            <div className="space-x-4">
              <button className="bg-[#339FB8] text-white px-6 py-2 rounded-md shadow hover:bg-[#2b8fa6]">
                Kup teraz
              </button>
              <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md shadow hover:bg-gray-300">
                Zaproponuj cenę
              </button>
              <button className="bg-[#339FB8] text-white px-6 py-2 rounded-md shadow hover:bg-[#2b8fa6]">
                Wyślij wiadomość
              </button>
            </div>
          </div>

          {/* Info o sprzedającym */}
          <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Informacje o sprzedającym
            </h3>
            <p className="text-sm text-gray-700">Nazwa: {product.sellerName}</p>
            <p className="text-sm text-gray-700">
              Ocena: {product.sellerRating} ({product.sellerReviews} opinii)
            </p>
            <p className="text-sm text-gray-700">
              Dołączył: {product.sellerJoinDate}
            </p>
          </div>

          {/* Specyfikacja */}
          <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Specyfikacja
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {product.specifications.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>

          {/* Lokalizacja */}
          <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Lokalizacja
            </h3>
            <div className="w-full h-60 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 text-sm">
              Mapka z lokalizacją (tu można podpiąć API)
            </div>
          </div>
        </div>
      </div>

      {/* Modal zdjęcia */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <img
            src={product.images[currentImage]}
            alt="Podgląd"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
          <button
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-50 px-3 py-1 rounded-full"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
