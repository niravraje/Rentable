import React from "react";
import { Redirect, Link } from "react-router-dom";

const RenterDashboard = () => {
  return (
    <div
      className="card container mt-S"
      style={{ marginTop: "100px", width: "500px" }}
    >
      <div className="card-body">
        <h1 className="card-title"></h1>
        <Link
          to="/renter-order-history"
          className="btn btn-primary w-100 menu-buttons"
        >
          View My Orders
        </Link>
        <Link
          to="/renter-messages"
          className="btn btn-primary w-100 menu-buttons"
        >
          View Messages
        </Link>
      </div>
    </div>
  );
};

export default RenterDashboard;
