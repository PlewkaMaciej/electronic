import { useLocation } from "react-router-dom";
// import komp from "../../client/img/komp.jpg";

import ComputerFilters, {
  filterComputerOffers,
  Offer as ComputerOffer,
  useComputerFilters,
} from "../component/offerSearchComponent/ComputerFilters";
const MOCK_OFFERS = [
  {
    id: 1,
    name: "Komputer Gamingowy RTX 3060",
    category: "Komputery",
    processor: "Intel",
    gpu: "NVIDIA GeForce",
    ram: "16 GB",
    disk: "SSD M.2",
    power: "700 - 999W",
    date: "2024-11-10",
    price: 5999.99,
    state: "Nowy",
  },
  {
    id: 2,
    name: "PC do biura Ryzen 5",
    category: "Komputery",
    processor: "AMD",
    gpu: "AMD Radeon",
    ram: "8 GB",
    disk: "SSD SATA",
    power: "500 - 699W",
    date: "2024-10-15",
    price: 3100,
    state: "Używany",
  },
  {
    id: 3,
    name: "Laptop ASUS OLED",
    category: "Laptopy",
    processor: "Intel",
    gpu: "Intel Arc",
    ram: "16 GB",
    disk: "SSD M.2",
    power: "Poniżej 500W",
    date: "2024-10-25",
    price: 4499.0,
    state: "Nowy",
  },
  {
    id: 4,
    name: "Lenovo Ultra 255",
    category: "Komputery",
    processor: "AMD",
    gpu: "Intel Arc",
    ram: "16 GB",
    disk: "SSD M.2",
    power: "900 - 1200W",
    date: "2025-03-26",
    price: 11272.43,
    state: "Nowy",
  },
  {
    id: 5,
    name: "ASUS Tower 875",
    category: "Komputery",
    processor: "AMD",
    gpu: "Intel Arc",
    ram: "32 GB",
    disk: "HDD",
    power: "900 - 1200W",
    date: "2025-04-17",
    price: 11289.19,
    state: "Używany",
  },
  {
    id: 6,
    name: "Alienware R8 497",
    category: "Laptopy",
    processor: "Intel",
    gpu: "NVIDIA GeForce",
    ram: "64 GB",
    disk: "HDD",
    power: "Poniżej 500W",
    date: "2025-04-27",
    price: 5235.95,
    state: "Używany",
  },
  {
    id: 7,
    name: "MSI Stealth 427",
    category: "Laptopy",
    processor: "AMD",
    gpu: "AMD Radeon",
    ram: "64 GB",
    disk: "SSD SATA",
    power: "700 - 999W",
    date: "2025-03-25",
    price: 8110.27,
    state: "Nowy",
  },
  {
    id: 8,
    name: "PC Gaming X 148",
    category: "Komputery",
    processor: "Intel",
    gpu: "NVIDIA Quadro",
    ram: "32 GB",
    disk: "HDD",
    power: "900 - 1200W",
    date: "2025-03-20",
    price: 5097.05,
    state: "Używany",
  },
];
export default function OfferSearch() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  const {
    filters: computerFilters,
    setFilters: setComputerFilters,
    handleMultiSelect: handleComputerMultiSelect,
  } = useComputerFilters();

  const filteredOffers =
    category === "Komputery"
      ? filterComputerOffers(MOCK_OFFERS, computerFilters, category)
      : [];

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Wyniki wyszukiwania: {category}
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4 bg-white rounded-xl p-4 shadow space-y-4">
          <h3 className="text-xl font-semibold">Filtry</h3>

          {category === "Komputery" && (
            <ComputerFilters
              filters={computerFilters}
              setFilters={setComputerFilters}
              handleMultiSelect={handleComputerMultiSelect}
            />
          )}
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">
              Znaleziono {filteredOffers.length} ogłoszeń
            </span>
            <select className="border rounded p-2 text-sm">
              <option>Sortuj: Domyślnie</option>
              <option>Cena rosnąco</option>
              <option>Cena malejąco</option>
              <option>Nowe ogłoszenia</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition relative"
              >
                <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={komp}
                    alt={offer.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <h4 className="font-semibold text-lg mb-1">{offer.name}</h4>
                <p className="text-sm text-gray-500 mb-1">
                  Dodano: {offer.date}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Stan: {offer.state}
                </p>
                <ul className="text-sm text-gray-600 mb-2">
                  <li>Procesor: {offer.processor}</li>
                  <li>GPU: {offer.gpu}</li>
                  <li>RAM: {offer.ram}</li>
                  <li>Dysk: {offer.disk}</li>
                  <li>Zasilacz: {offer.power}</li>
                </ul>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xl font-bold text-indigo-600">
                    {offer.price.toLocaleString("pl-PL", {
                      style: "currency",
                      currency: "PLN",
                    })}
                  </p>
                  <button className="text-gray-400 hover:text-red-500 text-xl">
                    ♡
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
