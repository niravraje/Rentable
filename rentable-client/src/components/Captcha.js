import React from "react";
import Captcha from "captcha-image";

const captchaImage = new Captcha(
  "35px Arial",
  "center",
  "middle",
  300,
  150,
  "#eee",
  "#111",
  6
).createImage();

function createMarkup(source) {
  return { __html: source };
}

function MyCaptcha(props) {
  const dataKey = captchaImage.match('data-key="(.*)">').pop();
  console.log("image dataKey: " + dataKey);

  props.handleCaptchaActual(dataKey);
  return <div dangerouslySetInnerHTML={createMarkup(captchaImage)} />;
}

// function Captcha() {
//   return <div dangerouslySetInnerHTML={createMarkup(captchaImage)} />;
// }

export default MyCaptcha;
