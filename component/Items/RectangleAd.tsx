import React from "react";
interface RectangleAdProps {
  imageSrc: string;
  name: string;
  dateAdded: string;
  specification: string;
  price: string;
}

function RectangleAd({
  imageSrc,
  name,
  dateAdded,
  specification,
  price,
}: RectangleAdProps) {
  return (
    <div className="flex items-center w-full max-w-[850px] h-[160px] border border-gray-300 rounded-xl shadow-lg p-4 bg-white overflow-hidden">
      <div className="w-[130px] h-[130px] overflow-hidden rounded-lg border border-gray-300 shadow-sm">
        <img src={imageSrc} alt={name} className="object-cover w-full h-full" />
      </div>

      <div className="flex-2 px-4 flex flex-col justify-between h-full">
        <p className="text-base md:text-lg font-semibold text-gray-800">
          {name}
        </p>
        <p className="text-xs text-gray-500">{dateAdded}</p>
      </div>

      <div className="flex-1 px-4 max-w-full overflow-hidden">
        <p className="text-sm text-gray-700 font-medium">Specyfikacja:</p>
        <p className="text-sm text-gray-600 truncate">{specification}</p>
      </div>

      <div className="text-xl font-bold text-gray-900 px-4 bg-gray-100 rounded-lg p-2 shadow-md">
        {price} zł
      </div>
    </div>
  );
}

export default RectangleAd;
