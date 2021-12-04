import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import { useVoice } from "../Voice/useVoice";
import Mic from "@mui/icons-material/Mic";

//npm install @material-ui/core
import SearchIcon from "@material-ui/icons/Search";
//npm install @material-ui/icons
import CloseIcon from "@material-ui/icons/Close";
import Card from "../Card/Card.js";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";

function SearchBar({ placeholder, data }) {
  const [wordEntered, setWordEntered] = useState("");
  const [category, setCategory] = useState("Apartment");
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(10000);
  const [filteredData, setFilteredData] = useState(
    data.filter((value) => {
      return value.category.toLowerCase().includes(category.toLowerCase());
    })
  );

  console.log("filtered data: " + filteredData);

  const cateFilter = (event) => {
    //get user input from search bar
    const searchCate = event.target.value;
    setCategory(searchCate);
    console.log(searchCate);
    console.log(category);

    if (category === "") {
      setFilteredData(
        data.filter((value) => {
          return value.category.toLowerCase().includes(category.toLowerCase());
        })
      );
    } else {
      const newFilter = data.filter((value) => {
        return (
          value.category.toLowerCase().includes(searchCate.toLowerCase()) &&
          value.rent_price >= minVal &&
          value.rent_price <= maxVal
        );
      });
      setFilteredData(newFilter);
    }
  };

  const handleFilter = (event) => {
    //get user input from search bar
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    console.log("searchWord: " + searchWord);
    console.log("category: " + category);
    console.log("min: " + minVal);
    console.log("max: " + maxVal);

    const newFilter = data.filter((value) => {
      return (
        value.category.toLowerCase().includes(category.toLowerCase()) &&
        value.title.toLowerCase().includes(searchWord.toLowerCase()) &&
        value.rent_price >= minVal &&
        value.rent_price <= maxVal
      );
    });
    setFilteredData(newFilter);
  };

  const clearInput = () => {
    setFilteredData(
      data.filter((value) => {
        return value.category.toLowerCase().includes(category.toLowerCase());
      })
    );
    setWordEntered("");
  };

  const { text, isListening, listen, voiceSupported } = useVoice();

  useEffect(() => {
    if (text !== "") {
      setWordEntered(text);
      const newFilter = data.filter((value) => {
        return (
          value.category.toLowerCase().includes(category.toLowerCase()) &&
          value.title.toLowerCase().includes(text.toLowerCase()) &&
          value.rent_price >= minVal &&
          value.rent_price <= maxVal
        );
      });
      setFilteredData(newFilter);
    }
  }, [text]);

  if (!voiceSupported) {
    return (
      <div className="app">
        <h1>
          Voice recognition is not supported by your browser, please re-try with
          a supported browser e.g. Chrome
        </h1>
      </div>
    );
  }

  return (
    <div>
      <div className="search-bar-div search">
        {/* category */}
        <div class="searchButtonGroup">
          <input
            type="radio"
            class="searchcheck"
            name="options"
            id="option1"
            autocomplete="off"
            value="Apartment"
            onChange={cateFilter}
            defaultChecked
          />
          <label class="btn searchButton" for="option1">
            Apartment
          </label>

          <input
            type="radio"
            class="searchcheck"
            name="options"
            id="option2"
            autocomplete="off"
            value="Car"
            onChange={cateFilter}
          />
          <label class="btn searchButton" for="option2">
            Car
          </label>

          <input
            type="radio"
            class="searchcheck"
            name="options"
            id="option3"
            autocomplete="off"
            value="Service"
            onChange={cateFilter}
          />
          <label class="btn searchButton" for="option3">
            Service
          </label>
        </div>
        {/* <select 
              value={category}
              onChange={cateFilter}>
                <option value="" selected>Category</option>
                <option value="Apartment">Apartment</option>
                <option value="car">Car</option>
                <option value="Service">Service</option>
            </select> */}
        {/* <div className="card card-body"> */}
        <div className="searchInputs">
          <div className="microphone">
            <Mic
              className={`microphone ${isListening && "isListening"}`}
              onClick={listen}
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        <div>
          <MultiRangeSlider
            min={0}
            max={10000}
            data={data}
            cate={category}
            word={wordEntered}
            onChange={({ min, max, data }) => {
              setMinVal(min);
              setMaxVal(max);
              console.log(
                `min = ${min}, max = ${max}, data=${data},cate=${category},word=${wordEntered}`
              );
            }}
          />
        </div>
      </div>

      {filteredData.length != 0 && (
        <div className="wrapper">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div>
                <a className="dataItem" target="_blank">
                  <Card card={value} />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
