// import React, { useState } from "react";
// import { Link, useLocation, useHistory } from "react-router-dom";
// import "../style/productDetails.css";
// import { Button, Rating } from "@mui/material";
// import GpsFixedIcon from "@mui/icons-material/GpsFixed";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import "../style/centralMenu.css";
// import Geocode from "react-geocode";

// const ProductDetails = (props) => {
//   // const location = useLocation();
//   const { state } = props.location;
//   const card = state;

//   console.log("Product ID: " + card.id + " was clicked.");
//   console.log("Card: " + card);

//   const [center, setCenter] = useState({ lat: 39.167908, lng: -86.51898 });

//   const mapContainerStyle = {
//     width: "100vw",
//     height: "51vh",
//   };
//   Geocode.setApiKey("AIzaSyA-25Etr0SANix262qUzNfh7BUUezmfVxc");
//   Geocode.fromAddress(card.product_location).then(
//     (response) => {
//       const { lat, lng } = response.results[0].geometry.location;
//       console.log(lat, lng);
//     },
//     (error) => {
//       console.error(error);
//     }
//   );

//   return (
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
//           <center>
//             <LoadScript
//               id="form-map"
//               googleMapsApiKey="AIzaSyA-25Etr0SANix262qUzNfh7BUUezmfVxc"
//               version="weekly"
//             >
//               <GoogleMap
//                 id="form-map"
//                 mapContainerStyle={mapContainerStyle}
//                 zoom={13}
//                 center={center}
//               >
//                 <Marker position={center} />
//               </GoogleMap>
//             </LoadScript>
//           </center>
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
//               to={{
//                 pathname: "/renter-messages",
//               }}
//               className="btn btn-primary w-100 menu-buttons"
//             >
//               Chat with the Owner
//             </Link>
//             <Link
//               to={{
//                 pathname: "/product-add-review",
//                 state: card,
//               }}
//               className="btn btn-primary w-100 menu-buttons"
//             >
//               Write a Review
//             </Link>
//             <Link
//               // to="/product-lodge-complaint"
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
//   );
// };

// export default ProductDetails;
