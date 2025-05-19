import React from "react";
import { useLocation } from "react-router-dom";
import { useAllFilters } from "../hooks/filters/useFilters";
import { FiltersSidebar } from "../component/offerSearchComponent/FiltersSidebar";
import { OfferList } from "../component/offerSearchComponent/OfferList";

const MOCK_OFFERS = [
  // Komputery
  {
    id: 1,
    name: "Kondzix",
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
  // Laptopy
  {
    id: 3,
    name: "Laptop ASUS OLED",
    category: "Laptopy",
    brand: "ASUS",
    processor: "Intel",
    gpu: "Intel Arc",
    ram: "16 GB",
    disk: "SSD M.2",
    screenSize: '15.6"',
    power: "Poniżej 500W",
    date: "2024-10-25",
    price: 4499.0,
    state: "Nowy",
  },
  {
    id: 4,
    name: "Alienware R8 497",
    category: "Laptopy",
    brand: "Alienware",
    processor: "Intel",
    gpu: "NVIDIA GeForce",
    ram: "64 GB",
    disk: "HDD",
    screenSize: '17.3"',
    power: "Poniżej 500W",
    date: "2025-04-27",
    price: 5235.95,
    state: "Używany",
  },
  // Telefony
  {
    id: 5,
    name: "iPhone 14 Pro",
    category: "Telefony",
    brand: "Apple",
    os: "iOS",
    ram: "6 GB",
    storage: "128 GB",
    date: "2023-12-01",
    price: 4999,
    state: "Nowy",
  },
  {
    id: 6,
    name: "Samsung Galaxy S23",
    category: "Telefony",
    brand: "Samsung",
    os: "Android",
    ram: "8 GB",
    storage: "256 GB",
    date: "2024-02-15",
    price: 3999,
    state: "Nowy",
  },
  // Podzespoły i części
  {
    id: 7,
    name: "Karta graficzna RTX 3080",
    category: "Podzespoły i części",
    type: "Karta graficzna",
    compatibility: "NVIDIA",
    date: "2024-01-15",
    price: 4200,
    state: "Nowy",
  },
  // Fotografia
  {
    id: 8,
    name: "Canon EOS R6",
    category: "Fotografia",
    brand: "Canon",
    type: "Bezlusterkowiec",
    megapixels: "20 MP",
    date: "2024-02-20",
    price: 8500,
    state: "Nowy",
  },
  // Smartwatche
  {
    id: 9,
    name: "Apple Watch Series 8",
    category: "Smartwatche",
    brand: "Apple",
    os: "watchOS",
    features: "GPS",
    date: "2024-03-10",
    price: 2200,
    state: "Nowy",
  },
  // RTV
  {
    id: 10,
    name: 'Samsung QLED 55"',
    category: "RTV",
    brand: "Samsung",
    type: "Telewizor",
    resolution: "4K",
    date: "2024-04-15",
    price: 3500,
    state: "Nowy",
  },
  // AGD
  {
    id: 11,
    name: "Bosch Pralka Serie 6",
    category: "AGD",
    brand: "Bosch",
    type: "Pralka",
    energyClass: "A+++",
    date: "2024-05-12",
    price: 2300,
    state: "Nowy",
  },
  // Audio
  {
    id: 12,
    name: "Sony WH-1000XM5",
    category: "Audio",
    brand: "Sony",
    type: "Słuchawki",
    connectivity: "Bluetooth",
    date: "2024-06-01",
    price: 1500,
    state: "Nowy",
  },
  // Video
  {
    id: 13,
    name: "GoPro HERO 10",
    category: "Video",
    brand: "GoPro",
    type: "Kamera",
    resolution: "4K",
    date: "2024-07-22",
    price: 1800,
    state: "Nowy",
  },
];

const CATEGORY_KEYS = [
  "Komputery",
  "Laptopy",
  "Telefony",
  "Podzespoły i części",
  "Fotografia",
  "Smartwatche",
  "RTV",
  "AGD",
  "Audio",
  "Video",
] as const;

type CategoryKey = (typeof CATEGORY_KEYS)[number];

function isCategoryKey(value: string | null): value is CategoryKey {
  return value !== null && (CATEGORY_KEYS as readonly string[]).includes(value);
}

export default function OfferSearch() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryParam = params.get("category");

  const category: CategoryKey | null = isCategoryKey(categoryParam)
    ? categoryParam
    : null;

  const { filtersMap } = useAllFilters();

  const currentFilter = category ? filtersMap[category] : null;

  const filteredOffers = currentFilter
    ? currentFilter.filterFn(MOCK_OFFERS, currentFilter.filters, category)
    : [];

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Wyniki wyszukiwania: {category ?? "Brak kategorii"}
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4 bg-white rounded-xl p-4 shadow space-y-4">
          <h3 className="text-xl font-semibold">Filtry</h3>

          <FiltersSidebar category={category} filtersMap={filtersMap} />
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

          <OfferList filteredOffers={filteredOffers} category={category} />
        </main>
      </div>
    </div>
  );
}
