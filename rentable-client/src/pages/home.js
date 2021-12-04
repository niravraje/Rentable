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
<<<<<<< HEAD
=======
  const [areProductsFetched, setAreProductsFetched] = useState(false);
>>>>>>> dev
  const [productData, setProductData] = useState([
    {
      approval_status: 0,
      category: "car",
<<<<<<< HEAD
      description: "Tesla Model S",
      id: 1,
      owner_username: "niravraje2",
      rent_frequency: "day",
      rent_price: "110",
      title: "Tesla",
=======
      description: "Default Car",
      id: 1,
      owner_username: "niravraje2",
      rent_frequency: "month",
      rent_price: "110",
      title: "default",
>>>>>>> dev
    },
  ]);

  useEffect(() => {
<<<<<<< HEAD
    console.log("useEffect triggered.");

    const get_products = async (e) => {
=======
    console.log("useEffect triggered");
    const get_filtered_products = async (e) => {
>>>>>>> dev
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          approval_filter: 1,
        }),
      };
      try {
<<<<<<< HEAD
        const res = await fetch(API.GET_PRODUCTS, requestOptions);
        console.log("Response on get_products request: " + res);
=======
        const res = await fetch(API.GET_FILTERED_PRODUCTS, requestOptions);
        console.log("Response on get_filtered_products request: " + res);
>>>>>>> dev
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
<<<<<<< HEAD

=======
        setAreProductsFetched(true);
>>>>>>> dev
        return;
      } catch (err) {
        setError("Error. Internal server error.");
        console.log("Server error occurred. Check if the server is running.");
      }
    };
    get_filtered_products();
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
