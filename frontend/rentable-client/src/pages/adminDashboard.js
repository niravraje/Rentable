import React from "react";
import { Link } from "react-router-dom";
import "../style/centralMenu.css";
import { Domain } from "@material-ui/icons";

const AdminDashboard = () => {
  return (
    <div
      className="card container mt-S"
      style={{ marginTop: "100px", width: "500px" }}
    >
      <div className="card-body">
        <h1 className="card-title"></h1>
        <Link to="/admin-refund" className="btn btn-primary w-100 menu-buttons">
          Issue a Refund
        </Link>
        <Link
          to="/admin-approve-listings"
          className="btn btn-primary w-100 menu-buttons"
        >
          Approve Listings
        </Link>
        <Link
          to="/view-owner-orders"
          className="btn btn-primary w-100 menu-buttons"
        >
          View Orders
        </Link>
        <Link
          to="/admin-messages"
          className="btn btn-primary w-100 menu-buttons"
        >
          View Messages
        </Link>
      </div>
    </div>

    // <div style={{ marginLeft: "550px" }}>
    //   <div style={{ marginTop: "50px", marginLeft: "60px" }}>
    //     <h1>Admin Dashboard</h1>
    //   </div>
    //   <div
    //     className="card container mt-S"
    //     style={{ marginTop: "100px", width: "500px" }}
    //   >
    //     <div style={{ marginTop: "100px", marginLeft: "25px" }}>
    //       <button
    //         type="submit"
    //         className="btn btn-dark"
    //         style={{ marginLeft: "5px" }}
    //       >
    //         Approve Items
    //       </button>
    //       <button
    //         type="submit"
    //         className="btn btn-dark"
    //         style={{ marginLeft: "5px" }}
    //       >
    //         View Complaints
    //       </button>
    //       <a style={{ marginLeft: "5px" }} href="/refund" class="btn btn-dark">
    //         {" "}
    //         Issue Refund
    //       </a>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AdminDashboard;
