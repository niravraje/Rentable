import React from "react";
const AdminComplaints = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Customer Complaints</h1>
      <div style={{ marginLeft: "35%", marginTop: "5%" }}>
        <body
          style={{
            height: "200px",
            width: "50%",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <nav>
            <ul>
              <li>Complaint 1</li>
              <li>Complaint 2</li>
              <li>Complaint 3</li>
              <li>Complaint 4</li>
              <li>Complaint 5</li>
              <li>Complaint 6</li>
              <li>Complaint 7</li>
              <li>Complaint 8</li>
              <li>Complaint 9</li>
              <li>Complaint 10</li>
            </ul>
          </nav>
        </body>
      </div>
    </div>
  );
};

export default AdminComplaints;
