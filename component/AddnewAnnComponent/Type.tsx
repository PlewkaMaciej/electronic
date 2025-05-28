import React, { useState } from "react";

const Type: React.FC = () => {
  const [offerType, setOfferType] = useState("Sprzedaż");
  const [pickupOnly, setPickupOnly] = useState(false);
  const [onlineSale, setOnlineSale] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Rodzaj ogłoszenia</h2>

      <div className="space-y-6">
        {/* Typ ogłoszenia */}
        <div>
          <label htmlFor="offerType" className="block text-sm font-medium text-gray-700 mb-1">
            Typ ogłoszenia
          </label>
          <select
            id="offerType"
            value={offerType}
            onChange={(e) => setOfferType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option>Sprzedaż</option>
            <option>Wynajem</option>
            <option>Zamiana</option>
            <option>Usługa</option>
            <option>Inne</option>
          </select>
        </div>

        {/* Odbiór osobisty */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Odbiór osobisty</label>
          <button
            onClick={() => setPickupOnly(!pickupOnly)}
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
              pickupOnly ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                pickupOnly ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>

        {/* Sprzedaż online */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Sprzedaż online</label>
          <button
            onClick={() => setOnlineSale(!onlineSale)}
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
              onlineSale ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                onlineSale ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Type;
