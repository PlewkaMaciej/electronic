import { useState } from "react";
import { FilterSection } from "./FilterSection";

export type Filters = {
  type: string[];
  compatibility: string[];
  state: string[];
  priceMin: string;
  priceMax: string;
};

export type PartsOffer = {
  id: number;
  name: string;
  category: string;
  type: string;
  compatibility: string;
  state: string;
  price: number;
};

export const defaultFilters: Filters = {
  type: [],
  compatibility: [],
  state: [],
  priceMin: "",
  priceMax: "",
};

export function usePartsFilters() {
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

export function filterPartsOffers(
  offers: PartsOffer[],
  filters: Filters,
  category: string | null
): PartsOffer[] {
  const min = parseFloat(filters.priceMin) || 0;
  const max = parseFloat(filters.priceMax) || Infinity;

  return offers.filter((offer) => {
    return (
      offer.category === category &&
      (filters.type.length === 0 || filters.type.includes(offer.type)) &&
      (filters.compatibility.length === 0 ||
        filters.compatibility.includes(offer.compatibility)) &&
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

export default function PartsFilters({
  filters,
  handleMultiSelect,
  setFilters,
}: Props) {
  return (
    <>
      <FilterSection
        title="Typ"
        options={[
          "Karta graficzna",
          "Procesor",
          "Płyta główna",
          "Pamięć RAM",
          "Dysk",
        ]}
        selected={filters.type}
        onToggle={(value) => handleMultiSelect("type", value)}
      />
      <FilterSection
        title="Kompatybilność"
        options={["Intel", "AMD", "Uniwersalna"]}
        selected={filters.compatibility}
        onToggle={(value) => handleMultiSelect("compatibility", value)}
      />
      <FilterSection
        title="Stan"
        options={["Nowy", "Używany", "Refurbished"]}
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
