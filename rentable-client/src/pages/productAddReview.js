import React, { useState } from "react";
import Rating from "../components/Rating/Rating";
import axios from "axios";
import * as API from "../constants/api-routes";

const ProductAddReview = (props) => {
  const { state } = props.location;
  console.log("State received by this component: " + JSON.stringify(state));
  const [productCard, setProductCard] = useState(state);

  const [ratingValue, setRatingValue] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");

  const handleRating = (ratingValue) => {
    setRatingValue(ratingValue);
  };
  const addNewReview = async (e) => {
    e.preventDefault();
    const requestOptions = {
      product_id: productCard.id,
      review_description: reviewDescription,
      rating_value: ratingValue,
      renter_username: sessionStorage.getItem("username"),
    };
    console.log("Request Options: " + JSON.stringify(requestOptions));

    axios.post(API.ADD_NEW_REVIEW, requestOptions).then((response) => {
      console.log("Response: " + JSON.stringify(response));
    });
  };

  return (
    <div
      className="card container mt-S"
      style={{ marginTop: "100px", width: "500px" }}
    >
      <div className="card-body">
        <form onSubmit={addNewReview}>
          <p className="h4 text-center mb-4">Write a Customer Review</p>
          <label htmlFor="defaultFormContactNameEx" className="form-label">
            Product
          </label>
          <input
            type="text"
            id="defaultFormContactNameEx"
            className="form-control"
            value={productCard.title}
            disabled="disable"
          />
          <br />
          <Rating handleRating={handleRating} />
          <br />
          <label htmlFor="defaultFormContactMessageEx" className="form-label">
            Review
          </label>
          <textarea
            type="text"
            id="defaultFormContactMessageEx"
            className="form-control"
            rows="8"
            value={reviewDescription}
            onChange={(e) => setReviewDescription(e.currentTarget.value)}
          />
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-dark btn-primary w-100">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAddReview;
