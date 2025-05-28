import React from "react";
import { useLocation } from "react-router-dom";
import { useAllFilters } from "../hooks/filters/useFilters";
import { FiltersSidebar } from "../component/offerSearchComponent/FiltersSidebar";
import { OfferList } from "../component/offerSearchComponent/OfferList";

const MOCK_OFFERS = [
  {
    id: 1,
    name: "Kondzix",
    category: "Komputery",
    processor: "Intel",
    gpuBrand: "NVIDIA GeForce",
    gpuModel: "RTX 3080",
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
    gpuBrand: "AMD Radeon",
    gpuModel: "RX 6800 XT",
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
    brand: "ASUS",
    processor: "Intel",
    gpuBrand: "Intel Arc",
    gpuModel: "A770",
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
    gpuBrand: "NVIDIA GeForce",
    gpuModel: "RTX 3070",
    ram: "64 GB",
    disk: "HDD",
    screenSize: '17.3"',
    power: "Poniżej 500W",
    date: "2025-04-27",
    price: 5235.95,
    state: "Używany",
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
