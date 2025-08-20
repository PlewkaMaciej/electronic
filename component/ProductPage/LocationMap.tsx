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

const containerStyle: React.CSSProperties = { width: "100%", height: "300px" };

// UJEDNOLICONA KONFIGURACJA — identyczna jak w LocationPicker
const LIBRARIES = ["places", "geometry"] as const;
const GOOGLE_LOADER_OPTIONS = {
  id: "script-loader",
  version: "weekly",
  language: "en",
  region: "US",
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  libraries: LIBRARIES as any,
};

const LocationMap: React.FC<Props> = ({ city }) => {
  const { isLoaded, loadError } = useJsApiLoader(GOOGLE_LOADER_OPTIONS);

  const geocoderRef = useRef<google.maps.Geocoder>();
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);
  const [radius, setRadius] = useState<number>(10000);

  useEffect(() => {
    if (isLoaded && !geocoderRef.current) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, [isLoaded]);

  const geocodeCity = useCallback((cityName: string) => {
    if (!geocoderRef.current) return;
    geocoderRef.current.geocode({ address: cityName }, (results, status) => {
      if (status !== "OK" || !results?.[0]) return;
      const geom = results[0].geometry;
      const loc = geom.location;
      const lat = loc.lat();
      const lng = loc.lng();

      let r = 10000;
      if (geom.viewport) {
        const ne = geom.viewport.getNorthEast();
        const centerViewport = geom.viewport.getCenter();
        // wymaga 'geometry' w libraries (mamy to w obu miejscach)
        r = window.google.maps.geometry.spherical.computeDistanceBetween(
          centerViewport,
          ne
        );
      }

      setCenter({ lat, lng });
      setRadius(r);
    });
  }, []);

  useEffect(() => {
    if (isLoaded && city) {
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
