import { useState } from "react";
import { FilterSection } from "./FilterSection";

export type Filters = {
  brand: string[];
  type: string[];
  resolution: string[];
  state: string[];
  priceMin: string;
  priceMax: string;
};

export type VideoOffer = {
  id: number;
  name: string;
  category: string;
  brand: string;
  type: string;
  resolution: string;
  state: string;
  price: number;
};

export const defaultFilters: Filters = {
  brand: [],
  type: [],
  resolution: [],
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
  offers: VideoOffer[],
  filters: Filters,
  category: string | null
): VideoOffer[] {
  const min = parseFloat(filters.priceMin) || 0;
  const max = parseFloat(filters.priceMax) || Infinity;

  return offers.filter((offer) => {
    return (
      offer.category === category &&
      (filters.brand.length === 0 || filters.brand.includes(offer.brand)) &&
      (filters.type.length === 0 || filters.type.includes(offer.type)) &&
      (filters.resolution.length === 0 ||
        filters.resolution.includes(offer.resolution)) &&
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

export default function VideoFilters({
  filters,
  handleMultiSelect,
  setFilters,
}: Props) {
  return (
    <>
      <FilterSection
        title="Marka"
        options={["Sony", "Panasonic", "Canon", "GoPro"]}
        selected={filters.brand}
        onToggle={(value) => handleMultiSelect("brand", value)}
      />
      <FilterSection
        title="Typ"
        options={["Kamera", "Projektor", "Nagrywarka"]}
        selected={filters.type}
        onToggle={(value) => handleMultiSelect("type", value)}
      />
      <FilterSection
        title="Rozdzielczość"
        options={["HD", "Full HD", "4K", "8K"]}
        selected={filters.resolution}
        onToggle={(value) => handleMultiSelect("resolution", value)}
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
