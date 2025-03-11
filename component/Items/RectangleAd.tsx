import React from "react";

interface RectangleAdProps {
  imageSrc: string;
  name: string;
  dateAdded: string;
  specification: string;
  price: string;
}

function RectangleAd({ imageSrc, name, dateAdded, specification, price }: RectangleAdProps) {
  return (
    <div className="flex items-start w-full max-w-[800px] h-[150px] border border-gray-500 rounded-lg shadow-md p-4 bg-[#F0F1EC] overflow-hidden">
      {/* Kolumna 1 - Zdjęcie */}
      <div className="w-[120px] h-[120px] overflow-hidden rounded-md border border-gray-400 shadow-sm">
        <img src={imageSrc} alt={name} className="object-cover w-full h-full" />
      </div>

      {/* Kolumna 2 - Nazwa i Data */}
      <div className="flex-2 px-4 max-w-full h-[120px] flex flex-col justify-between">
        <p className="text-sm md:text-base font-bold text-gray-700">{name}</p> {/* Smaller font size */}
        <p className="text-xs text-gray-500">{dateAdded}</p> {/* Align to the bottom */}
      </div>

      {/* Kolumna 3 - Specyfikacja */}
      <div className="flex-1 px-4 max-w-full overflow-y-auto">
        <p className="text-sm text-gray-600">Specyfikacja:</p>
        <p className="text-sm text-gray-600">{specification}</p>
      </div>

      {/* Kolumna 4 - Cena */}
      <div className="text-lg font-bold text-gray-900 px-4">
        {price} zł
      </div>
    </div>
  );
}

export default RectangleAd;
