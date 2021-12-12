import React, { useState, useEffect } from "react";
import * as API from "../constants/api-routes";
import { FaBorderNone } from "react-icons/fa";
import { Alert } from "@mui/material";
import MyCaptcha from "../components/Captcha";

const OwnerSignUp = (props) => {
  const [email, setEmail] = useState("");
  const [loginType, setLoginType] = useState("manual");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [captchaActual, setCaptchaActual] = useState(null);
  const handleCaptchaActual = (dataKey) => {
    setCaptchaActual(dataKey);
  };

  const registerUser = async (e) => {
    e.preventDefault();

    console.log("captchaActual: " + captchaActual);
    console.log("captchaEntered: " + captchaText);
    if (captchaActual !== captchaText) {
      setError("Incorrect Captcha value entered. Please try again.");
      return;
    }

    setIsLoading(true);

    props.handleUserType("owner");
    console.log("User type: " + props.userType);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        login_type: loginType,
        user_type: "owner",
        first_name: firstName,
        last_name: lastName,
        password: password,
        address: address,
      }),
    };
    try {
      console.log(requestOptions);
      const res = await fetch(API.REGISTER, requestOptions);
      console.log(res);
      const data = await res.json();
      console.log("Registration response token: " + data);
      console.log("Access token received on register: " + data.access_token);
      sessionStorage.setItem("token", data.access_token);
      setError("");
      setIsLoading(false);
      console.log(
        "Signup.js: Before setting login status: " + props.loginStatus
      );
      props.handleLogin(data.username);
      console.log(
        "Signup.js: Before setting login status: " + props.loginStatus
      );

      console.log("success");
    } catch (error) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setError(
        "Passwords do not match or your password is less than 9 characters."
      );
      setIsLoading(false);
      console.log("failure");
    }
  };

  return (
    <div
      className="card container mt-S"
      style={{ marginTop: "100px", width: "500px", border: FaBorderNone }}
    >
      {props.loginStatus ? (
        <div style={{ padding: "20px" }}>
          {console.log({ firstName })}
          <Alert>User Registered Successfully</Alert>
        </div>
      ) : (
        <div className="card-body">
          <h1 className="card-title"></h1>
          {error && (
            <p className="text-danger" style={{ fontsize: "100px" }}>
              {error}
            </p>
          )}
          <form onSubmit={registerUser}>
            <div className="mb-3">
              <label htmlFor="InputFirstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="InputFirstName"
                aria-describedby="emailHelp"
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputLastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="InputLastName"
                aria-describedby="emailHelp"
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputLastName" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="InputAddress"
                aria-describedby="emailHelp"
                value={address}
                onChange={(e) => setAddress(e.currentTarget.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Inputemail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="Inputemail"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="InputPassword1"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword2" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="InputPassword2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputCaptcha" className="form-label">
                Captcha Test
              </label>
              <MyCaptcha handleCaptchaActual={handleCaptchaActual} />
              <br></br>
              <label htmlFor="inputCaptcha" className="form-label">
                Enter the characters seen in the above image
              </label>
              <input
                type="text"
                className="form-control"
                value={captchaText}
                onChange={(e) => setCaptchaText(e.currentTarget.value)}
              />
            </div>

            <button
              disabled={isLoading ? true : false}
              type="submit"
              className="btn btn-dark btn-primary w-100"
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default OwnerSignUp;
