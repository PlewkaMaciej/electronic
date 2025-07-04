import React from "react";
import { useNavigate } from "react-router-dom";

const formatDate = (date: string) => {
  const d = new Date(date);
  const day = ("0" + d.getDate()).slice(-2);
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

interface AnnouncementProps {
  offer: any;
  category: string | null;
}

const Announcement: React.FC<AnnouncementProps> = ({ offer, category }) => {
  const navigate = useNavigate(); // <<< hook wewnątrz komponentu

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Like button clicked");
  };

  const handleRedirect = () => {
    navigate(`/Product/${offer._id}`);
  };

  return (
    <div
      className="bg-white mt-4 p-6 rounded-2xl shadow-lg hover:shadow-xl transition 
                 w-full sm:w-[45%] md:w-[70%] lg:w-[50%] xl:w-[34%] cursor-pointer"
      onClick={handleRedirect} // <<< teraz przekierowujemy na produkt
    >
      <div className="w-full aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={offer.images[0]}
          alt={offer.title}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      <h4 className="font-semibold text-2xl mb-3 pt-2">{offer.title}</h4>
      <p className="text-lg text-gray-500 mb-2">
        Dodano: {formatDate(offer.createdAt)}
      </p>
      <p className="text-lg text-gray-500 mb-2">Kategoria: {category}</p>

      <ul className="text-lg text-gray-600 mb-4">
        {category === "Komputery stacjonarne" && (
          <>
            <li>Procesor: {offer.specification?.processorModel}</li>
            <li>RAM: {offer.specification?.ram} GB</li>
            <li>
              Dysk: {offer.specification?.storageSize} GB
              {offer.specification?.storageType}
            </li>
            <li>GPU: {offer.specification?.gpuModel || "Brak danych"}</li>
          </>
        )}
        {category === "Laptopy" && (
          <>
            <li>Marka: {offer.specification?.brand}</li>
            <li>Procesor: {offer.specification?.processorModel}</li>
            <li>RAM: {offer.specification?.ram} GB</li>
            <li>
              Dysk: {offer.specification?.storageSize} GB
              {offer.specification?.storageType}
            </li>
            <li>Ekran: {offer.specification?.screenSize}"</li>
          </>
        )}
        {category === "Telefony" && (
          <>
            <li>Marka: {offer.specification?.brand}</li>
            <li>System: {offer.specification?.os}</li>
            <li>Pamięć: {offer.specification?.storage} GB</li>
            <li>RAM: {offer.specification?.ram} GB</li>
          </>
        )}
      </ul>

      <div className="flex justify-between items-center mt-4">
        <p className="text-2xl font-bold text-indigo-600">{offer.price} zł</p>
        <button
          onClick={handleLike}
          className="text-gray-400 hover:text-red-500 text-2xl"
        >
          ♡
        </button>
      </div>
    </div>
  );
};

export default Announcement;
