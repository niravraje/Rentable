import React, { useRef, useEffect, useState } from "react";
import { send } from "emailjs-com";
import axios from "axios";
import * as API from "../../constants/api-routes";

export default function Paypal(props) {
  const paypal = useRef();
  const [userDetails, setUserDetails] = useState(null);
  console.log("props: " + JSON.stringify(props.productCard));

  //default value of toSend state
  const [toSend, setToSend] = useState({
    from_name: sessionStorage.getItem("username"),
    owner_email: "rentableteam@gmail.com",
    price: sessionStorage.getItem("final_rent_price"),
    message: "",
    reply_to: "niravraje3@gmail.com",
    // fullhartadam@gmail.com
  });
  sessionStorage.setItem("toSendDetails", toSend);

  // function to get user details based on logged in user

  useEffect(() => {
    // const getUserDetails = async (e) => {

    //   const requestOptions = {
    //     username: sessionStorage.getItem("username"),
    //   };
    //   axios.post(API.GET_USER_DETAILS, requestOptions).then((response) => {
    //     console.log("Response.data: " + JSON.stringify(response.data));
    //     setToSend({
    //       from_name: response.data.first_name + " " + response.data.last_name,
    //       owner_email: "niravraje3@gmail.com",
    //       price: sessionStorage.getItem("final_rent_price"),
    //       message: "",
    //       reply_to: response.data.email,
    //     });
    //     sessionStorage.setItem(
    //       "toSendDetails",
    //       JSON.stringify({
    //         from_name: response.data.first_name + " " + response.data.last_name,
    //         owner_email: "niravraje3@gmail.com",
    //         price: sessionStorage.getItem("final_rent_price"),
    //         message: "",
    //         reply_to: response.data.email,
    //       })
    //     );
    //   });
    // };
    // getUserDetails();

    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool Looking Table",
                amount: {
                  currency_code: "USD",
                  // value: props.productRentPrice,
                  value: sessionStorage.getItem("final_rent_price"),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          console.log("Order Successful!");
          // Update orders table
          const requestOptions = {
            order_id: order.id,
            owner_username: props.productCard.owner_username,
            renter_username: sessionStorage.getItem("username"),
            product_title: props.productCard.title,
            product_rent_price: props.productCard.rent_price,
            product_rent_frequency: props.productCard.rent_frequency,
          };
          axios.post(API.ADD_NEW_ORDER, requestOptions).then((response) => {
            console.log(
              "Response for Add New Order: " + JSON.stringify(response)
            );
          });

          // Send a notification to renter and owner
          send(
            "service_740uhkk",
            "template_28jjcn3",
            toSend,
            "user_hFtDvLi74TX29uy4Y1gAt"
          )
            .then((response) => {
              console.log("Email sent!", response.status, response.text);
            })
            .catch((err) => {
              console.log("FAILED...", err);
            });
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
