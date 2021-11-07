// import React, { useState } from "react";
// import JSONDATA from "../Data1.json";
// import "../style/searchBarDiv.css";
// import CardPage from "../components/Card/CardPage";
// import SearchBar from "../components/SearchBar/SearchBar.js";

// const Home = () => {
//   // example Cards
//   const [cards, setCards] = useState(JSONDATA);

//   // click on a Card
//   const cardOnClick = (id) => {
//     console.log(id, " was clicked");
//   };

//   // filter cards using the SearchBar
//   const filterCards = (filter) => {
//     setCards(
//       JSONDATA.filter((object) => {
//         return object.title.toLowerCase().includes(filter.toLowerCase());
//       })
//     );
//   };

//   // Display all cards
//   const displayAllCards = () => {
//     setCards(JSONDATA);
//   };

//   return (
//     <div className="body">
//       <div className="search-bar-div">
//         <SearchBar
//           placeholder="Search..."
//           filterCards={filterCards}
//           displayAllCards={displayAllCards}
//         />
//       </div>
//       <div className="wrapper">
//         <CardPage cards={cards} cardOnClick={cardOnClick} />
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import JSONDATAx from "../Data2.json";
import "../style/searchBarDiv.css";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar.js";
import * as API from "../constants/api-routes";
// import org.json.simple.*;

const Home = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const [areProductsFetched, setAreProductsFetched] = useState(false);
  const [productData, setProductData] = useState([
    {
      approval_status: 0,
      category: "car",
      description: "Tesla Model S",
      id: 1,
      owner_username: "niravraje2",
      rent_frequency: "day",
      rent_price: "110",
      title: "Tesla",
    },
  ]);

  useEffect(() => {
    console.log("useEffect triggered");
    const get_products = async (e) => {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      try {
        const res = await fetch(API.GET_PRODUCTS, requestOptions);
        console.log("Response on get_products request: " + res);
        const data = await res.json();

        console.log("res -> data = " + data);
        // console.log("JSONDATA = " + JSONDATA);
        console.log("data[0] = " + data[0].title);
        console.log("res->data typeof: " + typeof data);
        console.log(
          "res->data stringified typeof: " + typeof JSON.stringify(data)
        );
        console.log("JSONDATAx typeof: " + typeof JSONDATAx);

        // const data = await res.json();
        console.log("Status code of request: " + res.status);

        console.log("res.json(): " + JSON.stringify(data));
        // setProductData(JSON.stringify(data));
        // setProductData(res.data);
        // console.log("data.category: ");
        setProductData(data);
        setAreProductsFetched(true);
        return;
      } catch (err) {
        setError("Error. Internal server error.");
        console.log("Server error occurred. Check if the server is running.");
      }
    };
    get_products();
  }, []);

  return (
    <div className="body">
      <div>
        <SearchBar placeholder="Search..." data={productData} />
        {/* <SearchBar placeholder="Search..." data={productData} /> */}
      </div>
    </div>
  );
};

export default Home;