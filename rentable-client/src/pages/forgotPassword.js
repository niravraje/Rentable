import { useState } from "react";
import { send } from "emailjs-com";
import { FaAlignCenter, FaBorderNone } from "react-icons/fa";
import MyCaptcha from "../components/Captcha";

function ForgotPassword() {
  const [toSend, setToSend] = useState({
    from_name: "",
    to_name: "",
    message: "",
    reply_to: "",
  });
  const [captchaText, setCaptchaText] = useState("");
  const [captchaActual, setCaptchaActual] = useState(null);
  const handleCaptchaActual = (dataKey) => {
    setCaptchaActual(dataKey);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("captchaActual: " + captchaActual);
    console.log("captchaEntered: " + captchaText);
    if (captchaActual !== captchaText) {
      setError("Incorrect Captcha value entered. Please try again.");
      return;
    }

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
    <div
      className="card container mt-S"
      style={{ marginTop: "100px", width: "500px" }}
    >
      <div className="card-body">
        <h5 className="card-title">Enter your email to reset your password.</h5>
        {error && (
          <p className="text-danger" style={{ fontsize: "100px" }}>
            {error}
          </p>
        )}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="Inputemail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="reply_to"
              placeholder="Enter your email"
              value={toSend.reply_to}
              onChange={handleChange}
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
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
    // <form onSubmit={onSubmit}>
    //   <div
    //     className="card container mt-S"
    //     style={{ marginTop: "100px", width: "500px", border: FaBorderNone }}
    //   >
    //     <h2 style={{ alignItems: "center" }}>
    //       {" "}
    //       Enter your email to reset your password.{" "}
    //     </h2>
    //     <input
    //       type="text"
    //       name="reply_to"
    //       placeholder="Your email"
    //       value={toSend.reply_to}
    //       onChange={handleChange}
    //     />
    // <button type="submit" className="btn btn-dark btn-primary w-100">
    //   Submit
    // </button>
    //   </div>
    // </form>
  );
}

export default ForgotPassword;
