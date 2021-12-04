import React, { useRef, useEffect } from "react";

export default function Paypal(props) {
  const paypal = useRef();
  console.log("props: " + JSON.stringify(props));

  useEffect(() => {
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
                  value: props.productRentPrice,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          console.log("Order Successful!");
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
