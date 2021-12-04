<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import * as API from "../constants/api-routes";
=======
import React, { useState } from "react";
>>>>>>> dev
import { FaBorderNone } from "react-icons/fa";
import * as API from "../constants/api-routes";

// const case1 = ({username,password,confirmPassword,email}) =>{
//     return new Promise((resolve, reject) =>{
//         setTimeout(()=>{
//             if(Object.is(password, confirmPassword) && password.length > 8){

//                 // // Simple POST request with a JSON body using fetch
//                 // const requestOptions = {
//                 //     method: 'POST',
//                 //     headers: { 'Content-Type': 'application/json' },
//                 //     body: JSON.stringify({ title: 'React POST Request Example' })
//                 // };
//                 // fetch('/register', requestOptions)
//                 //     .then(response => response.json())
//                 //     .then(data => console.log(data));

//                 resolve()
//             }else{
//                 reject()
//             }
//         },1000)
//     })
// }

const Signup = (props) => {
  const [email, setEmail] = useState("");
  // const [userType, setUserType] = useState("renter");
  const [loginType, setLoginType] = useState("manual");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [isLogin, setIsLogin] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    props.handleUserType("renter");
    console.log("User type: " + props.userType);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        login_type: loginType,
        user_type: "renter",
        first_name: firstName,
        last_name: lastName,
        password: password,
      }),
    };
    try {
      console.log(requestOptions);
      const res = await fetch(API.REGISTER, requestOptions);
      // .then((res) => res.json())
      // .then((data) => {
      //   console.log(data);
      //   console.log("Registration response token: " + data.access_token);
      // });
      console.log(res);
      const data = await res.json();
      console.log("Registration response token: " + data);
      console.log("Access token received on register: " + data.access_token);
      sessionStorage.setItem("token", data.access_token);
      // setUsername(username)
      // setPassword(password)
      // setEmail(email)
      setError("");
      setIsLoading(false);
      // setIsLogin(true);
      console.log(
        "Signup.js: Before setting login status: " + props.loginStatus
      );
      props.handleLogin(data.username);
      console.log(
        "Signup.js: Before setting login status: " + props.loginStatus
      );

      console.log("success");
      // resolve()
    } catch (error) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setError("Invalid data entered. Please check your responses.");
      setIsLoading(false);
      console.log("failure");
      // reject()
    }
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setIsLoading(true);
  //     try {
  //       await registerUser({ username, password, confirmPassword, email });
  //       setUsername(username);
  //       setPassword(password);
  //       setEmail(email);
  //       setError("");
  //       setIsLoading(false);
  //       setIsLogin(true);
  //       console.log("success");
  //     } catch (error) {
  //       setUsername("");
  //       setPassword("");
  //       setConfirmPassword("");
  //       setEmail("");
  //       setError(
  //         "Passwords do not match or your password is less than 9 characters."
  //       );
  //       setIsLoading(false);
  //       console.log("failure");
  //     }
  //   };

  return (
    <div
      className="card container mt-S"
      style={{ marginTop: "100px", width: "500px", border: FaBorderNone }}
    >
      {props.loginStatus ? (
        <>
          {console.log({ firstName })}
          <div className="mb-3" style={{ border: FaBorderNone }}>
            <h1>User Registered Successfully</h1>
          </div>
        </>
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

export default Signup;
