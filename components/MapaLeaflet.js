import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Corrige os ícones no Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const posicaoCentro = [-14.2350, -51.9253]; // Brasil

export default function MapaLeaflet() {
  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden">
      <MapContainer center={posicaoCentro} zoom={4} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={posicaoCentro}>
          <Popup>Região central do Brasil - área monitorada.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
