import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  useJsApiLoader,
  Autocomplete,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";

export interface LocationPickerProps {
  city: string;
  // lat/lng opcjonalne -> kompatybilne z (city) podczas dodawania
  onCityChange: (city: string, lat?: number, lng?: number) => void;
}

// UJEDNOLICONA KONFIGURACJA — identyczna jak w LocationMap
const LIBRARIES = ["places", "geometry"] as const;
const GOOGLE_LOADER_OPTIONS = {
  id: "script-loader",
  version: "weekly",
  language: "en",
  region: "US",
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  libraries: LIBRARIES as any, // typy z @react-google-maps/api akceptują string[]
};

const AUTOCOMPLETE_OPTIONS: google.maps.places.AutocompleteOptions = {
  types: ["(cities)"],
};

const MAP_PREVIEW_STYLE: React.CSSProperties = {
  width: "100%",
  height: "200px",
};

const LocationPicker: React.FC<LocationPickerProps> = ({
  city,
  onCityChange,
}) => {
  const { isLoaded, loadError } = useJsApiLoader(GOOGLE_LOADER_OPTIONS);

  const [inputValue, setInputValue] = useState(city);
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    setInputValue(city);
  }, [city]);

  const onLoadAutocomplete = useCallback(
    (ac: google.maps.places.Autocomplete) => {
      autocompleteRef.current = ac;
    },
    []
  );

  const onPlaceChanged = useCallback(() => {
    const ac = autocompleteRef.current;
    if (!ac) return;
    const place = ac.getPlace();
    if (!place?.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const comps = place.address_components || [];
    const comp =
      comps.find((c) => c.types.includes("locality")) ||
      comps.find((c) => c.types.includes("administrative_area_level_1"));
    const name = comp?.long_name || place.name || "";

    setInputValue(name);
    setCenter({ lat, lng });
    onCityChange(name, lat, lng);
  }, [onCityChange]);

  if (loadError) return <p className="text-red-500">Błąd ładowania mapy</p>;
  if (!isLoaded) return <p>Ładowanie mapy…</p>;

  return (
    <div className="mb-6 max-w-6xl mx-auto">
      <label className="block font-medium text-gray-700 mb-2">
        Miasto odbioru
      </label>
      <div className="flex gap-2 mb-4">
        <div className="flex-1 max-w-md">
          <Autocomplete
            onLoad={onLoadAutocomplete}
            onPlaceChanged={onPlaceChanged}
            options={AUTOCOMPLETE_OPTIONS}
          >
            <input
              type="text"
              placeholder="Wpisz miasto"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </Autocomplete>
        </div>
      </div>

      {center && (
        <GoogleMap
          mapContainerStyle={MAP_PREVIEW_STYLE}
          center={center}
          zoom={12}
          options={{
            disableDefaultUI: true,
            clickableIcons: false,
            gestureHandling: "none",
          }}
        >
          <Marker position={center} />
        </GoogleMap>
      )}
    </div>
  );
};

export default LocationPicker;
