
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Usage: <DisasterMap coordinates={{lat, lng}} onSelect={({lat,lng})=>{}} />
interface DisasterMapProps {
  coordinates?: { lat: number; lng: number };
  onSelect?: (coords: { lat: number; lng: number }) => void;
  height?: string;
}

const DisasterMap: React.FC<DisasterMapProps> = ({ coordinates, onSelect, height = "350px" }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = React.useState<string>("");

  useEffect(() => {
    if (!mapContainer.current || !token) return;
    mapboxgl.accessToken = token;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: coordinates ? [coordinates.lng, coordinates.lat] : [77, 21],
      zoom: coordinates ? 7 : 3,
    });

    if (coordinates && map.current) {
      marker.current = new mapboxgl.Marker({ color: "#DC2626" })
        .setLngLat([coordinates.lng, coordinates.lat])
        .addTo(map.current);
    }

    if (onSelect && map.current) {
      map.current.on("click", (e) => {
        const lngLat = { lat: e.lngLat.lat, lng: e.lngLat.lng };
        if (marker.current) marker.current.remove();
        marker.current = new mapboxgl.Marker({ color: "#DC2626" }).setLngLat([lngLat.lng, lngLat.lat]).addTo(map.current);
        onSelect(lngLat);
      });
    }

    return () => {
      map.current?.remove();
    };
  }, [token, coordinates, onSelect]);

  return (
    <div>
      {onSelect && (
        <div className="mb-2">
          <label className="block text-sm mb-1 font-medium">Enter your Mapbox Public Token:</label>
          <input
            className="border rounded px-2 py-1 w-full text-xs mb-2 text-muted-foreground"
            placeholder="Mapbox Public Token (see mapbox.com > account)"
            value={token}
            onChange={e => setToken(e.target.value)}
          />
          <span className="block text-xs text-muted-foreground mb-1">
            Required for the interactive map. <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">Get your token here.</a>
          </span>
        </div>
      )}
      <div
        ref={mapContainer}
        style={{ width: "100%", height: height, borderRadius: "12px", overflow: "hidden", boxShadow: "0 0 8px #0002" }}
      />
    </div>
  );
};

export default DisasterMap;
