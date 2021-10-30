import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import Form from "react-bootstrap/Form";

// const case1 = ({username,password}) =>{
//     return new Promise((resolve, reject) =>{
//     setTimeout(()=>{
//         if(Object.is(username,"bilibili") && Object.is(password,"bilibili")){
//             resolve()
//         }else{
//             reject()
//         }
//     },2000)
//     })
// }

const responseGoogle = (response) => {
  console.log(response);
  console.log(response.profileObj);
};

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("manual");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //   const [isLogin, setIsLogin] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let userTypeLocal = props.userType;

    if (email === "admin@rentable.com") {
      props.handleUserType("admin");
      userTypeLocal = "admin";
    } else {
      props.handleUserType("renter");
      userTypeLocal = "renter";
    }
    console.log("After handling: User type local: " + userTypeLocal);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        login_type: loginType,
        user_type: userTypeLocal,
        password: password,
      }),
    };
    try {
      console.log(requestOptions);
      const res = await fetch("/sign_in", requestOptions);
      console.log("Response on sign_in request: " + res);
      const data = await res.json();

      console.log("Status code of login request: " + res.status);
      console.log("Login request's res.json(): " + JSON.stringify(data));
      console.log("Access token received on login: " + data.access_token);

      if (res.status == "401") {
        setError("Unauthorized. Invalid username or password.");
        setIsLoading(false);
        return;
      }

      sessionStorage.setItem("token", data.access_token);
      setError("");
      setIsLoading(false);
      console.log("props.handleLogin: " + props.handleLogin);
      console.log("Before setting login status: " + props.loginStatus);
      props.handleLogin();

      console.log("props.handleLogin() executed...");

      console.log("User authenticated successfully");
    } catch (err) {
      setEmail("");
      setPassword("");
      console.log("props.loginStatus value is: " + props.loginStatus);
      setError("Error. Internal server error.");

      setIsLoading(false);
      console.log("failure");
    }
  };

  return (
    <div
      className="card container mt-S"
      style={{ marginTop: "100px", width: "500px" }}
    >
      {props.loginStatus ? (
        <>
          {console.log("Email ID of user logged in: " + email)}
          {console.log("User type of user logged in: " + props.userType)}
          {props.userType === "admin" ? (
            <Redirect to="/admin-dashboard" />
          ) : (
            <Redirect to="/" />
          )}
        </>
      ) : (
        <div className="card-body">
          <h1 className="card-title"></h1>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={loginUser}>
            <div className="mb-3">
              <GoogleLogin
                clientId="693247566048-ph5gqf37u78uub3erq5kovg30k0i4rph.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
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
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>
            <button
              disabled={isLoading ? true : false}
              type="submit"
              className="btn btn-dark btn-primary w-100"
            >
              {isLoading ? "Signing In" : "Sign in"}
            </button>
            <div
              className="mb-3"
              style={{ textAlign: "center", marginTop: "25px" }}
            >
              <a href="/forgot-password">Forgot my password</a>
            </div>
          </form>

          <div>
            <center>
              <Link to="/signup" className="btn btn-primary">
                Create New User Account
              </Link>
            </center>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
