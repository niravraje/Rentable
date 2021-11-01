import React from "react";
import OwnerDashboardList from "../components/OwnerDashboardList";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

const OwnerAddNewListing = () => {
  const add_new_listing = async (e) => {
    let userTypeLocal = sessionStorage.getItem("user_type");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        login_type: loginType,
        user_type: userTypeLocal,
        password: password,
      }),
    };
  };

  return (
    <div
      className="card container mt-S"
      style={{ marginTop: "100px", width: "500px" }}
    >
      <div className="card-body">
        <h1 className="card-title"></h1>
        {/* {error && <p className="text-danger">{error}</p>} */}
        {/* <form onSubmit={}> */}
        <form>
          <div className="mb-3">
            <label htmlFor="inputCategory" className="form-label">
              Category
            </label>
            <FloatingLabel
              controlId="floatingSelect"
              label="Apartment, Car or Service"
            >
              <Form.Select aria-label="Floating label select example">
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
              // value={}
              // onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <div className="mb-3">
            <label htmlFor="inputCategory" className="form-label">
              Rental Frequency Offered
            </label>
            <FloatingLabel
              controlId="floatingSelect"
              label="Per day, month, week, or year"
            >
              <Form.Select aria-label="Floating label select example">
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
              // value={}
              // onChange={(e) => setEmail(e.currentTarget.value)}
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
