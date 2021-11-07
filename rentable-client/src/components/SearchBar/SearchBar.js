// import React, { useState } from "react";
// import "./SearchBar.css";
// import SearchIcon from "@material-ui/icons/Search";
// import CloseIcon from "@material-ui/icons/Close";
// import CardPage from "../Card/CardPage.js";

// function SearchBar({ placeholder, filterCards, displayAllCards }) {
//   const [wordEntered, setWordEntered] = useState("");

//   const updateCards = () => {
//     displayAllCards();
//   };

//   const handleFilter = (event) => {
//     const searchWord = event.target.value;
//     setWordEntered(searchWord);
//     filterCards(wordEntered);
//   };

//   const clearInput = () => {
//     setWordEntered("");
//   };

//   return (
//     <div className="search">
//       <div className="searchInputs">
//         <input
//           type="text"
//           placeholder={placeholder}
//           value={wordEntered}
//           onChange={handleFilter}
//         />
//         <div className="searchIcon">
//           {wordEntered.length === 0 ? (
//             updateCards(<SearchIcon />)
//           ) : (
//             <CloseIcon id="clearBtn" onClick={clearInput} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SearchBar;

// 31st Oct 2021

import React, { useState, useEffect } from "react";
import "./SearchBar.css";

//npm install @material-ui/core
import SearchIcon from "@material-ui/icons/Search";
//npm install @material-ui/icons
import CloseIcon from "@material-ui/icons/Close";
import Cards from "../Card/Card.js";
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

  // useEffect(() => {
  //   const f = data.filter((value) => {
  //     return value.category.toLowerCase().includes(category.toLowerCase());
  //   });
  //   setFilteredData(
  //     data.filter((value) => {
  //       return value.category.toLowerCase().includes(category.toLowerCase());
  //     })
  //   );
  //   return;
  // }, []);

  console.log("filtered data: " + filteredData);

  const cateFilter = (event) => {
    //get user input from search bar
    const searchCate = event.target.value;
    setCategory(searchCate);
    console.log(searchCate);
    console.log(category);

    if (searchCate === "") {
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

    // if (searchCate === "" && wordEntered ==="") {
    //   setFilteredData([]);

    // }else if(wordEntered != "" && searchCate===""){
    //   const newFilter = data.filter((value) => {
    //     return value.category.toLowerCase().includes(wordEntered.toLowerCase());
    //   });
    //   setFilteredData(newFilter);

    // }else if(wordEntered === "" && searchCate!=""){
    //   const newFilter = data.filter((value) => {
    //     return value.category.toLowerCase().includes(searchCate.toLowerCase());
    //   });
    //   setFilteredData(newFilter);

    // }else{
    //   const newFilter = data.filter((value) => {
    //     return value.category.toLowerCase().includes(searchCate.toLowerCase());
    //   });
    //   const newFilter1 = newFilter.filter((value) => {
    //     return value.category.toLowerCase().includes(wordEntered.toLowerCase());
    //   });
    //   setFilteredData(newFilter1);
    // }
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

    // if (searchWord === "" && category === "") {
    //   setFilteredData([]);

    // } else if(category != "" && searchWord===""){
    //   const newFilter = data.filter((value) => {
    //     return value.category.toLowerCase().includes(category.toLowerCase());
    //   });
    //   setFilteredData(newFilter);

    // } else if(category === "" && searchWord !=""){
    //   const newFilter = data.filter((value) => {
    //     return value.category.toLowerCase().includes(searchWord.toLowerCase());
    //   });
    //   setFilteredData(newFilter);

    // } else{
    //   const newFilter = data.filter((value) => {
    //     return value.category.toLowerCase().includes(category.toLowerCase());
    //   });
    //   const newFilter1 = newFilter.filter((value) => {
    //     return value.category.toLowerCase().includes(searchWord.toLowerCase());
    //   });
    //   setFilteredData(newFilter1);
    // }
  };

  const priceFilter = ({ event }) => {
    //get user input from search bar
    console.log("min: " + minVal);
    console.log("max: " + maxVal);
    const newFilter = filteredData.filter((value) => {
      return value.rent_price >= minVal && value.rent_price <= maxVal;
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
              // setFilteredData(data);
              console.log(
                `min = ${min}, max = ${max}, data=${data},cate=${category},word=${wordEntered}`
              );
            }}
          />
        </div>
      </div>

      {/* <h1>Hello</h1>
      <h5>{filteredData.length}</h5> */}
      {filteredData.length != 0 && (
        <div className="wrapper">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div>
                <a className="dataItem" href={value.image} target="_blank">
                  <Cards card={value} />
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
