import "./Card.css";

import { FaTasks } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";

const Card = ({ card }) => {
  let history = useHistory();
  // click on a Card
  const cardOnClick = (card) => {
    //console.log(card.id, ' was clicked')
    history.push({
      pathname: "/product-details",
      state: {
        id: card.id,
        title: card.title,
        price: card.price,
        rating: card.rating,
        image_url: card.image_url,
        product_location: card.product_location,
        description: card.description,
      },
    });
  };

  return (
    <div
      className="card"
      style={{ cursor: "pointer" }}
      onClick={() => cardOnClick(card)}
    >
      <img className="image" src={card.image_url} alt="product image" />
      <h2 className="title"> {card.title} </h2>
      <p className="description">
        {card.description}
        <br />${card.rent_price}
        <br />4 stars
        <br />
        {card.product_location}
      </p>
    </div>
  );
};

export default Card;
