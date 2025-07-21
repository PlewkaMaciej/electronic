// src/component/ProductPage/LocationMap.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  Circle,
  useJsApiLoader,
} from "@react-google-maps/api";

interface Props {
  city: string;
}

const containerStyle = { width: "100%", height: "300px" };
// Biblioteki potrzebne do geokodowania i obliczania promienia
const LIBRARIES = ["places", "geometry"] as const;

const LocationMap: React.FC<Props> = ({ city }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES as any,
  });

  const geocoderRef = useRef<google.maps.Geocoder>();
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);
  const [radius, setRadius] = useState<number>(10000);

  // Inicjalizacja Geocodera
  useEffect(() => {
    if (isLoaded && !geocoderRef.current) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, [isLoaded]);

  // Funkcja geokodująca nazwę miasta
  const geocodeCity = useCallback((cityName: string) => {
    if (!geocoderRef.current) return;
    geocoderRef.current.geocode({ address: cityName }, (results, status) => {
      if (status !== "OK" || !results?.[0]) return;
      const geom = results[0].geometry;
      const loc = geom.location;
      const lat = loc.lat();
      const lng = loc.lng();

      // Obliczenie promienia z viewportu
      let r = 10000;
      if (geom.viewport) {
        const ne = geom.viewport.getNorthEast();
        const centerViewport = geom.viewport.getCenter();
        r = window.google.maps.geometry.spherical.computeDistanceBetween(
          centerViewport,
          ne
        );
      }

      setCenter({ lat, lng });
      setRadius(r);
    });
  }, []);

  // Geokoduj za każdym razem gdy zmieni się miasto lub API się załaduje
  useEffect(() => {
    if (isLoaded) {
      geocodeCity(city);
    }
  }, [city, isLoaded, geocodeCity]);

  if (loadError) return <p className="text-red-500">Błąd ładowania mapy</p>;
  if (!isLoaded) return <p>Ładowanie mapy…</p>;
  if (!center) return null;

  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Lokalizacja</h3>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
        }}
      >
        <Marker position={center} />
        <Circle
          center={center}
          radius={radius}
          options={{
            fillColor: "#3388ff55",
            strokeColor: "#3388ff",
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default LocationMap;
