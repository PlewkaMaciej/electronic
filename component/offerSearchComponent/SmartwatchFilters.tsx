import { useState } from "react";
import { FilterSection } from "./FilterSection";

export type Filters = {
  brand: string[];
  os: string[];
  features: string[];
  state: string[];
  priceMin: string;
  priceMax: string;
};

export type SmartwatchOffer = {
  id: number;
  name: string;
  category: string;
  brand: string;
  os: string;
  features: string;
  state: string;
  price: number;
};

export const defaultFilters: Filters = {
  brand: [],
  os: [],
  features: [],
  state: [],
  priceMin: "",
  priceMax: "",
};

export function useSmartwatchFilters() {
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

export function filterSmartwatchOffers(
  offers: SmartwatchOffer[],
  filters: Filters,
  category: string | null
): SmartwatchOffer[] {
  const min = parseFloat(filters.priceMin) || 0;
  const max = parseFloat(filters.priceMax) || Infinity;

  return offers.filter((offer) => {
    return (
      offer.category === category &&
      (filters.brand.length === 0 || filters.brand.includes(offer.brand)) &&
      (filters.os.length === 0 || filters.os.includes(offer.os)) &&
      (filters.features.length === 0 ||
        filters.features.includes(offer.features)) &&
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

export default function SmartwatchFilters({
  filters,
  handleMultiSelect,
  setFilters,
}: Props) {
  return (
    <>
      <FilterSection
        title="Marka"
        options={["Apple", "Samsung", "Garmin", "Fitbit", "Huawei"]}
        selected={filters.brand}
        onToggle={(value) => handleMultiSelect("brand", value)}
      />
      <FilterSection
        title="System operacyjny"
        options={["watchOS", "Wear OS", "Tizen", "Inny"]}
        selected={filters.os}
        onToggle={(value) => handleMultiSelect("os", value)}
      />
      <FilterSection
        title="Funkcje"
        options={["GPS", "Pulsometr", "Płatności NFC", "Monitor snu"]}
        selected={filters.features}
        onToggle={(value) => handleMultiSelect("features", value)}
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
