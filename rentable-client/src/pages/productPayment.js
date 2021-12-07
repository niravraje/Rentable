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
  const [couponCodeValid, setCouponCodeValid] = useState(null);

  console.log("product card here: " + JSON.stringify(productCard));

  const applyCoupon = async (e) => {
    e.preventDefault();

    const requestOptions = {
      coupon_code: couponCode,
    };
    axios.post(API.VALIDATE_COUPON, requestOptions).then((response) => {
      console.log("Coupon validation response: " + JSON.stringify(response));
      if (response.data.discount_percent === 0) {
        console.log("Invalid coupon");
        setCouponCodeValid(false);
      } else {
        setCouponCodeValid(true);
        setFinalRentPrice(
          productCard.rent_price -
            productCard.rent_price *
              (parseFloat(response.data.discount_percent) * 0.01)
        );
        console.log("Price after coupon is applied: " + finalRentPrice);

        sessionStorage.setItem("final_rent_price", finalRentPrice);
      }
    });
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
          {couponCode && couponCodeValid === true ? (
            <div
              style={{ paddingLeft: "20px", display: "inline", color: "green" }}
            >
              Coupon applied successfully!
            </div>
          ) : null}
          {couponCode && couponCodeValid === false ? (
            <div
              style={{ paddingLeft: "20px", display: "inline", color: "red" }}
            >
              Invalid coupon code.
            </div>
          ) : null}

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
          <Paypal productCard={productCard} />
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
          ></div>
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
