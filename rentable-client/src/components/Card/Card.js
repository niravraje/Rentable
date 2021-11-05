import "./Card.css";

// const Card = ({ card, cardOnClick }) => {
//   return (
//     <div
//       className="card"
//       style={{ cursor: "pointer" }}
//       onClick={() => cardOnClick(card.id)}
//     >
//       <img className="image" src={card.image} />
//       <h2 className="title"> {card.title} </h2>
//       <p className="description">
//         ${card.price} <br />
//         {card.rating} stars <br />
//         {card.location}
//       </p>
//     </div>
//   );
// };

// export default Card;

// 31st Oct 2021

import { FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({ card }) => {
  return (
    <Link to="/product-details">
      <div className="card" style={{ cursor: "pointer" }}>
        <img className="image" src={card.image} alt="product image" />
        <h2 className="title"> {card.title} </h2>
        <p className="description">
          {card.description}
          <br />${card.rent}
          <br />4 stars
          <br />
          Bloomington
        </p>
      </div>
    </Link>
  );
};

export default Card;
