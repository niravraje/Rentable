import React, { useState } from "react";
import JSONDATA from "../Data1.json";
import "../style/searchBarDiv.css";
import CardPage from "../components/Card/CardPage";
import SearchBar from "../components/SearchBar/SearchBar.js";

const Home = () => {
  // example Cards
  const [cards, setCards] = useState(JSONDATA);

  // click on a Card
  const cardOnClick = (id) => {
    console.log(id, " was clicked");
  };

  // filter cards using the SearchBar
  const filterCards = (filter) => {
    setCards(
      JSONDATA.filter((object) => {
        return object.title.toLowerCase().includes(filter.toLowerCase());
      })
    );
  };

  // Display all cards
  const displayAllCards = () => {
    setCards(JSONDATA);
  };

  return (
    <div className="body">
      <div className="search-bar-div">
        <SearchBar
          placeholder="Search..."
          filterCards={filterCards}
          displayAllCards={displayAllCards}
        />
      </div>
      <div className="wrapper">
        <CardPage cards={cards} cardOnClick={cardOnClick} />
      </div>
    </div>
  );
};

export default Home;
