import { useState } from "react";

import ComputerFilters, {
  filterOffers as filterComputerOffers,
  defaultFilters as defaultComputerFilters,
  Filters as ComputerFiltersType,
  Offer as ComputerOffer,
} from "../../component/offerSearchComponent/ComputerFilters";

import LaptopFilters, {
  filterOffers as filterLaptopOffers,
  LaptopOffer,
  defaultFilters as defaultLaptopFilters,
  Filters as LaptopFiltersType,
} from "../../component/offerSearchComponent/LaptopFilters";

import PhoneFilters, {
  filterOffers as filterPhoneOffers,
  PhoneOffer,
  defaultFilters as defaultPhoneFilters,
  Filters as PhoneFiltersType,
} from "../../component/offerSearchComponent/PhoneFilters";

import PartsFilters, {
  filterPartsOffers,
  PartsOffer,
  defaultFilters as defaultPartsFilters,
  Filters as PartsFiltersType,
} from "../../component/offerSearchComponent/PartsFilters";

import PhotographyFilters, {
  filterPhotographyOffers,
  PhotographyOffer,
  defaultFilters as defaultPhotographyFilters,
  Filters as PhotographyFiltersType,
} from "../../component/offerSearchComponent/PhotographyFilters";

import SmartwatchFilters, {
  filterSmartwatchOffers,
  SmartwatchOffer,
  defaultFilters as defaultSmartwatchFilters,
  Filters as SmartwatchFiltersType,
} from "../../component/offerSearchComponent/SmartwatchFilters";

import RTVFilters, {
  filterRTVOffers,
  RTVOffer,
  defaultRTVFilters,
  Filters as RTVFiltersType,
} from "../../component/offerSearchComponent/RtvFilters";

import AGDFilters, {
  filterAGDOffers,
  AGDOffer,
  defaultAGDFilters,
  Filters as AGDFiltersType,
} from "../../component/offerSearchComponent/AgdFilters";

import AudioFilters, {
  filterOffers as filterAudioOffers,
  AudioOffer,
  defaultFilters as defaultAudioFilters,
  Filters as AudioFiltersType,
} from "../../component/offerSearchComponent/AudioFilters";

import VideoFilters, {
  filterOffers as filterVideoOffers,
  VideoOffer,
  defaultFilters as defaultVideoFilters,
  Filters as VideoFiltersType,
} from "../../component/offerSearchComponent/VideoFilters";

// Uniwersalna funkcja toggle dla multi-select filtrów
function toggleMultiSelect<T>(
  filters: T,
  setFilters: React.Dispatch<React.SetStateAction<T>>,
  key: keyof T,
  value: string
) {
  const current = filters[key] as unknown as string[];
  const updated = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];
  setFilters({ ...filters, [key]: updated });
}

// Typ kategorii - żeby TS nie narzekał na string jako klucz
type CategoryKey =
  | "Komputery"
  | "Laptopy"
  | "Telefony"
  | "Podzespoły i części"
  | "Fotografia"
  | "Smartwatche"
  | "RTV"
  | "AGD"
  | "Audio"
  | "Video";

// Typ wpisu w filtersMap z ujednoliconym handleMultiSelectFn (key jako string)
type FilterMapEntry<F, O> = {
  filters: F;
  setFilters: React.Dispatch<React.SetStateAction<F>>;
  filterFn: (offers: O[], filters: F, category: string | null) => O[];
  FilterComponent: React.ComponentType<{
    filters: F;
    setFilters: React.Dispatch<React.SetStateAction<F>>;
    handleMultiSelect: (key: keyof F, value: string) => void;
  }>;
  handleMultiSelectFn: (value: string, key: string) => void;
};

export function useAllFilters() {
  const [computerFilters, setComputerFilters] = useState<ComputerFiltersType>(
    defaultComputerFilters
  );
  const [laptopFilters, setLaptopFilters] =
    useState<LaptopFiltersType>(defaultLaptopFilters);
  const [phoneFilters, setPhoneFilters] =
    useState<PhoneFiltersType>(defaultPhoneFilters);
  const [partsFilters, setPartsFilters] =
    useState<PartsFiltersType>(defaultPartsFilters);
  const [photographyFilters, setPhotographyFilters] =
    useState<PhotographyFiltersType>(defaultPhotographyFilters);
  const [smartwatchFilters, setSmartwatchFilters] =
    useState<SmartwatchFiltersType>(defaultSmartwatchFilters);
  const [rtvFilters, setRTVFilters] =
    useState<RTVFiltersType>(defaultRTVFilters);
  const [agdFilters, setAGDFilters] =
    useState<AGDFiltersType>(defaultAGDFilters);
  const [audioFilters, setAudioFilters] =
    useState<AudioFiltersType>(defaultAudioFilters);
  const [videoFilters, setVideoFilters] =
    useState<VideoFiltersType>(defaultVideoFilters);

  const filtersMap: Record<CategoryKey, FilterMapEntry<any, any>> = {
    Komputery: {
      filters: computerFilters,
      setFilters: setComputerFilters,
      filterFn: filterComputerOffers,
      FilterComponent: ComputerFilters,
      handleMultiSelectFn: (value, key) =>
        toggleMultiSelect(
          computerFilters,
          setComputerFilters,
          key as keyof ComputerFiltersType,
          value
        ),
    },
    Laptopy: {
      filters: laptopFilters,
      setFilters: setLaptopFilters,
      filterFn: filterLaptopOffers,
      FilterComponent: LaptopFilters,
      handleMultiSelectFn: (value, key) =>
        toggleMultiSelect(
          laptopFilters,
          setLaptopFilters,
          key as keyof LaptopFiltersType,
          value
        ),
    },
    Telefony: {
      filters: phoneFilters,
      setFilters: setPhoneFilters,
      filterFn: filterPhoneOffers,
      FilterComponent: PhoneFilters,
      handleMultiSelectFn: (value, key) =>
        toggleMultiSelect(
          phoneFilters,
          setPhoneFilters,
          key as keyof PhoneFiltersType,
          value
        ),
    },
    "Podzespoły i części": {
      filters: partsFilters,
      setFilters: setPartsFilters,
      filterFn: filterPartsOffers,
      FilterComponent: PartsFilters,
      handleMultiSelectFn: (value, key) =>
        toggleMultiSelect(
          partsFilters,
          setPartsFilters,
          key as keyof PartsFiltersType,
          value
        ),
    },
    Fotografia: {
      filters: photographyFilters,
      setFilters: setPhotographyFilters,
      filterFn: filterPhotographyOffers,
      FilterComponent: PhotographyFilters,
      handleMultiSelectFn: (value, key) =>
        toggleMultiSelect(
          photographyFilters,
          setPhotographyFilters,
          key as keyof PhotographyFiltersType,
          value
        ),
    },
    Smartwatche: {
      filters: smartwatchFilters,
      setFilters: setSmartwatchFilters,
      filterFn: filterSmartwatchOffers,
      FilterComponent: SmartwatchFilters,
      handleMultiSelectFn: (value, key) =>
        toggleMultiSelect(
          smartwatchFilters,
          setSmartwatchFilters,
          key as keyof SmartwatchFiltersType,
          value
        ),
    },
    RTV: {
      filters: rtvFilters,
      setFilters: setRTVFilters,
      filterFn: filterRTVOffers,
      FilterComponent: RTVFilters,
      handleMultiSelectFn: (value, key) =>
        toggleMultiSelect(
          rtvFilters,
          setRTVFilters,
          key as keyof RTVFiltersType,
          value
        ),
    },
    AGD: {
      filters: agdFilters,
      setFilters: setAGDFilters,
      filterFn: filterAGDOffers,
      FilterComponent: AGDFilters,
      handleMultiSelectFn: (value, key) =>
        toggleMultiSelect(
          agdFilters,
          setAGDFilters,
          key as keyof AGDFiltersType,
          value
        ),
    },
    Audio: {
      filters: audioFilters,
      setFilters: setAudioFilters,
      filterFn: filterAudioOffers,
      FilterComponent: AudioFilters,
      handleMultiSelectFn: (value, key) =>
        toggleMultiSelect(
          audioFilters,
          setAudioFilters,
          key as keyof AudioFiltersType,
          value
        ),
    },
    Video: {
      filters: videoFilters,
      setFilters: setVideoFilters,
      filterFn: filterVideoOffers,
      FilterComponent: VideoFilters,
      handleMultiSelectFn: (value, key) =>
        toggleMultiSelect(
          videoFilters,
          setVideoFilters,
          key as keyof VideoFiltersType,
          value
        ),
    },
  };

  return { filtersMap };
}
