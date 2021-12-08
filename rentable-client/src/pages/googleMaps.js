import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "../style/productDetails.css";
import { Button, Rating } from "@mui/material";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import Geocode from "react-geocode";
import "../style/centralMenu.css";

function GoogleMapsComponent(props) {
  const card = props.productCard;
  const [center, setCenter] = useState({ lat: 48.1467112, lng: 17.1385319 });
  const mapContainerStyle = {
    width: "100vw",
    height: "51vh",
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  const [newOwnerCenter, setOwnerCenter] = useState({
    lat: 37.0902,
    lng: 95.71299,
  });
  const [newRenterCenter, setRenterCenter] = useState({
    lat: 37.0902,
    lng: 95.71299,
  });
  const [activeMarker, setActiveMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA-25Etr0SANix262qUzNfh7BUUezmfVxc",
  });

  Geocode.setApiKey("AIzaSyA-25Etr0SANix262qUzNfh7BUUezmfVxc");
  Geocode.fromAddress(card.product_location).then(
    (response) => {
      setOwnerCenter(response.results[0].geometry.location);
    },
    (error) => {
      console.error(error);
    }
  );

  //get renter's location from the db in this format
  const rentersLocation =
    "Indiana Memorial Union Bldg, 900 E 7th St, Bloomington, IN 47405";

  Geocode.fromAddress(rentersLocation).then(
    (response) => {
      setRenterCenter(response.results[0].geometry.location);
    },
    (error) => {
      console.error(error);
    }
  );

  const markers = [
    {
      id: 1,
      name: card.product_location,
      position: newOwnerCenter,
      locationType: card.title,
    },
    {
      id: 2,
      name: rentersLocation,
      position: newRenterCenter,
      locationType: "Your Location",
    },
  ];

  return isLoaded ? (
    <div className="productMapContainer">
      <GoogleMap
        id="form-map"
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        onClick={() => setActiveMarker(null)}
      >
        {markers.map(({ id, name, position, locationType }) => (
          <Marker
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>
                  {" "}
                  {locationType} <br /> {name}{" "}
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  ) : (
    <div> Map Loading... </div>
  );
}

export default GoogleMapsComponent;
