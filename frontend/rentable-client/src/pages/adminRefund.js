import React, { useState } from "react";

const AdminRefund = () => {
  const [email, setEmail] = useState("");
  const [loginType, setLoginType] = useState("manual");
  const [refundAmount, setAmount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const sendRefund = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        login_type: loginType,
        amount: refundAmount,
      }),
    };
    console.log(requestOptions);
    const res = await fetch("/adminRefund", requestOptions);
    setIsLoading(false);
  };
  return (
    <div style={{ marginTop: "10px" }} className="card-body">
      <div style={{ marginTop: "50px", marginLeft: "625px" }}>
        <h1>Issue a refund.</h1>
      </div>
      <form
        onSubmit={sendRefund}
        style={{ marginTop: "50px", width: "500px" }}
        className="card container mt-S"
      >
        <div className="mb-3" style={{ marginLeft: "10px" }}>
          <label htmlFor="Inputemail" className="form-label">
            Renter Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="Inputemail"
            value={email}
          />
          <label className="form-label" style={{ marginTop: "15px" }}>
            Refund Amount:
          </label>
          <input
            type="refundAmount"
            className="form-control"
            id="inputAmount"
            value={refundAmount}
          />
          <button
            disabled={isLoading ? true : false}
            type="submit"
            className="btn btn-dark btn-primary w-100"
            style={{ marginTop: "50px" }}
          >
            {isLoading ? "Loading..." : "Issue Refund"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminRefund;
