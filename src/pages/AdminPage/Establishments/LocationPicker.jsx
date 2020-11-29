/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet';

export default function LocationPicker({
  position,
  setPositionLatitude,
  setPositionLongitude,
}) {
  function MapLocation() {
    useMapEvent('click', (event) => {
      setPositionLatitude(event.latlng.lat);
      setPositionLongitude(event.latlng.lng);
    });
    return null;
  }

  return (
    <MapContainer
      center={position}
      css={css`
        height: 500px;
        width: 100%;
        `}
      zoom={14}
      scrollWheelZoom={true}
      >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
      </Marker>
      <MapLocation />
    </MapContainer>
  )
}
