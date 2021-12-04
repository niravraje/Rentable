import React, { useState } from "react";
import axios from "axios";
import * as API from "../constants/api-routes";

function ProductLodgeComplaint(props) {
  const { state } = props.location;
  console.log("State received by this component: " + JSON.stringify(state));

  const [productCard, setProductCard] = useState(state);
  const [isRefundRequested, setIsRefundRequested] = useState(false);
  const [complaintDescription, setComplaintDescription] = useState("");

  const addNewComplaint = async (e) => {
    e.preventDefault();
    const requestOptions = {
      product_id: productCard.id,
      description: complaintDescription,
      is_refund_requested: isRefundRequested,
      renter_username: sessionStorage.getItem("username"),
    };
    console.log("Request Options: " + JSON.stringify(requestOptions));

    axios.post(API.ADD_NEW_COMPLAINT, requestOptions).then((response) => {
      console.log("Response: " + JSON.stringify(response));
    });
  };

  return (
    <div
      className="card container mt-S"
      style={{ marginTop: "100px", width: "500px" }}
    >
      <div className="card-body">
        <form onSubmit={addNewComplaint}>
          <p className="h4 text-center mb-4">Lodge a Complaint</p>
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
          <label htmlFor="defaultFormContactNameEx" className="form-label">
            Would you like to request for a full refund?
          </label>
          <select
            type="text"
            id="defaultFormContactNameEx"
            className="form-select"
            value={isRefundRequested}
            onChange={(e) => setIsRefundRequested(e.currentTarget.value)}
            required
          >
            <option value="Select" selected>
              --- Select ---
            </option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <br />
          <label
            htmlFor="defaultFormContactMessageEx"
            className="form-label"
            required
          >
            Please provide us with a few more details
          </label>
          <textarea
            type="text"
            id="defaultFormContactMessageEx"
            className="form-control"
            rows="8"
            value={complaintDescription}
            onChange={(e) => setComplaintDescription(e.currentTarget.value)}
          />
          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-dark btn-primary w-49 float: left"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductLodgeComplaint;
