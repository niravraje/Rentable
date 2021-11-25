import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/productDetails.css";
import { Rating } from "@mui/material";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "../style/centralMenu.css";
import Geocode from "react-geocode";

const ProductDetails = ({ id }) => {
  const location = useLocation();
  const card = location.state;
  console.log("Product ID: " + card.id + " was clicked.");
  console.log("Card: " + card);

  const [center, setCenter] = useState({ lat: 48.1467112, lng: 17.1385319 });

  const mapContainerStyle = {
    width: "100vw",
    height: "51vh",
  };

  Geocode.setApiKey("AIzaSyA-25Etr0SANix262qUzNfh7BUUezmfVxc");
  Geocode.fromAddress(card.product_location).then(
    (response) => {
      setCenter(response.results[0].geometry.product_location);
    },
    (error) => {
      console.error(error);
    }
  );

  return (
    <div>
      <div className="productTopDiv">
        <div className="productImageContainer">
          <img
            className="productImage"
            src={card.image_url}
            alt="Product image"
          />
          <div className="productImagePriceOverlay"> {card.rent_price} </div>
        </div>
        <div className="productInfoBox">
          <div className="productTitleBackground">
            <h2 className="productTitle"> {card.title} </h2>
            <Rating
              name="rating"
              className="productRating"
              value={card.rating}
              precision={0.5}
              readOnly
            />
          </div>
          <p className="productDescriptionContainer"> {card.description} </p>
          <div className="locationInfo">
            {" "}
            <GpsFixedIcon /> {card.product_location}{" "}
          </div>
        </div>
      </div>
      <div className="productDivider"> </div>
      <div className="productBackground">
        <div className="productMapContainer">
          <center>
            <LoadScript
              id="form-map"
              googleMapsApiKey="AIzaSyA-25Etr0SANix262qUzNfh7BUUezmfVxc"
              version="weekly"
            >
              <GoogleMap
                id="form-map"
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={center}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </center>
        </div>
        <div className="productDivider"> </div>
        <div
          className="card container mt-S"
          style={{ marginTop: "100px", width: "500px" }}
        >
          <div className="card-body">
            <h1 className="card-title"></h1>
            <Link
              to="/product-payment"
              className="btn btn-primary w-100 menu-buttons"
            >
              Proceed to Payment
            </Link>
            <Link
              to="/product-review"
              className="btn btn-primary w-100 menu-buttons"
              state={{ productId: card.id }}
            >
              Write a Review
            </Link>
            <Link
              to="/product-lodge-complaint"
              className="btn btn-primary w-100 menu-buttons"
            >
              Lodge a Complaint
            </Link>
          </div>
        </div>
      </div>
      <div className="productDivider"></div>
    </div>
  );
};

export default ProductDetails;