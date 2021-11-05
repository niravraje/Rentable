import React from "react";
import { send } from "emailjs-com";

const AdminMessages = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Customer Messages</h1>
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
              <li>Message 1</li>
              <li>Message 2</li>
              <li>Message 3</li>
              <li>Message 4</li>
              <li>Message 5</li>
              <li>Message 6</li>
              <li>Message 7</li>
              <li>Message 8</li>
              <li>Message 9</li>
              <li>Message 10</li>
            </ul>
          </nav>
        </body>
      </div>
    </div>
  );
};

export default AdminMessages;
