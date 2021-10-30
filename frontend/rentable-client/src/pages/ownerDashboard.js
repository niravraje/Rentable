import React from "react";
import OwnerDashboardList from "../components/OwnerDashboardList";

const OwnerDashboard = () => {
  return (
    <div
      className="card container mt-S"
      style={{ marginTop: "100px", width: "500px" }}
    >
      <div className="card-body">
        <h1 className="card-title"></h1>
        <form>
          <div>
            <button
              type="submit"
              className="btn btn-primary w-100 menu-buttons"
            >
              View My Listings
            </button>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 menu-buttons"
            href="/add-new-listing"
          >
            Add New Listing
          </button>
          <button type="submit" className="btn btn-primary w-100 menu-buttons">
            View Orders
          </button>
          <button type="submit" className="btn btn-primary w-100 menu-buttons">
            View Messages
          </button>
        </form>
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
