// import React, { useState } from "react";
// import { Link, useLocation, useHistory } from "react-router-dom";
// import "../style/productDetails.css";
// import { Button, Rating } from "@mui/material";
// import GpsFixedIcon from "@mui/icons-material/GpsFixed";
// import {
//   GoogleMap,
//   Marker,
//   useJsApiLoader,
//   InfoWindow,
// } from "@react-google-maps/api";
// import Geocode from "react-geocode";
// import "../style/centralMenu.css";

// // Center Map on bloomington
// const center = { lat: 39.167908, lng: -86.51898 };

// const ProductDetails = (props) => {
//   // const location = useLocation();
//   const { state } = props.location;
//   const card = state;

//   console.log("Product ID: " + card.id + " was clicked.");
//   console.log("Card: " + JSON.stringify(card));

//   const [center, setCenter] = useState({ lat: 48.1467112, lng: 17.1385319 });

//   const mapContainerStyle = {
//     width: "100vw",
//     height: "51vh",
//   };

//   const handleActiveMarker = (marker) => {
//     if (marker === activeMarker) {
//       return;
//     }
//     setActiveMarker(marker);
//   };
//   const [newOwnerCenter, setOwnerCenter] = useState({
//     lat: 37.0902,
//     lng: 95.71299,
//   });
//   const [newRenterCenter, setRenterCenter] = useState({
//     lat: 37.0902,
//     lng: 95.71299,
//   });
//   const [activeMarker, setActiveMarker] = useState(null);

//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyA-25Etr0SANix262qUzNfh7BUUezmfVxc",
//   });

//   // const mapContainerStyle = {
//   //     width: "45vw",
//   //     height: "51vh",
//   // }

//   Geocode.setApiKey("AIzaSyA-25Etr0SANix262qUzNfh7BUUezmfVxc");
//   Geocode.fromAddress(card.product_location).then(
//     (response) => {
//       setOwnerCenter(response.results[0].geometry.location);
//     },
//     (error) => {
//       console.error(error);
//     }
//   );

//   //get renter's location from the db in this format
//   const rentersLocation =
//     "Indiana Memorial Union Bldg, 900 E 7th St, Bloomington, IN 47405";

//   Geocode.fromAddress(rentersLocation).then(
//     (response) => {
//       setRenterCenter(response.results[0].geometry.location);
//     },
//     (error) => {
//       console.error(error);
//     }
//   );

//   const markers = [
//     {
//       id: 1,
//       name: card.product_location,
//       position: newOwnerCenter,
//       locationType: card.title,
//     },
//     {
//       id: 2,
//       name: rentersLocation,
//       position: newRenterCenter,
//       locationType: "Your Location",
//     },
//   ];

//   return isLoaded ? (
//     <div>
//       <div className="productTopDiv">
//         <div className="productImageContainer">
//           <img
//             className="productImage"
//             src={card.image_url}
//             alt="Product image"
//           />
//           <div className="productImagePriceOverlay"> {card.rent_price} </div>
//         </div>
//         <div className="productInfoBox">
//           <div className="productTitleBackground">
//             <h2 className="productTitle"> {card.title} </h2>
//             <Rating
//               name="rating"
//               className="productRating"
//               value={4.5}
//               precision={0.5}
//               readOnly
//             />
//           </div>
//           <p className="productDescriptionContainer"> {card.description} </p>
//           <div className="locationInfo">
//             {" "}
//             <GpsFixedIcon /> {card.product_location}{" "}
//           </div>
//         </div>
//       </div>
//       <div className="productDivider"> </div>
//       <div className="productBackground">
//         <div className="productMapContainer">
//           <GoogleMap
//             id="form-map"
//             mapContainerStyle={mapContainerStyle}
//             zoom={13}
//             center={center}
//             onClick={() => setActiveMarker(null)}
//           >
//             {markers.map(({ id, name, position, locationType }) => (
//               <Marker
//                 key={id}
//                 position={position}
//                 onClick={() => handleActiveMarker(id)}
//               >
//                 {activeMarker === id ? (
//                   <InfoWindow onCloseClick={() => setActiveMarker(null)}>
//                     <div>
//                       {" "}
//                       {locationType} <br /> {name}{" "}
//                     </div>
//                   </InfoWindow>
//                 ) : null}
//               </Marker>
//             ))}
//           </GoogleMap>
//         </div>
//         <div className="productDivider"> </div>
//         <div
//           className="card container mt-S"
//           style={{ marginTop: "100px", width: "500px" }}
//         >
//           <div className="card-body">
//             <h1 className="card-title"></h1>
//             <Link
//               to={{
//                 pathname: "/product-payment",
//                 state: card,
//               }}
//               className="btn btn-primary w-100 menu-buttons"
//             >
//               Proceed to Payment
//             </Link>
//             <Link
//               // to="/product-lodge-complaint"
//               to={{
//                 pathname: "/product-lodge-complaint",
//                 state: card, // your data array of objects
//               }}
//               className="btn btn-primary w-100 menu-buttons"
//             >
//               Chat with the Owner
//             </Link>
//             <Link
//               to={{
//                 pathname: "/renter-messsges",
//               }}
//               className="btn btn-primary w-100 menu-buttons"
//             >
//               Write a Review
//             </Link>
//             <Link
//               to={{
//                 pathname: "/product-lodge-complaint",
//                 state: card, // your data array of objects
//               }}
//               className="btn btn-primary w-100 menu-buttons"
//             >
//               Lodge a Complaint
//             </Link>
//           </div>
//         </div>
//       </div>
//       <div className="productDivider"></div>
//     </div>
//   ) : (
//     <div> Map Loading... </div>
//   );
// };

// export default ProductDetails;
