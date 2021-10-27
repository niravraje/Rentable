import "./Card.css";

const Card = ({ card, cardOnClick }) => {
  return (
    <div
      className="card"
      style={{ cursor: "pointer" }}
      onClick={() => cardOnClick(card.id)}
    >
      <img className="image" src={card.image} />
      <h2 className="title"> {card.title} </h2>
      <p className="description">
        ${card.price} <br />
        {card.rating} stars <br />
        {card.location}
      </p>
    </div>
  );
};

export default Card;
