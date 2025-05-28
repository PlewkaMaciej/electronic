import React, { useState } from "react";

const Description: React.FC = () => {
  const [description, setDescription] = useState("");

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Opis ogłoszenia</h2>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Szczegóły dotyczące sprzętu
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Wprowadź szczegółowy opis sprzętu, stan, uwagi itd."
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
        />
      </div>
    </div>
  );
};

export default Description;
