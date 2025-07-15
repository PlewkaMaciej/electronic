// src/components/Announcement.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { getLabel } from "../../utils/fieldLabels";

const formatDate = (date: string) => {
  const d = new Date(date);
  const day = ("0" + d.getDate()).slice(-2);
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

interface AnnouncementProps {
  offer: {
    _id: string;
    title: string;
    images: string[];
    createdAt: string;
    specification?: Record<string, any>;
    price: number;
  };
  category: string | null;
  onLike?: (offerId: string) => void;
}

const Announcement: React.FC<AnnouncementProps> = ({
  offer,
  category,
  onLike,
}) => {
  const navigate = useNavigate();
  const handleRedirect = () => navigate(`/Product/${offer._id}`);
  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onLike && onLike(offer._id);
  };

  return (
    <div
      className="bg-white mt-4 p-6 rounded-2xl shadow-lg hover:shadow-xl transition 
                 w-full sm:w-[45%] md:w-[70%] lg:w-[50%] xl:w-[34%] cursor-pointer"
      onClick={handleRedirect}
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

      {/* Renderujemy wszystkie pola specyfikacji dynamicznie: */}
      <ul className="text-lg text-gray-600 mb-4">
        {offer.specification &&
          Object.entries(offer.specification).map(([key, val]) => (
            <li key={key}>
              <b>{getLabel(key)}:</b> {String(val)}
            </li>
          ))}
      </ul>

      <div className="flex justify-between items-center mt-4">
        <p className="text-2xl font-bold text-indigo-600">{offer.price} zł</p>
        {onLike && (
          <button
            onClick={handleLike}
            className="text-gray-400 hover:text-red-500 text-2xl"
            aria-label="Lubię to"
          >
            ♡
          </button>
        )}
      </div>
    </div>
  );
};

export default Announcement;
