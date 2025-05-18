import { useState } from "react";
import { FilterSection } from "./FilterSection";

// Typy
export type Filters = {
  processor: string[];
  gpu: string[];
  disk: string[];
  ram: string[];
  power: string[];
  state: string[];
  priceMin: string;
  priceMax: string;
};

export type Offer = {
  id: number;
  name: string;
  category: string;
  processor: string;
  gpu: string;
  ram: string;
  disk: string;
  power: string;
  date: string;
  price: number;
  state: string;
};

// 🔧 Domyślny stan filtrów
export const defaultComputerFilters: Filters = {
  processor: [],
  gpu: [],
  disk: [],
  ram: [],
  power: [],
  state: [],
  priceMin: "",
  priceMax: "",
};

// 🔁 Hook do filtrów
export function useComputerFilters() {
  const [filters, setFilters] = useState<Filters>(defaultComputerFilters);

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

// 🔎 Funkcja pomocnicza — filtrowanie ogłoszeń komputerów
export function filterComputerOffers(
  offers: Offer[],
  filters: Filters,
  category: string | null
): Offer[] {
  const min = parseFloat(filters.priceMin) || 0;
  const max = parseFloat(filters.priceMax) || Infinity;

  return offers.filter((offer) => {
    return (
      offer.category === category &&
      (filters.processor.length === 0 ||
        filters.processor.includes(offer.processor)) &&
      (filters.gpu.length === 0 || filters.gpu.includes(offer.gpu)) &&
      (filters.disk.length === 0 || filters.disk.includes(offer.disk)) &&
      (filters.ram.length === 0 || filters.ram.includes(offer.ram)) &&
      (filters.power.length === 0 || filters.power.includes(offer.power)) &&
      (filters.state.length === 0 || filters.state.includes(offer.state)) &&
      offer.price >= min &&
      offer.price <= max
    );
  });
}

// 🔘 Komponent filtrów komputerów
type Props = {
  filters: Filters;
  handleMultiSelect: (key: keyof Filters, value: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export default function ComputerFilters({
  filters,
  handleMultiSelect,
  setFilters,
}: Props) {
  return (
    <>
      <FilterSection
        title="Procesor"
        options={["Intel", "AMD"]}
        selected={filters.processor}
        onToggle={(value) => handleMultiSelect("processor", value)}
      />
      <FilterSection
        title="Karta graficzna"
        options={[
          "NVIDIA GeForce",
          "AMD Radeon",
          "NVIDIA Quadro",
          "AMD Radeon Pro",
          "Intel Arc",
        ]}
        selected={filters.gpu}
        onToggle={(value) => handleMultiSelect("gpu", value)}
      />
      <FilterSection
        title="Pamięć RAM"
        options={["4 GB", "8 GB", "16 GB", "32 GB", "64 GB"]}
        selected={filters.ram}
        onToggle={(value) => handleMultiSelect("ram", value)}
      />
      <FilterSection
        title="Moc zasilacza"
        options={[
          "Poniżej 500W",
          "500 - 699W",
          "700 - 999W",
          "900 - 1200W",
          "Powyżej 1200W",
        ]}
        selected={filters.power}
        onToggle={(value) => handleMultiSelect("power", value)}
      />
      <FilterSection
        title="Dysk"
        options={["SSD M.2", "SSD SATA", "HDD"]}
        selected={filters.disk}
        onToggle={(value) => handleMultiSelect("disk", value)}
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
