// src/locationPicker/LocationPicker.tsx
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import type { Libraries } from "@react-google-maps/api";

export interface Location {
  lat: number;
  lng: number;
  city: string;
}

interface Props {
  selectedLocation: Location | null;
  onLocationChange: (loc: Location) => void;
}

const containerStyle = { width: "100%", height: "300px" };
const centerDefault = { lat: 52.2297, lng: 21.0122 };

// zadeklaruj mutable Libraries array
const libraries: Libraries = ["places"];

const LocationPicker: React.FC<Props> = ({
  selectedLocation,
  onLocationChange,
}) => {
  // 1) załaduj Google Maps JS z biblioteką places
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // 2) lokalne stany: input i marker
  const [inputValue, setInputValue] = useState<string>(
    selectedLocation?.city || ""
  );
  const [markerPos, setMarkerPos] = useState<google.maps.LatLngLiteral | null>(
    selectedLocation
      ? { lat: selectedLocation.lat, lng: selectedLocation.lng }
      : null
  );

  // 3) refy
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  // 4) zainicjuj Geocoder po załadowaniu skryptu
  useEffect(() => {
    if (isLoaded && !geocoderRef.current) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, [isLoaded]);

  // 5) synkuj prop selectedLocation → lokalne stany
  useEffect(() => {
    if (selectedLocation) {
      setInputValue(selectedLocation.city);
      setMarkerPos({
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
      });
    }
  }, [selectedLocation]);

  // 6) callback dla Autocomplete
  const onLoadAutocomplete = useCallback(
    (autoC: google.maps.places.Autocomplete) => {
      autocompleteRef.current = autoC;
    },
    []
  );

  // 7) gdy użytkownik wybierze sugestię
  const onPlaceChanged = useCallback(() => {
    const autoC = autocompleteRef.current;
    if (!autoC) return;
    const place = autoC.getPlace();
    if (!place.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    // wyciągnij miasto z address_components
    const comps = place.address_components || [];
    const cityComp =
      comps.find((c) => c.types.includes("locality")) ||
      comps.find((c) => c.types.includes("administrative_area_level_1"));
    const cityName = cityComp?.long_name || "";

    // aktualizuj stan
    setMarkerPos({ lat, lng });
    setInputValue(cityName);
    onLocationChange({ lat, lng, city: cityName });

    // przesuń mapę
    mapRef.current?.panTo({ lat, lng });
  }, [onLocationChange]);

  // 8) gdy mapa się załaduje
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // 9) “Moja lokalizacja” → geolokalizacja + geokodowanie
  const handleUseMyLocation = () => {
    if (!navigator.geolocation || !geocoderRef.current) {
      alert("Geolokalizacja niedostępna");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const lat = coords.latitude;
        const lng = coords.longitude;
        const geocoder = geocoderRef.current!;
        const ll = new window.google.maps.LatLng(lat, lng);
        geocoder.geocode({ location: ll }, (results) => {
          if (!results || !results.length) return;
          const comps = results[0].address_components;
          const cityComp =
            comps.find((c) => c.types.includes("locality")) ||
            comps.find((c) => c.types.includes("administrative_area_level_1"));
          const cityName = cityComp?.long_name || "";

          setMarkerPos({ lat, lng });
          setInputValue(cityName);
          onLocationChange({ lat, lng, city: cityName });
          mapRef.current?.panTo({ lat, lng });
        });
      },
      () => alert("Nie udało się pobrać lokalizacji")
    );
  };

  if (loadError) return <p className="text-red-500">Błąd ładowania mapy</p>;
  if (!isLoaded) return <p>Ładowanie mapy…</p>;

  return (
    <div className="mb-6 max-w-6xl mx-auto">
      <label className="block font-medium text-gray-700 mb-2">
        Lokalizacja odbioru
      </label>
      <div className="flex gap-2 mb-2">
        <Autocomplete
          onLoad={onLoadAutocomplete}
          onPlaceChanged={onPlaceChanged}
          options={{ types: ["(cities)"] }} // tylko miasta
        >
          <input
            type="text"
            placeholder="Wpisz miasto"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
        </Autocomplete>
        <button
          type="button"
          onClick={handleUseMyLocation}
          className="px-4 bg-blue-600 text-white rounded"
        >
          Moja lokalizacja
        </button>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPos || centerDefault}
        zoom={markerPos ? 12 : 5}
        onLoad={onMapLoad}
        options={{ streetViewControl: false, fullscreenControl: false }}
      >
        {markerPos && <Marker position={markerPos} />}
      </GoogleMap>
    </div>
  );
};

export default LocationPicker;
