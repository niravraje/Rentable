import React from "react";
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
// import { Map, GoogleApiWrapper } from "google-maps-react";
import Map from "../components/map/Map";

const location = {
  address: "1600 Amphitheatre Parkway, Mountain View, california.",
  lat: 37.42216,
  lng: -122.08427,
};

const ProductDetails = () => {
  const location = {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: 37.42216,
    lng: -122.08427,
  }; // our location object from earlier
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        width: "100%",
      }}
    >
      <Map location={location} zoomLevel={10} />
    </div>
  );
};

export default ProductDetails;
