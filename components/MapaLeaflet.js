import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const posicaoCentro = [-14.2350, -51.9253];

const alertas = [
  {
    id: 1,
    local: "Chapadão do Sul - MS",
    coords: [-18.7972, -52.6194],
    praga: "Lagarta-do-cartucho",
    status: "Alerta ativo",
  },
  {
    id: 2,
    local: "Sorriso - MT",
    coords: [-12.5425, -55.7211],
    praga: "Mosca-branca",
    status: "Monitorando",
  },
  {
    id: 3,
    local: "Uberlândia - MG",
    coords: [-18.9186, -48.2772],
    praga: "Percevejo-marrom",
    status: "Alerta ativo",
  },
];

export default function MapaLeaflet() {
  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden">
      <MapContainer center={posicaoCentro} zoom={5} scrollWheelZoom className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {alertas.map((alerta) => (
          <Marker key={alerta.id} position={alerta.coords}>
            <Popup>
              <strong>{alerta.local}</strong><br />
              Praga: {alerta.praga}<br />
              Status: <span className="text-red-600 font-semibold">{alerta.status}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
