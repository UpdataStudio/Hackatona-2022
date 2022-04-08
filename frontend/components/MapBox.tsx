import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import layerRideGeojson from '@/config/geojson/layer-ride';
import 'leaflet/dist/leaflet.css';
import React from 'react';

export default function MapBox() {
  return (
    <MapContainer
      center={[-15.205, -47.509]}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: '100%', width: "100%"}}>
      <TileLayer
        attribution=''
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        key={'my-map-RIDE'}
        //@ts-ignore
        data={layerRideGeojson}
        style={(feature) => ({
          fillColor: '#01386B',
          weight: 0.3,
          opacity: 1,
          color: 'white',
          dashArray: '0',
          fillOpacity: 0.4
        })} />
    </MapContainer>
  )
}
