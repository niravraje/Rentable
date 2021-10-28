import React from "react";
import OwnerDashboardList from "../components/OwnerDashboardList";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

const OwnerAddNewListing = () => {
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
            <label htmlFor="ListingTitle" className="form-label">
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
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Category
            </label>

            <FloatingLabel
              controlId="floatingSelect"
              label="Works with selects"
            >
              <Form.Select aria-label="Floating label select example">
                <option>Choose Category</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </FloatingLabel>
          </div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Photo</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <button type="submit" className="btn btn-dark btn-primary w-100">
            {"Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OwnerAddNewListing;
