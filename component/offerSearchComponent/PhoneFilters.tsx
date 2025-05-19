import { useState } from "react";
import { FilterSection } from "./FilterSection";

export type Filters = {
  brand: string[];
  os: string[];
  ram: string[];
  storage: string[];
  state: string[];
  priceMin: string;
  priceMax: string;
};

export type PhoneOffer = {
  id: number;
  name: string;
  category: string;
  brand: string;
  os: string;
  ram: string;
  storage: string;
  state: string;
  price: number;
};

export const defaultFilters: Filters = {
  brand: [],
  os: [],
  ram: [],
  storage: [],
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
  offers: PhoneOffer[],
  filters: Filters,
  category: string | null
): PhoneOffer[] {
  const min = parseFloat(filters.priceMin) || 0;
  const max = parseFloat(filters.priceMax) || Infinity;

  return offers.filter((offer) => {
    return (
      offer.category === category &&
      (filters.brand.length === 0 || filters.brand.includes(offer.brand)) &&
      (filters.os.length === 0 || filters.os.includes(offer.os)) &&
      (filters.ram.length === 0 || filters.ram.includes(offer.ram)) &&
      (filters.storage.length === 0 ||
        filters.storage.includes(offer.storage)) &&
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

export default function PhoneFilters({
  filters,
  handleMultiSelect,
  setFilters,
}: Props) {
  return (
    <>
      <FilterSection
        title="Marka"
        options={["Apple", "Samsung", "Xiaomi", "OnePlus", "Huawei"]}
        selected={filters.brand}
        onToggle={(value) => handleMultiSelect("brand", value)}
      />
      <FilterSection
        title="System operacyjny"
        options={["iOS", "Android", "Inny"]}
        selected={filters.os}
        onToggle={(value) => handleMultiSelect("os", value)}
      />
      <FilterSection
        title="Pamięć RAM"
        options={["2 GB", "4 GB", "6 GB", "8 GB", "12 GB"]}
        selected={filters.ram}
        onToggle={(value) => handleMultiSelect("ram", value)}
      />
      <FilterSection
        title="Pamięć wewnętrzna"
        options={["32 GB", "64 GB", "128 GB", "256 GB", "512 GB"]}
        selected={filters.storage}
        onToggle={(value) => handleMultiSelect("storage", value)}
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
