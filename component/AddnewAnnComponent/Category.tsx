import React, { useState } from "react";

const CategoryAnn: React.FC = () => {
  const [category, setCategory] = useState("Laptop");
  const [title, setTitle] = useState("");

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Informacje ogólne
      </h2>

      <div className="space-y-6">
        {/* Kategoria sprzętu */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Kategoria sprzętu
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option>Komputery</option>
            <option>Laptop</option>
            <option>Smartfon</option>
            <option>Tablet</option>
            <option>Monitor</option>
            <option>Inne</option>
          </select>
        </div>

        {/* Tytuł ogłoszenia */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tytuł ogłoszenia
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Wpisz tytuł..."
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryAnn;
