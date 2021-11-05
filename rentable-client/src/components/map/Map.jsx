import React from 'react';
import GoogleMapReact from "google-map-react";
// import { Icon } from '@iconify/react'
// import locationIcon from '@iconify/icons-mdi/map-marker'

import './map.css';



const Map = ({ location, zoomLevel }) => (
  <div className="map">
    <h2 className="map-h2">Location of Apartment - Product Details Page</h2>

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        {/* <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        /> */}
      </GoogleMapReact>
    </div>
  </div>
)

export default Map