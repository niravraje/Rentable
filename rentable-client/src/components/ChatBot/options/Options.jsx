import React from "react";

import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "Car",
      handler: props.actionProvider.handleCar,
      id: 1,
    },
    { text: "Apartment", 
      handler: props.actionProvider.handleApartment,
      id: 2,
    },
    { text: "Service", 
      handler:props.actionProvider.handleService,
      id: 3,
    },

  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;