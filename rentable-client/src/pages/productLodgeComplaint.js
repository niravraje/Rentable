import { Radio } from "@material-ui/core";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ProductLodgeComplaint = () => {
  const location = useLocation();
  // const { productId } = location.state;
  // console.log("card: " + productId);
  return (
    <div
      className="card container mt-S"
      style={{ marginTop: "100px", width: "500px" }}
    >
      <form>
        <p className="h4 text-center mb-4">Write a Customer Review</p>
        <label htmlFor="defaultFormContactNameEx" className="grey-text">
          Product
        </label>
        <input
          type="text"
          id="defaultFormContactNameEx"
          className="form-control"
          value="Tesla Model X"
          disabled="disable"
        />
        <br />

        <br />
        <label htmlFor="defaultFormContactMessageEx" className="grey-text">
          Complaint
        </label>
        <textarea
          type="text"
          id="defaultFormContactMessageEx"
          className="form-control"
          rows="8"
        />
        <div className="text-center mt-4">
          <button
            // disabled={isLoading ? true : false}
            type="submit"
            className="btn btn-dark btn-primary w-100"
          >
            Request refund
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductLodgeComplaint;
