import React, { useState } from "react";
// import "../style/Home.css";
import Paypal from "../components/Paypal/Paypal";
import {
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import axios from "axios";
import * as API from "../constants/api-routes";

function Payment(props) {
  const [checkout, setCheckOut] = useState(false);
  const { state } = props.location;
  const [productCard, setProductCard] = useState(state);
  const [finalRentPrice, setFinalRentPrice] = useState(productCard.rent_price);
  const [couponCode, setCouponCode] = useState(null);

  console.log("product card here: " + JSON.stringify(productCard));

  const applyCoupon = () => {
    const requestOptions = {
      coupon_code: couponCode,
    };
    axios.get(API.VALIDATE_COUPON, requestOptions).then((response) => {
      console.log("Coupon validation response: " + JSON.stringify(response));
    });
    // setFinalRentPrice();
  };

  return (
    <div>
      <div
        className="card container mt-S"
        style={{ marginTop: "100px", width: "500px", padding: "10px" }}
      >
        <Form onSubmit={applyCoupon}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Coupon Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter coupon code"
              onChange={(e) => setCouponCode(e.currentTarget.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Apply Coupon
          </Button>
          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            style={{ marginTop: "10px" }}
          >
            <Form.Label>Amount Payable</Form.Label>
            <Form.Control
              type="text"
              value={finalRentPrice}
              disabled="disable"
            />
          </Form.Group>
        </Form>
      </div>
      <div>
        {!checkout ? (
          <div
            style={{
              paddingTop: "50px",
              paddingLeft: "760px",
              width: "60%",
            }}
          >
            <Paypal productRentPrice={finalRentPrice} />
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
    </div>
  );
}

export default Payment;
