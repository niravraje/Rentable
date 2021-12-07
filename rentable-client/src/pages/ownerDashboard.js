import React from "react";
import { Redirect, Link } from "react-router-dom";
import OwnerDashboardList from "../components/OwnerDashboardList";

const OwnerDashboard = () => {
  return (
    <div
      className="card container mt-S"
      style={{ marginTop: "100px", width: "500px" }}
    >
      <div className="card-body">
        <h1 className="card-title"></h1>
        <Link
          to="/view-owner-listings"
          className="btn btn-primary w-100 menu-buttons"
        >
          View My Listings
        </Link>
        <Link
          to="/add-new-listing"
          className="btn btn-primary w-100 menu-buttons"
        >
          Add New Listing
        </Link>
        <Link
          to="/owner-order-history"
          className="btn btn-primary w-100 menu-buttons"
        >
          View Orders
        </Link>
        <Link
          to="/owner-messages"
          className="btn btn-primary w-100 menu-buttons"
        >
          View Messages
        </Link>
      </div>
    </div>

    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "90vh",
    //   }}
    // >
    //   <OwnerDashboardList></OwnerDashboardList>
    // </div>
  );
};

export default OwnerDashboard;
