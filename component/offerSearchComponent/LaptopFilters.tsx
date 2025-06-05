import { useState } from "react";
import { FilterSection } from "./FilterSection";

export type Filters = {
  brand: string[];
  processor: string[];
  ram: string[];
  disk: string[];
  screenSize: string[];
  state: string[];
  priceMin: string;
  priceMax: string;
};

export type LaptopOffer = {
  id: number;
  name: string;
  category: string;
  brand: string;
  processor: string;
  ram: string;
  disk: string;
  screenSize: string;
  state: string;
  price: number;
};

export const defaultFilters: Filters = {
  brand: [],
  processor: [],
  ram: [],
  disk: [],
  screenSize: [],
  state: [],
  priceMin: "",
  priceMax: "",
};

export function useFilters() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const handleMultiSelect = (key: keyof Filters, value: string) => {
    setFilters((prev) => {
      const current = prev[key] as string[];
      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  return { filters, setFilters, handleMultiSelect };
}

export function filterOffers(
  offers: LaptopOffer[],
  filters: Filters,
  category: string | null
): LaptopOffer[] {
  const min = parseFloat(filters.priceMin) || 0;
  const max = parseFloat(filters.priceMax) || Infinity;

  return offers.filter((offer) => {
    return (
      offer.category === category &&
      (filters.brand.length === 0 || filters.brand.includes(offer.brand)) &&
      (filters.processor.length === 0 ||
        filters.processor.includes(offer.processor)) &&
      (filters.ram.length === 0 || filters.ram.includes(offer.ram)) &&
      (filters.disk.length === 0 || filters.disk.includes(offer.disk)) &&
      (filters.screenSize.length === 0 ||
        filters.screenSize.includes(offer.screenSize)) &&
      (filters.state.length === 0 || filters.state.includes(offer.state)) &&
      offer.price >= min &&
      offer.price <= max
    );
  });
}

type Props = {
  filters: Filters;
  handleMultiSelect: (key: keyof Filters, value: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export default function LaptopFilters({
  filters,
  handleMultiSelect,
  setFilters,
}: Props) {
  return (
    <>
      <FilterSection
        title="Marka"
        options={["Dell", "HP", "Lenovo", "Apple", "Asus", "Acer"]}
        selected={filters.brand}
        onToggle={(value) => handleMultiSelect("brand", value)}
      />
      <FilterSection
        title="Procesor"
        options={["Intel", "AMD", "Apple M1", "Apple M2"]}
        selected={filters.processor}
        onToggle={(value) => handleMultiSelect("processor", value)}
      />
      <FilterSection
        title="Pamięć RAM"
        options={["4 GB", "8 GB", "16 GB", "32 GB"]}
        selected={filters.ram}
        onToggle={(value) => handleMultiSelect("ram", value)}
      />
      <FilterSection
        title="Dysk"
        options={["SSD", "HDD", "SSD + HDD"]}
        selected={filters.disk}
        onToggle={(value) => handleMultiSelect("disk", value)}
      />
      <FilterSection
        title="Rozmiar ekranu"
        options={['13"', '14"', '15.6"', '17"']}
        selected={filters.screenSize}
        onToggle={(value) => handleMultiSelect("screenSize", value)}
      />
      <FilterSection
        title="Stan"
        options={["Nowy", "Używany"]}
        selected={filters.state}
        onToggle={(value) => handleMultiSelect("state", value)}
      />
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Cena (zł)</h4>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="od"
            value={filters.priceMin}
            onChange={(e) =>
              setFilters((f) => ({ ...f, priceMin: e.target.value }))
            }
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="do"
            value={filters.priceMax}
            onChange={(e) =>
              setFilters((f) => ({ ...f, priceMax: e.target.value }))
            }
            className="w-1/2 p-2 border rounded"
          />
        </div>
      </div>
    </>
  );
}
