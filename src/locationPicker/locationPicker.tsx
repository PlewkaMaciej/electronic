// src/locationPicker/LocationPicker.tsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  useJsApiLoader,
  Autocomplete,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";

export interface LocationPickerProps {
  city: string;
  onCityChange: (city: string, lat: number, lng: number) => void;
}

const LIBRARIES = ["places"] as const;
const AUTOCOMPLETE_OPTIONS = { types: ["(cities)"] };

// map preview size
const MAP_PREVIEW_STYLE = { width: "100%", height: "200px" };

const LocationPicker: React.FC<LocationPickerProps> = ({
  city,
  onCityChange,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES as any, // satisfy TS
  });

  // local input + map center
  const [inputValue, setInputValue] = useState(city);
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // keep inputValue in sync if parent `city` changes
  useEffect(() => {
    setInputValue(city);
  }, [city]);

  // once scripts load, we can do nothing extra here

  // store Autocomplete instance
  const onLoadAutocomplete = useCallback(
    (ac: google.maps.places.Autocomplete) => {
      autocompleteRef.current = ac;
    },
    []
  );

  // when a place is chosen
  const onPlaceChanged = useCallback(() => {
    const ac = autocompleteRef.current;
    if (!ac) return;
    const place = ac.getPlace();
    if (!place.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    // extract city name
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
