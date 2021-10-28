import React from "react";
import OwnerDashboardList from "../components/OwnerDashboardList";

const OwnerDashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <OwnerDashboardList></OwnerDashboardList>
    </div>
  );
};

export default OwnerDashboard;
