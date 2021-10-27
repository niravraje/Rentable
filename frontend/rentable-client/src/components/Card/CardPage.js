import Card from "./Card";

const CardPage = ({ cards, cardOnClick }) => {
  return (
    <>
      {cards.map((card) => (
        <Card key={card.id} card={card} cardOnClick={cardOnClick} />
      ))}
    </>
  );
};

export default CardPage;
