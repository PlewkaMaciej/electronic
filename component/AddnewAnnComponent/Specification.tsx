import React from "react";

const Specification: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Specyfikacja</h2>

      <div className="space-y-6">
        {/* Procesor */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Procesor</label>
          <div className="grid grid-cols-3 gap-4">
            <select className="p-2 border rounded-xl w-full">
              <option>Intel</option>
              <option>AMD</option>
            </select>
            <select className="p-2 border rounded-xl w-full">
              <option>i3/i5/i7/i9</option>
              <option>Ryzen 3/5/7/9</option>
            </select>
            <input type="text" placeholder="Model (np. i7-12700H)" className="p-2 border rounded-xl w-full" />
          </div>
        </div>

        {/* Karta graficzna */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Karta graficzna</label>
          <div className="grid grid-cols-3 gap-4">
            <select className="p-2 border rounded-xl w-full">
              <option>NVIDIA</option>
              <option>AMD</option>
              <option>Intel</option>
            </select>
            <select className="p-2 border rounded-xl w-full">
              <option>RTX 30xx</option>
              <option>RX 6000</option>
            </select>
            <input type="text" placeholder="Model (np. RTX 3060)" className="p-2 border rounded-xl w-full" />
          </div>
        </div>

        {/* RAM */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Pamięć RAM</label>
          <div className="grid grid-cols-3 gap-4">
            <input type="text" placeholder="Producent" className="p-2 border rounded-xl w-full" />
            <select className="p-2 border rounded-xl w-full">
              <option>DDR4</option>
              <option>DDR5</option>
            </select>
            <input type="text" placeholder="Pojemność (np. 16 GB)" className="p-2 border rounded-xl w-full" />
          </div>
        </div>

        {/* Zasilacz */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Zasilacz</label>
          <div className="grid grid-cols-3 gap-4">
            <input type="text" placeholder="Producent" className="p-2 border rounded-xl w-full" />
            <select className="p-2 border rounded-xl w-full">
              <option>80+ Bronze</option>
              <option>80+ Silver</option>
              <option>80+ Gold</option>
            </select>
            <input type="text" placeholder="Moc (np. 650 W)" className="p-2 border rounded-xl w-full" />
          </div>
        </div>

        {/* Dysk */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Dysk</label>
          <div className="grid grid-cols-3 gap-4">
            <input type="text" placeholder="Producent" className="p-2 border rounded-xl w-full" />
            <select className="p-2 border rounded-xl w-full">
              <option>SSD</option>
              <option>HDD</option>
              <option>NVMe</option>
            </select>
            <input type="text" placeholder="Pojemność (np. 1 TB)" className="p-2 border rounded-xl w-full" />
          </div>
        </div>

        {/* Obudowa */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Obudowa</label>
          <div className="grid grid-cols-3 gap-4">
            <input type="text" placeholder="Producent" className="p-2 border rounded-xl w-full" />
            <select className="p-2 border rounded-xl w-full">
              <option>ATX</option>
              <option>MicroATX</option>
              <option>Mini-ITX</option>
            </select>
            <input type="text" placeholder="Kolor (np. Czarny)" className="p-2 border rounded-xl w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specification;
