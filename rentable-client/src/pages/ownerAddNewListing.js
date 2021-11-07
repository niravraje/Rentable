import React, { useState } from "react";
import OwnerDashboardList from "../components/OwnerDashboardList";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as API from "../constants/api-routes";
import Button from "react-bootstrap/Button";

const OwnerAddNewListing = () => {
  const [error, setError] = useState("");

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [rentFrequency, setRentFrequency] = useState("");
  const [ownerUsername, setOwnerUsername] = useState("niravraje2");

  // const [isLoading, setIsLoading] = useState(false);

  const add_new_listing = async (e) => {
    e.preventDefault();

    let userTypeLocal = sessionStorage.getItem("user_type");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: category,
        title: title,
        description: description,
        rent_price: rentPrice,
        rent_frequency: rentFrequency,
        owner_username: ownerUsername,
      }),
    };
    console.log("User type: " + userTypeLocal);
    console.log(requestOptions);

    try {
      const res = await fetch(API.ADD_NEW_LISTING, requestOptions);
      console.log("Response on add_new_listing request: " + res);
      const data = await res.json();

      console.log("Status code of request: " + res.status);
      console.log("res.json(): " + JSON.stringify(data));

      if (res.status !== 201) {
        setError("Error: Could not create the new listing.");
        return;
      }
      setError("");
      console.log("Listing added successfully.");
    } catch (err) {
      setError("Error. Internal server error.");
      console.log("Server error occurred. Check if the server is running.");
    }

    setCategory("");
    setTitle("");
    setDescription("");
    setRentPrice("");
    setRentFrequency("");
  };

  return (
    <div
      className="card container mt-S"
      style={{ marginTop: "100px", width: "500px" }}
    >
      <div className="card-body">
        <h1 className="card-title"></h1>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={add_new_listing}>
          <div className="mb-3">
            <label htmlFor="inputCategory" className="form-label">
              Category
            </label>
            <FloatingLabel
              controlId="floatingSelect"
              label="Apartment, Car or Service"
            >
              <Form.Select
                aria-label="Floating label select example"
                value={category}
                onChange={(e) => setCategory(e.currentTarget.value)}
              >
                <option>Choose Category</option>
                <option value="apartment">Apartment</option>
                <option value="car">Car</option>
                <option value="service">Service</option>
              </Form.Select>
            </FloatingLabel>
          </div>
          <div className="mb-3">
            <label htmlFor="listingTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="ListingTitle"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
          </div>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
          </Form.Group>

          <div className="mb-3">
            <label htmlFor="inputCategory" className="form-label">
              Rental Frequency Offered
            </label>
            <FloatingLabel
              controlId="floatingSelect"
              label="Per day, month, week, or year"
            >
              <Form.Select
                aria-label="Floating label select example"
                value={rentFrequency}
                onChange={(e) => setRentFrequency(e.currentTarget.value)}
              >
                <option>Choose Frequency</option>
                <option value="hour">Hourly</option>
                <option value="day">Daily</option>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
              </Form.Select>
            </FloatingLabel>
          </div>
          <div className="mb-3">
            <label htmlFor="listingTitle" className="form-label">
              Rental Price for Frequency Period
            </label>
            <input
              type="text"
              className="form-control"
              id="ListingTitle"
              value={rentPrice}
              onChange={(e) => setRentPrice(e.currentTarget.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Photo</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-dark btn-primary w-100">
              {"Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerAddNewListing;
