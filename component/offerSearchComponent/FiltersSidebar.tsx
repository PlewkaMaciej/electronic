import React from "react";

type FiltersSidebarProps = {
  category: string | null;
  filtersMap: Record<
    string,
    {
      filters: object;
      setFilters: React.Dispatch<React.SetStateAction<any>>;
      FilterComponent: React.ComponentType<any>;
      handleMultiSelectFn: (value: string, key: string) => void;
    }
  >;
};

export function FiltersSidebar({ category, filtersMap }: FiltersSidebarProps) {
  if (!category || !(category in filtersMap)) return null;

  const { filters, setFilters, FilterComponent, handleMultiSelectFn } =
    filtersMap[category];

  return (
    <FilterComponent
      filters={filters}
      setFilters={setFilters}
      handleMultiSelect={(key: string, value: string) =>
        handleMultiSelectFn(value, key)
      }
    />
  );
}
