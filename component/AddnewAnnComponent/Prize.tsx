import React, { useState } from "react";

const Prize: React.FC = () => {
  const [price, setPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [negotiable, setNegotiable] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Cena</h2>

      <div className="space-y-6">
        {/* Cena główna */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Podaj cenę</label>
          <input
            type="number"
            placeholder="np. 2500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border rounded-xl w-full"
          />
        </div>

        {/* Komunikat o opłatach */}
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl border border-yellow-300">
          <p className="text-sm font-medium">
            <strong>Uwaga:</strong> przy sprzedaży online pobierzemy następujące opłaty:
          </p>
          <ul className="list-disc list-inside text-sm mt-2">
            <li>2% opłata transakcyjna</li>
            <li>3% opłata serwisowa</li>
          </ul>
        </div>

        {/* Przełącznik do negocjacji */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Cena do negocjacji</label>
          <button
            onClick={() => setNegotiable(!negotiable)}
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
              negotiable ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                negotiable ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>

        {/* Cena minimalna */}
        {negotiable && (
          <div>
            <label className="block font-medium mb-1 text-gray-700">Cena minimalna</label>
            <input
              type="number"
              placeholder="np. 2200"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="p-2 border rounded-xl w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Prize;
