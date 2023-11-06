import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import Button from '@mui/material/Button';

export default function Welcome(props) {
  const position = [51.505, -0.09];

  return (
    <div>
      <h1>Hello, {props.name}</h1>
      <Map center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {/* <Marker position={position}>
          <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker> */}
      </Map>
    </div>
  )
}




