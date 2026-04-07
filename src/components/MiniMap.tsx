"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet default icons
const hotelIcon = L.divIcon({
  html: `<div style="background:#e63946;color:white;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:18px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.5)">🏨</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  className: "",
});

const courtIcon = L.divIcon({
  html: `<div style="background:#e63946;color:white;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:18px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.5)">🏀</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  className: "",
});

const HOTEL_POS: [number, number] = [34.6841, 33.0379];
const COURT_POS: [number, number] = [34.685, 33.038];

export default function MiniMap() {
  return (
    <MapContainer
      center={[34.6845, 33.0379]}
      zoom={16}
      style={{ width: "100%", height: "100%", background: "#1a1a1a" }}
      zoomControl={false}
      attributionControl={false}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={HOTEL_POS} icon={hotelIcon}>
        <Popup>מלון פפקוס (Pefkos)</Popup>
      </Marker>
      <Marker position={COURT_POS} icon={courtIcon}>
        <Popup>אולמות האימון</Popup>
      </Marker>
      <Polyline
        positions={[HOTEL_POS, COURT_POS]}
        pathOptions={{ color: "#e63946", weight: 3, dashArray: "6 4" }}
      />
    </MapContainer>
  );
}
