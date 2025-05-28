import { useState } from "react";
import { FilterSection } from "./FilterSection";

export type Filters = {
  processor: string[];
  gpuBrand: string[];
  gpuModel: string[];
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
  gpuBrand?: string;
  gpuModel?: string;
  ram: string;
  disk: string;
  power: string;
  date: string;
  price: number;
  state: string;
};

export const defaultFilters: Filters = {
  processor: [],
  gpuBrand: [],
  gpuModel: [],
  disk: [],
  ram: [],
  power: [],
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
  offers: Offer[],
  filters: Filters,
  category: string | null
): Offer[] {
  const min = parseFloat(filters.priceMin) || 0;
  const max = parseFloat(filters.priceMax) || Infinity;

  return offers.filter((offer) => {
    const gpuBrand = offer.gpuBrand || "";
    const gpuModel = offer.gpuModel || "";

    // Sprawdź, czy marka pasuje
    const brandMatches =
      filters.gpuBrand.length === 0 || filters.gpuBrand.includes(gpuBrand);

    // Filtr modelu zależny od wybranych marek
    const modelsForThisBrand = filters.gpuBrand.includes(gpuBrand)
      ? filters.gpuModel.filter((model) => {
          // tutaj zakładamy, że modele GPU nie są współdzielone między markami
          return (
            model &&
            ((gpuBrand === "NVIDIA GeForce" && model.startsWith("RTX")) ||
              (gpuBrand === "AMD Radeon" && model.startsWith("RX")) ||
              (gpuBrand === "Intel Arc" && model.startsWith("A")))
          );
        })
      : [];

    const modelMatches =
      filters.gpuModel.length === 0 ||
      modelsForThisBrand.length === 0 ||
      modelsForThisBrand.includes(gpuModel);

    return (
      offer.category === category &&
      (filters.processor.length === 0 ||
        filters.processor.includes(offer.processor)) &&
      brandMatches &&
      modelMatches &&
      (filters.disk.length === 0 || filters.disk.includes(offer.disk)) &&
      (filters.ram.length === 0 || filters.ram.includes(offer.ram)) &&
      (filters.power.length === 0 || filters.power.includes(offer.power)) &&
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

export default function ComputerFilters({
  filters,
  handleMultiSelect,
  setFilters,
}: Props) {
  const gpuModels = {
    "NVIDIA GeForce": ["RTX 3080", "RTX 3070"],
    "AMD Radeon": ["RX 6900 XT", "RX 6800 XT"],
    "Intel Arc": ["A770", "A750"],
  };

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
        options={Object.keys(gpuModels)}
        selected={filters.gpuBrand}
        subSelected={filters.gpuModel}
        onToggle={(value) => handleMultiSelect("gpuBrand", value)}
        isExpandable={true}
        subOptions={Object.entries(gpuModels).map(([brand, models]) => ({
          brand,
          models,
        }))}
        onSubToggle={(value) => handleMultiSelect("gpuModel", value)}
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
