// src/components/ProductPage/SellerCard.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserById } from "../../hooks/useUserById";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import ReactCountryFlag from "react-country-flag";
import userphoto from "../../img/photo.png";

interface Props {
  userId: string;
}

const SellerCard: React.FC<Props> = ({ userId }) => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useUserById(userId);
  const [showPhone, setShowPhone] = useState(false);

  if (isLoading) return <div>Ładowanie sprzedawcy…</div>;
  if (!user) return <div>Sprzedawca nie znaleziony</div>;

  // placeholderowe rating/reviews
  const rating = 4.84;
  const reviews = 121;

  // Parsujemy string z backendu na number, a potem na Date
  const raw = (user as any).joiningDate;
  const ms = parseInt(raw, 10);
  const joinedDate = !isNaN(ms) ? new Date(ms) : null;
  const formatted = joinedDate
    ? format(joinedDate, "dd.MM.yyyy", { locale: pl })
    : "–";

  const stars = Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={`inline-block text-yellow-400 ${
        i < Math.round(rating) ? "" : "opacity-40"
      }`}
    >
      ★
    </span>
  ));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 max-w-6xl mx-auto">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={userphoto}
          alt={user.firstName}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-lg flex items-center gap-2 break-all">
            {user.firstName}
            <ReactCountryFlag
              countryCode="PL"
              svg
              style={{ width: "1.2em", height: "1.2em" }}
              title="Polska"
            />
          </p>

          <div className="flex items-center mt-1">
            {stars}
            <span className="ml-2 text-sm text-gray-600">
              {rating.toFixed(2)} ({reviews})
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Dołączył(a): {formatted}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => navigate(`/user/${userId}/ads`)}
          className="bg-[#006F91] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#00597A] transition-all duration-300"
        >
          Sprawdź więcej ogłoszeń
        </button>

        <button
          onClick={() => setShowPhone(true)}
          className="w-full py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5h2l.344 2.063A2 2 0 0 0 7.309 9H13a2 2 0 1 1 0 4H7.31a2 2 0 0 0-1.965 1.937L5 19H3m0-14h.01"
            />
          </svg>
          Wyświetl numer telefonu
        </button>

        {showPhone && (
          <p className="mt-2 text-center text-gray-700 font-medium">
            +48 {(user as any).phoneNumber || "–"}
          </p>
        )}
      </div>
    </div>
  );
};

export default SellerCard;
