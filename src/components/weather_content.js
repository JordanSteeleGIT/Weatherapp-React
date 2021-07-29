import React, { useState, useEffect } from "react";
import Weather_Api from "./weather_api";
import { FaSearch } from "react-icons/fa";
import { countries } from "../data";

export default function Weather_Content() {
  const [currentInput, setInput] = useState("");
  const [autoCompleteArray, setAutoCompleteArray] = useState([]);
  const [dropDownStyle, setDropDownStyle] = useState("block");
  const [locationReadyForSearch, setLocationReadyForSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    setLocationReadyForSearch(
      countries[Math.floor(Math.random() * countries.length)]
    ); //Currently randomizes the location. Would be good to use users location here!
  }, []);

  useEffect(() => {
    if (currentInput == "") {
      setDropDownStyle("none");
    } else {
      setAutoCompleteArray(
        countries.filter((country) =>
          country.startsWith(capitalizeAll(currentInput))
        )
      );
    }
  }, [currentInput]); //Loops over the countries array and pushes matching text into autoCompleteArray

  function capitalizeAll(str) {
    return !str
      ? ""
      : str
          .toLowerCase()
          .split(" ")
          .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
          .join(" ");
  }

  return (
    <>
      <div className="Weather-Container">
        <div className="Searchbar-Container">
          <div className="SearchBar">
            <input
              value={currentInput}
              onChange={(e) => setInput(e.target.value)}
              onInput={() => setDropDownStyle("block")}
            />
            <button
              onClick={() => {
                setDropDownStyle("none");
                //This stops an invalid api request. If the current input isnt present in the countries array an error will show instead
                if (countries.find((location) => location === currentInput)) {
                  setLocationReadyForSearch(currentInput);
                  setErrorMessage();
                } else {
                  setErrorMessage("The country you entered isn't valid");
                }
              }}
            >
              <FaSearch />
            </button>
          </div>
          <div
            className="Auto-Complete-Container"
            style={{ display: dropDownStyle }}
          >
            <ul>
              {autoCompleteArray.map((country) => {
                return (
                  <li
                    onClick={() => {
                      setInput(country);
                      setAutoCompleteArray([]);
                      setDropDownStyle("none");
                    }}
                  >
                    {
                      <span>
                        {country.substring(0, currentInput.length)}
                        <b>{country.substring(currentInput.length)}</b>
                      </span>
                    }
                  </li>
                );
              })}
            </ul>
          </div>
          <h4>{errorMessage}</h4>
        </div>
        <div className="Weather-Api-Content">
          <Weather_Api location={locationReadyForSearch} />
        </div>
      </div>
    </>
  );
}
