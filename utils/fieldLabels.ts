export const FIELD_LABELS: Record<string, string> = {
  processorBrand: "Marka procesora",
  processorModel: "Model procesora",
  ram: "Pamięć RAM (GB)",
  storageType: "Typ dysku",
  storageSize: "Pojemność dysku (GB)",
  gpuModel: "Model karty graficznej",
  brand: "Marka",
  os: "System operacyjny",
  screenSize: "Przekątna ekranu",
};

export function getLabel(key: string): string {
  if (FIELD_LABELS[key]) {
    return FIELD_LABELS[key];
  }

  const withSpaces = key.replace(/([A-Z])/g, " $1");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}
