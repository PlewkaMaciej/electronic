import React, { useState } from "react";

const Shipment: React.FC = () => {
  const [pickup, setPickup] = useState(false);
  const [shipping, setShipping] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Sposób dostawy</h2>

      <div className="space-y-6">
        {/* Odbiór osobisty */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Odbiór osobisty</label>
          <button
            onClick={() => setPickup(!pickup)}
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
              pickup ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                pickup ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>

        {/* Wysyłka */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Wysyłka</label>
          <button
            onClick={() => setShipping(!shipping)}
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
              shipping ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                shipping ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
