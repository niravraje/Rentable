import React, { useState } from "react";
import OwnerDashboardList from "../components/OwnerDashboardList";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as API from "../constants/api-routes";
import Button from "react-bootstrap/Button";
import Axios from "axios";

const OwnerAddNewListing = () => {
  const [error, setError] = useState("");
  const [productId, setProductId] = useState("default");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [productLocation, setProductLocation] = useState("");
  const [rentFrequency, setRentFrequency] = useState("");
  const [imageSelected, setImageSelected] = useState(null);

  // const [isLoading, setIsLoading] = useState(false);

  const add_new_listing = async (e) => {
    e.preventDefault();

    let userTypeLocal = sessionStorage.getItem("user_type");
    console.log("User type: " + userTypeLocal);
    console.log(imageSelected);

    // Request for Uploading Image
    const dataArray = new FormData();
    dataArray.append("file", imageSelected);
    dataArray.append("upload_preset", "h1gt8ruh");

    Axios.post(
      "https://api.cloudinary.com/v1_1/rentable1/image/upload",
      dataArray
    )
      .then((response) => {
        console.log("Cloudinary Upload Response");
        console.log(response);
        const imageUrl = response["data"]["url"];
        console.log("Image URL: " + imageUrl);

        // Request for Add New Listing
        const requestOptions = {
          category: category,
          title: title,
          description: description,
          rent_price: rentPrice,
          rent_frequency: rentFrequency,
          owner_username: sessionStorage.getItem("username"),
          image_url: imageUrl,
          product_location: productLocation,
        };
        console.log(requestOptions);
        Axios.post(API.ADD_NEW_LISTING, requestOptions);
      })
      .then((response) => {
        console.log("Flask Response for Add New Listing");
        console.log(response);
      });

    setImageSelected(null);
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
            <label htmlFor="listingTitle" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="ListingTitle"
              value={productLocation}
              onChange={(e) => setProductLocation(e.currentTarget.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Photo</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImageSelected(e.target.files[0])}
              />
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
