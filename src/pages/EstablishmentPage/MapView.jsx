/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

export default function MapView({ position }) {
  return (
    <MapContainer
      center={position}
      css={css`
        height: 500px;
        width: 100%;
        margin-top: 4rem;
        `}
      zoom={12}
      scrollWheelZoom={true}
      >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
      </Marker>
    </MapContainer>
  )
}
