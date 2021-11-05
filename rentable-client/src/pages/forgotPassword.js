// import React from 'react'

// const forgotPassword = () => {
//     return (
//         <div style={
//             {
//                 display: 'inline',
//                 justifyContent:'center',
//                 alignItems: 'center',
//                 height: '90vh'
//             }}>
//             <h2 align="center" margin-top= '500px'>Forgot Password</h2>
//             <h3 align="center" margin-top= "500px">Enter your email address to reset your password</h3>
//         </div>

//     )
// }

// export default forgotPassword

import { useState } from "react";
import { send } from "emailjs-com";
import { FaAlignCenter, FaBorderNone } from "react-icons/fa";

function ForgotPassword() {
  const [toSend, setToSend] = useState({
    from_name: "",
    to_name: "",
    message: "",
    reply_to: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    send(
      "service_740uhkk",
      "template_31bgt4c",
      toSend,
      "user_hFtDvLi74TX29uy4Y1gAt"
    )
      .then((response) => {
        console.log("Email sent!", response.status, response.text);
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={onSubmit}>
      <div
        className="card container mt-S"
        style={{ marginTop: "100px", width: "500px", border: FaBorderNone }}
      >
        <h2 style={{ alignItems: "center" }}>
          {" "}
          Enter your email to reset your password.{" "}
        </h2>
        <input
          type="text"
          name="reply_to"
          placeholder="Your email"
          value={toSend.reply_to}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default ForgotPassword;
