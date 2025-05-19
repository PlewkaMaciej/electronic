// CategoryAnn.tsx
import React, { useState } from "react";

const CategoryAnn: React.FC = () => {
  const [category, setCategory] = useState("Laptop");
  const [title, setTitle] = useState("");

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto mb-6">
      <div className="grid grid-cols-2 gap-5 items-center">
        <label htmlFor="category" className="text-sm font-medium text-gray-700">
          Kategoria sprzętu
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option>Laptop</option>
          <option>Smartfon</option>
          <option>Tablet</option>
          <option>Monitor</option>
          <option>Inne</option>
        </select>

        <label htmlFor="title" className="text-sm font-medium text-gray-700">
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
  );
};

export default CategoryAnn;
