import React from "react";
import { Search } from "lucide-react";

interface MobileSearchProps {
  placeholder?: string;
}

const MobileSearch: React.FC<MobileSearchProps> = ({ placeholder = "Czego dziś szukasz?" }) => (
  <div className="flex flex-grow items-center bg-white rounded-xl shadow p-2 border border-gray-300 hover:shadow-md transition">
    <input
      type="text"
      placeholder={placeholder}
      className="flex-grow px-3 py-2 bg-transparent outline-none placeholder-gray-500"
    />
    <button className="ml-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
      <Search className="w-5 h-5 text-gray-500" />
    </button>
  </div>
);

export default MobileSearch;