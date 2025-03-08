import React from "react";

interface AnnouncementProps {
  name: string;
  specification: string;
  imageSrc: string;  // Add the image source prop
}

function Announcement({ name, specification, imageSrc }: AnnouncementProps) {
  return (
    <div className="w-[205px] h-[300px]  rounded-[10px] border-2 border-gray-500 relative flex flex-col items-center justify-center  shadow-lg bg-[#F0F1EC]">
      
      {/* Updated rectangle with wider dimensions, rounded corners, and shadow */}
      <div className="w-[80%] h-[120px] border-[0.5px] border-gray-500 rounded-lg mt-2 overflow-hidden shadow-md">
        <img src={imageSrc} alt={name} className="object-cover w-full h-full" />
      </div>

      <p className="text-lg font-bold text-gray-700 text-center">{name}</p>
      <p className="text-center text-sm mt-2 text-gray-600">{specification}</p>
      <button className="mt-3 px-4 py-2 bg-[#339FB8] text-white rounded-lg text-sm hover:bg-[#2A8CA1] shadow-md">
        Sprawdź ogłoszenia
      </button>
    </div>
  );
}

export default Announcement;
