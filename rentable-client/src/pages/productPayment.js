import React, { useState } from "react";
// import "../style/Home.css";
import Paypal from "../components/Paypal/Paypal";

function Payment(props) {
  const [checkout, setCheckOut] = useState(false);
  const { state } = props.location;
  const [productCard, setProductCard] = useState(state);
  console.log("product card here: " + JSON.stringify(productCard));
  return (
    <div className="App">
      {!checkout ? (
        <div
          style={{
            paddingLeft: "650px",
            paddingTop: "150px",
            width: "60%",
          }}
        >
          <Paypal productRentPrice={productCard.rent_price} />
        </div>
      ) : (
        <button
          onClick={() => {
            setCheckOut(true);
          }}
        >
          Checkout
        </button>
      )}
    </div>
  );
}

export default Payment;
