import React, { useState } from "react";
// import "../style/Home.css";
import Paypal from "../components/Paypal/Paypal";

function Payment() {
  const [checkout, setCheckOut] = useState(false);

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
          <Paypal />
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
